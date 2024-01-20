import axios from 'axios'
import { useContext, useEffect, useState } from "react"
import { differenceInCalendarDays } from 'date-fns'
import { Navigate } from "react-router-dom"

import { UserContext } from "../UserContext"

const BookingWidget = ({ place }) => {

    const { user } = useContext(UserContext)

    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numOfGuests, setNumOfGuests] = useState(1)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [redirect, setRedirect] = useState('')

    const [error, setError] = useState(false)

    useEffect(() => {
        if (user) setName(user.name)
    }, [user])

    let numOfDays = 0
    if (checkIn && checkOut) {
        numOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    const bookPlace = async () => {

        if (!user) {
            window.location.assign('/login')
            return
        }

        if (numOfDays === 0 || !phone) {
            setError(true)
            return
        }

        setError(false)

        const data = {
            place: place._id,
            price: numOfDays * place.price,
            numOfGuests, name, phone, checkIn, checkOut
        }
        const res = await axios.post('/bookings', data)
        const bookingId = res.data._id
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="p-4 rounded-2xl bg-white shadow">
            <div className="text-2xl text-center">Price: ${place.price} / per night</div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label>Check in:</label>
                        <input type='date' required
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>Check out:</label>
                        <input type='date' required
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                        />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Number of guests:</label>
                    <input type='number' required
                        value={numOfGuests}
                        onChange={(e) => setNumOfGuests(e.target.value)}
                    />
                </div>
                {numOfDays > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Your full name:</label>
                        <input type='text' placeholder="Your Name" required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label>Your phone number:</label>
                        <input type='telephone' required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                )}
            </div>

            <button onClick={bookPlace} className="primary mt-4">
                Book this place
                {numOfDays > 0 && (
                    <span> ${numOfDays * place.price}</span>
                )}
            </button>

            {error && (
                <div className="mt-2 flex gap-1 items-center p-2 bg-gray-200 rounded-2xl" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>

                    Check the fields for correct filling
                </div>
            )}
        </div>
    )
}

export default BookingWidget