import React, { useState } from 'react';
import { useLoginMutation } from '../api/apiSlice'; 
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ identifier: email, password }).unwrap();
      console.log('Login success:', result);

      // Save the JWT token (example: to localStorage)
      localStorage.setItem('token', result.jwt);
      localStorage.setItem('user', JSON.stringify(result.user));
      // Redirect user to the home or dashboard page
      navigate('/product-page');
    } catch (err) {
      console.error('Login failed:', err);alert(err);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        {error && <p className="error">Invalid credentials. Please try again.</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <a type="button" href='/register'>Register</a>
      </form>
    </div>
  );
};

export default LoginPage;
