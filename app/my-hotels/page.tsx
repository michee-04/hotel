import { getHotelsByUserId } from "@/actions/getHotelsByUserId"
import HotelList from "@/components/hotel/HotelList"


async function MyHotels() {
  const hotels = await getHotelsByUserId()

  if(!hotels) return <div>No Hotels found!</div>

  return (
    <div className="text-2xl font-semibold">
      <HotelList hotels={hotels} />
    </div>
  )
}

export default MyHotels