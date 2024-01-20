import { useParams } from "react-router-dom"
import axios from 'axios'
import { useEffect, useState } from "react"

import AddressLink from "../components/AddressLink"
import PlaceGallery from "../components/PlaceGallery"
import BookingInfo from "../components/BookingInfo"

const SingleBookingPage = () => {
    const { id } = useParams()
    const [booking, setBooking] = useState(null)

    useEffect(() => {
        if (id) {
            axios.get('/booking/' + id).then((res) => {
                const founBooking = res.data
                if (founBooking) setBooking(founBooking)
            })
        }
    }, [id])

    if (!booking) return ''

    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink className={'my-2 block'} >{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-4 mb-4 rounded-2xl">
                <h2 className="text-xl">Your booking information:</h2>
                <BookingInfo booking={booking} />
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    )
}

export default SingleBookingPage