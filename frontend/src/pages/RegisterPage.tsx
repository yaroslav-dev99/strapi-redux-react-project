import React, { useState } from 'react';
import { useRegisterMutation, useCreateCartMutation } from '../api/apiSlice'; // Replace with your RTK Query slice
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [register, { isLoading, error }] = useRegisterMutation();
    const [registerCart ] = useCreateCartMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await register({ username, email, password }).unwrap();
            console.log('Register success:', result);
            const cart = await registerCart({user:result.user.id}).unwrap();
            // Save the JWT token (example: to localStorage)
            localStorage.setItem('token', result.jwt);
            localStorage.setItem('user', JSON.stringify(result.user));

            // Redirect user to the home or dashboard page
            navigate('/product-page');
        } catch (err) {
            //console.error('Register failed:', err);
            alert("username or email address is already taken.");
        }
    };

    return (
        <div className="register-page">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Username:</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            {error && <p className="error">Register failed. Please try again.</p>}
            <button type="submit" disabled={isLoading}>
            {isLoading ? 'Registering in...' : 'Register'}
            </button>
            <a type="button" href='/login'>Login</a>
        </form>
        </div>
    );
};

export default RegisterPage;
