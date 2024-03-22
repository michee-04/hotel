import { getBookings } from "@/actions/getBookings"
import { getHotelById } from "@/actions/getHotelById"
import HotelDetailsClient from "@/components/hotel/HotelDetailsClient"

interface HotelDetailsProps {
  params: {
    hotelId: string
  }
 }

async function HotelDetails({ params }: HotelDetailsProps) {

  const hotel = await getHotelById(params.hotelId)
  if(!hotel) return <div>Oop! Hotel with the given Id not found</div>

  const bookings = await getBookings(hotel.id)

  return (
    <div>
      <HotelDetailsClient hotel={hotel} bookings={bookings} />
    </div>
  )
}

export default HotelDetails
 