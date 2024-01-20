import { useEffect, useState } from "react"
import axios from "axios"
import { Navigate, useParams } from "react-router-dom"

import AccountNav from "../components/AccountNav"
import PhotosUploader from '../components/PhotosUploader'
import Perks from '../components/Perks'

const PlacesFormPage = () => {
    const { id } = useParams()

    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [price, setPrice] = useState(1)

    const [error, setError] = useState(false)

    useEffect(() => {
        if (!id) return
        axios.get('/places/' + id).then(res => {
            const { data } = res
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
            setPrice(data.price)
        })
    }, [id])

    const [redirect, setRedirect] = useState(false)

    const savePlace = async (e) => {
        e.preventDefault()
        if (!perks.length || !addedPhotos.length) {
            setError(true)
            return
        }
        setError(false)

        const placeData = { 
            title, address, addedPhotos, description, perks, 
            extraInfo, checkIn, checkOut, maxGuests, price 
        }

        if (id) {
            await axios.put('/places', {id, ...placeData})
            setRedirect(true)
        } else {
            await axios.post('/places', placeData)
            setRedirect(true)
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                <h2 className="text-2xl mt-4">Title</h2>
                <input type="text" placeholder="title" required
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <h2 className="text-2xl mt-4">Address</h2>
                <input type="text" placeholder="address" required
                    value={address}
                    onChange={(e) =>
                        setAddress(e.target.value)
                    }
                />

                <h2 className="text-2xl mt-4">Photos</h2>

                <PhotosUploader setAddedPhotos={setAddedPhotos} addedPhotos={addedPhotos} />

                <h2 className="text-2xl mt-4">Description</h2>
                <textarea
                    required
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

                <h2 className="text-2xl mt-4">Perks</h2>
                <Perks perks={perks} setPerks={setPerks} />

                <h2 className="text-2xl mt-4">Extra info</h2>
                <textarea
                    required
                    value={extraInfo}
                    onChange={(e) =>
                        setExtraInfo(e.target.value)
                    }
                />

                <h2 className="text-2xl mt-4">Check in&out times</h2>
                <div className="gap-2 grid grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Check  in time</h3>
                        <input type="time" placeholder="14:00" required
                            value={checkIn}
                            onChange={(e) =>
                                setCheckIn(e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check  out time</h3>
                        <input type="time" placeholder="12:00" required
                            value={checkOut}
                            onChange={(e) =>
                                setCheckOut(e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input type="number" placeholder="2" required
                            value={maxGuests}
                            onChange={(e) =>
                                setMaxGuests(e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input type="number" placeholder="200" required
                            value={price}
                            onChange={(e) =>
                                setPrice(e.target.value)
                            }
                        />
                    </div>
                </div>

                <button className="primary my-4">Save</button>

                {error && (
                    <div className="flex gap-1 items-center p-2 bg-gray-200 rounded-2xl" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>

                        Check the fields for correct filling
                    </div>
                )}
            </form>
        </div>
    )
}

export default PlacesFormPage