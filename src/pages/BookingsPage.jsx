import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"

import AccountNav from "../components/AccountNav"
import PlaceImg from "../components/PlaceImg"
import BookingInfo from "../components/BookingInfo"

const BookingsPage = () => {

    const [bookings, setBookings] = useState([])
    useEffect(() => {
        axios.get('/bookings').then(res => {
            setBookings(res.data)
        })
    }, [])

    return (
        <div>
            <AccountNav />
            <div className="flex flex-col gap-3">
                {bookings?.length > 0 && bookings.map((booking, i) => (
                    <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden" key={i}>
                        <div className="w-48">
                            <PlaceImg className="object-cover h-full" place={booking.place} />
                        </div>

                        <div className="py-3 pr-3 grow">
                            <h2 className="text-xl">{booking.place.title}</h2>
                            <BookingInfo booking={booking} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BookingsPage