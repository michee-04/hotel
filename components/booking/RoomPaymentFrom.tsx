/* eslint-disable react-hooks/exhaustive-deps */
/**
 * eslint-disable react-hooks/exhaustive-deps
 *
 * @format
 */

/** @format */

import useBookRoom from "@/hooks/useBookRoom"
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"
import { useToast } from "../ui/use-toast"
import { Separator } from "../ui/separator"
import moment from "moment"
import { Button } from "../ui/button"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Terminal } from "lucide-react"
import { Booking } from "@prisma/client"
import { endOfDay, isWithinInterval, startOfDay } from "date-fns"

interface RoomPaymentFromProps {
  clientSecret: string
  handleSetPaymentSuccess: (value: boolean) => void
}

type DateRangesTye = {
  startDate: Date,
  endDate: Date,
}

function hasOverlap(startDate: Date, endDate: Date, dateRanges: DateRangesTye[]){
  const targetInterval = {start: startOfDay(new Date(startDate)), end: endOfDay(new Date(endDate))}

  for(const range of dateRanges){
    const rangeStart = startOfDay(new Date(range.startDate))
    const rangeEnd = endOfDay(new Date(range.endDate))

    if(
      isWithinInterval(targetInterval.start, {start: rangeStart, end: rangeEnd}) ||
      isWithinInterval(targetInterval.end, { start: rangeStart, end: rangeEnd}) ||
      (targetInterval.start < rangeStart && targetInterval.end > rangeEnd)
    ){
      return true;
    }
  }
  return false
}

function RookPaymentFrom({
  clientSecret,
  handleSetPaymentSuccess,
}: RoomPaymentFromProps) {
  const { bookingRoomData, resetBookRoom } = useBookRoom()
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false)
    setIsLoading(false)
  }, [stripe])

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    console.log("moins cool")

    if(!stripe || !elements || !bookingRoomData){
      return;
    }

    try{
      //date overlaps
      console.log("cool")
      const bookings = await axios.get(`/api/booking/${bookingRoomData.room.id}`)

      const roomBookingdates = bookings.data.map((booking: Booking)=> {
        return {
          startDate: booking.startDate,
          endDate: booking.endDate
        }
      })

      const overlapFound = hasOverlap(bookingRoomData.startDate, bookingRoomData.endDate, roomBookingdates)

      if(overlapFound){
        setIsLoading(false)
        return toast({
          variant:  "destructive",
          description: "Oups! Some of the days you are trying to book hae already been reserved. lease go back and selecr differrent dates of rooms"
        })
      }

      stripe.confirmPayment({elements, redirect: 'if_required'}).then((result)=> {
        if(!result.error){
          axios.patch(`/api/booking/${result.paymentIntent.id}`).then((res) => {
            toast({
              variant:  "success",
              description: "Room Reserved!"
            })
            router.refresh();
            console.log("reussi")
            resetBookRoom()
            handleSetPaymentSuccess(true)
            setIsLoading(false)
          }).catch(error=> {
            console.log(error);
            toast({
              variant:  "destructive",
              description: "Something went wrong!"
            })
            setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
      })
    } catch(error){
      console.log(error);
      setIsLoading(false)
    }
  }

  if(!bookingRoomData?.startDate || !bookingRoomData?.endDate) return <div>Error: Missing reservation dates...</div>

  const startDate = moment(bookingRoomData?.startDate).format("MMMM Do YYYY")
  const endDate = moment(bookingRoomData?.endDate).format("MMMM Do YYYY")

  return (
    <form onSubmit={handleSubmit} id='payment-form'>
      <h2 className='font-semibold mb-2 text-lg'>Billing Address</h2>
      <AddressElement
        options={{
          mode: "billing",
          // allowedCountries: ["BF", "TG"],
        }}
      />
      <h2 className='font-semibold mt-4 mb-2 text-lg'>Payment Information</h2>
      <PaymentElement id='payment-element' options={{ layout: "tabs" }} />
      <div className="flex flex-col gap-1">
        <Separator />
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold mb-1">Your Booking Summary</h1>
          <div>You will check in on {startDate} at 5PM</div>
          <div>You will check out on {endDate} at 5PM</div>
          {bookingRoomData?.breakFastIncluded && <div>You will be sered breakfast each day at 8AM</div>}
        </div>
      
        <Separator />
        <div className="font-bold text-lg">
          {bookingRoomData?.breakFastIncluded && <div className="mb-2">Breakfast Price : ${bookingRoomData.room.breackFastPrice} /day</div>}
          Total Price: ${bookingRoomData?.totalPrice}
        </div>
      </div>

      {isLoading && <Alert className="bg-indigo-600 text-white">
                <Terminal className="h-4 w-4 stroke-white" />
                <AlertTitle>Payment Processing...</AlertTitle>
                <AlertDescription>
                  Please Mic on this age as we process your payment
                </AlertDescription>
              </Alert>}
      <Button disabled={isLoading}>{isLoading ? "Processing Payment..." : "Pay Now"}</Button>
    </form>
  )
}

export default RookPaymentFrom
