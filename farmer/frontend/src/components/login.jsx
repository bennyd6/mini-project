import { useState } from 'react';
import axios from 'axios';
import logo from '../assets/verna-logo.png';
import './login.css';

export default function Login() {
    const [credentials, setCredentials] = useState({ phone: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', credentials);
            alert('Login successful!');
            localStorage.setItem('authToken', response.data.authtoken); 
        } catch (error) {
            console.error(error.response.data);
            alert('Invalid phone number or password');
        }
    };

    return (
        <div className="login-main">
            <div className="login-main-one">
                <img src={logo} alt="Logo" />
            </div>
            <div className="login-main-two">
                <div className="login-card">
                    <h2>Login</h2>
                    <form className='login-form' onSubmit={handleSubmit}>
                        <input type="text" name="phone" placeholder='Enter your phone number' onChange={handleChange} required className='id-and-pass'/>
                        <input type={showPassword ? "text" : "password"} name="password" className='id-and-pass' placeholder='Enter your password' onChange={handleChange} required />
                        <div className="show-pass">
                            <input type="checkbox" onChange={() => setShowPassword(!showPassword)} />
                            <p>Show Password?</p>
                        </div>
                        <button className='login-button' type="submit">Login</button>
                    </form>
                    <p><a href="/signup" className="signup-link">Don't have an account?</a></p>
                </div>
            </div>
        </div>
    );
}
