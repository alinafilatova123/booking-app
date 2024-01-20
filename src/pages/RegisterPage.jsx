import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import axios from 'axios'

const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    const registerUser = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/register', {
                name,
                email, 
                password
            })
            setRedirect(true)
        } catch (err) {
            alert('Registration failed. Please try again later.')
        }
    }

    if (redirect) {
        return <Navigate to={'/login'} />
    }

    return (
        <div className="mt-8 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form onSubmit={registerUser} className="max-w-md mx-auto">
                    <input type="text" placeholder="Your Name" required
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                    />
                    <input type="email" placeholder="your@email.com" required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input type="password" placeholder="password" required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link to={'/login'} className="underline text-black">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage