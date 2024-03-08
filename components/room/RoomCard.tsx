/** @format */

"use client"
import { Booking, Hotel, Room } from "@prisma/client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import Image from "next/image"
import AmenityItem from "../Amenity"
import { AirVent, Bath, Bed, Home, BedDouble, Castle, Loader2, MountainSnow, Pencil, Plus, Ship, Trash, Trees, Tv, Users, UtensilsCrossed, VolumeX, Wifi } from "lucide-react"
import { Separator } from "../ui/separator"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import AddRoomForm from "./AddRoomForm"
import axios from "axios"
import { useToast } from '@/components/ui/use-toast';


interface RoomCardProps {
  hotel: Hotel & {
    rooms: Room[]
  }
  room: Room
  bookings?: Booking[]
}

function RoomCard({ hotel, room, bookings = [] }: RoomCardProps) {

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)


  const pathname = usePathname()
  const router = useRouter()
  const {toast} = useToast()
  const isHotelDetailsPage = pathname.includes('hotel-details')
  
  const handleDialogueOpen = () => {
    setOpen(prev => !prev)
  }

  const handleRoomDelete = (room: Room) => {
    setIsLoading(true)
    const imageKey = room.image.substring(room.image.lastIndexOf('/') + 1)

    axios.post('/api/uploadthing/delete', {imageKey}).then(()=> {
      axios.delete(`/api/room/${room.id}`).then(() => {
        router.refresh()
        toast({
          variant: "success",
          description: "Room Delete!",
        })
      }).catch(()=>{
        setIsLoading(false)
        toast({
          variant: "destructive",
          description: "Something went wrong!",
        })
      })
    }).catch(()=> {
      setIsLoading(false)
      toast({
        variant: "destructive",
        description: "Something went wrong!",
      })
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.title}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="aspect-square overflow-hidden relative h-[200px] rounded-lg">
          <Image fill src={room.image} alt={room.title} className="object-cover" />
        </div>
        <div className="grid grid-cols-2 gap-4 content-start text-sm">
          <AmenityItem><Bed className="h-4 w-4"/>{room.bedCount} Bed{'(s)'}</AmenityItem>
          <AmenityItem><Users className="h-4 w-4"/>{room.guestCount} Guest{'(s)'}</AmenityItem>
          <AmenityItem><Bath className="h-4 w-4"/>{room.bathRoomCount} BathRoom{'(s)'}</AmenityItem>
          {!!room.kingBed && <AmenityItem><BedDouble className="h-4 w-4"/>{room.kingBed} King Bed{'(s)'}</AmenityItem>}
          {!!room.queenBed && <AmenityItem><Bed className="h-4 w-4"/>{room.queenBed} Queen Bed{'(s)'}</AmenityItem>}
          {room.roomService && <AmenityItem><UtensilsCrossed className="h-4 w-4"/>Room Services</AmenityItem>}
          {room.Tv && <AmenityItem><Tv className="h-4 w-4"/>TV</AmenityItem>}
          {room.balcony && <AmenityItem><Home className="h-4 w-4" />Balcony</AmenityItem>}
          {room.freeWifi && <AmenityItem><Wifi className="h-4 w-4"/>Frre Wifi</AmenityItem>}
          {room.cityView && <AmenityItem><Castle className="h-4 w-4"/>City View</AmenityItem>}
          {room.oceanView && <AmenityItem><Ship className="h-4 w-4"/>Ocean View</AmenityItem>}
          {room.forestView && <AmenityItem><Trees className="h-4 w-4"/>Forest View</AmenityItem>}
          {room.mountainView && <AmenityItem><MountainSnow className="h-4 w-4"/>Mountain View</AmenityItem>}
          {room.airCondition && <AmenityItem><AirVent className="h-4 w-4"/>Air Condition</AmenityItem>}
          {room.soundProoFed && <AmenityItem><VolumeX className="h-4 w-4"/>Sound Proofed</AmenityItem>}
        </div>
        <Separator  />
        <div className="flex gapp-4 justify-between">
          <div>Room Price: <span className="font-bold">${room.roomPrice}</span></div>
          {!!room.breackFastPrice && <div>BreakFast Price: <span className="font-bold">${room.breackFastPrice}</span></div>}
        </div>
        <Separator />
      </CardContent>
      <CardFooter>
        {
          isHotelDetailsPage ? <div>Hotel Details Page</div> : <div className="flex w-full justify-between">
            <Button disabled={isLoading} type="button" variant="ghost" onClick={()=> handleRoomDelete(room)}>
              {isLoading ? <><Loader2 className="mr-2 h-2 w-4" />Deleting</> : <><Trash className="mr-2 h-2 w-4" />Delete</>}
            </Button>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                      <Button type="button" variant="outline" className="max-w-[150x]">
                        <Pencil className="mr-2 h-4 w-4" /> Update Room
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[900px] w-[90%] h-[90%]">
                      <DialogHeader className="px-2">
                        <DialogTitle>Update Room</DialogTitle>
                        <DialogDescription>
                          Make changes to this room
                        </DialogDescription>
                      </DialogHeader>
                      <AddRoomForm hotel={hotel} room={room} handleDialogueOpen={handleDialogueOpen}/>
                    </DialogContent>
                  </Dialog>
          </div>
        }
      </CardFooter>
    </Card>
  )
}

export default RoomCard
