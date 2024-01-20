import { Link } from "react-router-dom"
import axios from 'axios'
import { useContext, useState } from "react"

import catImg from '../assets/cat.jpg'
import { UserContext } from "../UserContext"

const Header = () => {
    const { user } = useContext(UserContext)
    const [searchQuery, setSearchQuery] = useState('')
    const [foundPlaces, setFoundPlaces] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const [showTheCat, setShowTheCat] = useState(false)

    const searchHandler = () => {
        axios.get('/search' + `?q=${searchQuery}`).then(res => {
            setFoundPlaces(res.data)
            if (res.data.length > 0) setShowDropdown(true)
        })
    }

    document.addEventListener('click', function handleClickOutsideBox(event) {
        const dropdown = document.querySelector('.dropdown')

        if (dropdown && !dropdown.contains(event.target)) {
            setShowDropdown(false)
        }
    });

    return (
        <header className='flex gap-8 justify-between'>
            <Link to={'/'} className='flex items-center gap-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
                </svg>
                <span className='font-bold text-xl hidden md:block'>CoolBookingApp</span>
            </Link>

            <div className='z-20 relative w-96 max-w-96 items-center cursor-pointer --md:visible --invisible flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>

                <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

                {showDropdown && (
                    <div className="dropdown -z-10 absolute top-8 left-0 rounded-b-2xl bg-white w-full shadow shadow-gray-300 overflow-hidden">
                        {foundPlaces.map(place => (
                            <Link key={place._id} to={'/place/' + place._id} className="block p-2 first:mt-8 hover:bg-gray-100">
                                {place.title}
                            </Link>
                        ))}
                    </div>
                )}

                <button
                    onClick={searchHandler}
                    className='flex items-center justify-center min-h-10 min-w-10 bg-primary text-white rounded-full'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>


            <div className='relative flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4'>

                {showTheCat && (
                    <div className="flex gap-2 absolute bg-white -left-56 -bottom-36 border border-gray-300 p-4 rounded-xl">
                        <div className="max-h-24 max-w-24 rounded-xl overflow-hidden">
                            <img className="object-cover" src={catImg} alt={'cat'} />
                        </div>
                        <span className="flex justify-between flex-col border border-gray-300 p-2 rounded-xl">
                            - I ate the menu.
                            <span className="cursor-pointer" onClick={() => setShowTheCat(false)} >
                                &#x27A4; Ok
                            </span>
                        </span>
                    </div>
                )}

                <div className="cursor-pointer" onClick={() => setShowTheCat(prev => !prev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>

                <Link to={user ? '/account' : '/login'} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    {user && (
                        <div className="ml-2 leading-4">{user.name}</div>
                    )}
                </Link>
            </div>
        </header>
    )
}

export default Header