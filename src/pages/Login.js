import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { signInWithEmailAndPassword } from '../controller/Api';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate(); // Initialize navigate function

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call signInWithEmailAndPassword function from API
            await signInWithEmailAndPassword(formData.email, formData.password);
            // If login is successful, navigate to home page
            navigate('/');
        } catch (error) {
            // Handle login error
            alert('Failed to login. Please check your credentials.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    );
};

export default Login;
