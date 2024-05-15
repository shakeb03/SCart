import React, { useState } from 'react';
import { signUp } from '../controller/Api';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            await signUp(formData.email, formData.password);
            console.log('User signed up successfully');
            // Optionally, you can navigate to another page or show a success message
        } catch (error) {
            console.error('Signup error:', error);
            // Handle signup errors (e.g., display error message to the user)
            alert(error.message);
        }
    };

    const isFormValid = () => {
        return formData.email && formData.password;
    };

    return (
        <div>
            <h1>Sign Up</h1>
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
                    <label>Create Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={!isFormValid()}>Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
