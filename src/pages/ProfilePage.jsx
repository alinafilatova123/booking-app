import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"

import PlacesPage from "./PlacesPage"
import AccountNav from "../components/AccountNav"

const ProfilePage = () => {
    const [redirect, setRedirect] = useState(false)
    const { user, ready, setUser } = useContext(UserContext)
    let { subpage } = useParams()
    if (!subpage) subpage = 'profile'

    const logout = async () => {
        await axios.post('/logout')
        setRedirect(true)
    }

    if (redirect) {
        setUser(null)
        return <Navigate to={'/'} />
    }

    if (!ready) {
        return 'Loading...'
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }

    return (
        <div>

            <AccountNav/>
            
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} {(user.email)} <br />

                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    )
}

export default ProfilePage