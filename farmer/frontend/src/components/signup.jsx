import { useState } from 'react';
import axios from 'axios';
import logo from '../assets/verna-logo.png';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Signup() {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/auth/createfarmer', {
                FirstName: formData.FirstName,
                LastName: formData.LastName,
                phone: formData.phone,
                email: formData.email,
                password: formData.password
            });
            alert('Signup successful!');
            localStorage.setItem('token', response.data.authtoken);
            navigate('/record-land');
        } catch (error) {
            console.error(error.response.data);
            alert('Signup failed!');
        }
    };

    return (
        <div className="login-main">
            <div className="login-main-one">
                <img src={logo} alt="Logo" />
            </div>
            <div className="login-main-two">
                <div className="login-card signup">
                    <h2>Signup</h2>
                    <form className='login-form' onSubmit={handleSubmit}>
                        <input type="text" name="FirstName" placeholder='Enter your first name' onChange={handleChange} required className='id-and-pass'/>
                        <input type="text" name="LastName" placeholder='Enter your last name' onChange={handleChange} required className='id-and-pass' />
                        <input type="text" name="phone" placeholder='Enter your phone number' onChange={handleChange} required className='id-and-pass'/>
                        <input type="email" name="email" placeholder='Enter your email' onChange={handleChange} required className='id-and-pass' />
                        <input type="password" name="password" placeholder='Enter your password' onChange={handleChange} required className='id-and-pass'/>
                        <input type="password" name="confirmPassword" placeholder='Confirm your password' onChange={handleChange} required className='id-and-pass'/>
                        <button className='login-button' type="submit">Register</button>
                    </form>
                    <p><a href="/login" className="signup-link">Have an account?</a></p>
                </div>
            </div>
        </div>
    );
}
