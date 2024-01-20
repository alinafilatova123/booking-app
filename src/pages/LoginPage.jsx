import { Link, Navigate } from "react-router-dom"
import { useContext, useState } from "react"
import axios from 'axios'

import { UserContext } from "../UserContext"

const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {setUser} = useContext(UserContext)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post('/login', {email, password})
            setUser(data)
            setRedirect(true)
        } catch (err) {
            alert('Login failed. Please try again later.')
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-8 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form onSubmit={handleLogin} className="max-w-md mx-auto">
                    <input type="email" placeholder="your@email.com" required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    <input type="password" placeholder="password" required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don`t have an account yet? <Link to={'/register'} className="underline text-black">Register</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default LoginPage