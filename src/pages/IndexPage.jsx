import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"

import { BASE_URL } from "../../urls"

const IndexPage = () => {

    const [places, setPlaces] = useState([])

    useEffect(() => {
        axios.get('/places').then(res => {
            setPlaces(res.data)
        })
    }, [])

    return (
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                <Link key={place._id} to={'/place/' + place._id} className="cursor-pointer">
                    <div className="bg-gray-500 rounded-2xl flex mb-2">
                        {place.photos?.[0] && (
                            <img className="rounded-2xl object-cover aspect-square" src={BASE_URL + '/uploads/' + place.photos[0]} alt={'place-img'} />
                        )}
                    </div>
                    <h2 className="font-bold">{place.address}</h2>
                    <h3 className="text-sm text-gray-500">{place.title}</h3>

                    <div className="mt-1">
                       <span className="font-bold">${place.price}</span> per night
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default IndexPage