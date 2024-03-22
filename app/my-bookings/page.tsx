import { getBookingsByHotelOwnerId } from "@/actions/getBookingsByHotelOwnerId"
import { getBookingsByUserId } from "@/actions/getBookingsByUserId"
import MyBookingsClient from "@/components/booking/MyBookingsClient"


async function MyBookings() {
  const bookingsFromVisitors = await getBookingsByHotelOwnerId()
  const bookingsHaveMade = await getBookingsByUserId()

  if(!bookingsFromVisitors || ! bookingsHaveMade) return <div>No bookings found</div>
  return (
    <div className="flex flex-col gap-10">
      {!!bookingsHaveMade?.length && <div>
        <h2 className="tet-xl md:text-2xl font-semibold mb-6 mt-2">We are bookings you have made</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols gap-6">
          {bookingsHaveMade.map(booking => <MyBookingsClient key={booking.id} booking={booking} />)}
        </div>
      </div>}


      {!!bookingsFromVisitors?.length && <div>
        <h2 className="tet-xl md:text-2xl font-semibold mb-6 mt-2">We are bookings visitors have made on your properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols gap-6">
          {bookingsFromVisitors.map(booking => <MyBookingsClient key={booking.id} booking={booking} />)}
        </div>
      </div>}
    </div>
  )
}

export default MyBookings