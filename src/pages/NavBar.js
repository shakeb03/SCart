import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../controller/Firebase';
import AddProductPopup from '../component/AddProductPopup';
import { CartContext } from '../CartContext';

const NavBar = () => {
    const [user] = useAuthState(auth);
    const { cartItems } = useContext(CartContext);
    const isUser =  user ? true : false;
    const isAdmin = user && user.email === "admin@scart.com";

    const [showAddProductPopup, setShowAddProductPopup] = useState(false);

    const handleSignOut = () => {
        auth.signOut(); // Sign out the user
    };

    const handleAddProduct = () => {
        setShowAddProductPopup(true);
    };

    const handleCancel = () => {
        setShowAddProductPopup(false);
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#f0f0f0' }}>
            <div>
                <Link to="/">Home</Link>
                <Link to="/cart" style={{ marginLeft: '20px' }}>Cart ({cartItems.length})</Link>
                {isAdmin ? (
                    <>
                        <Link to="/adminDashboard" style={{ marginLeft: '20px' }}>Admin Dashboard</Link>
                        <button onClick={handleAddProduct} style={{ marginLeft: '20px' }}>Add Product</button>
                    </>
                ) : (
                    isUser && <Link to="/dashboard" style={{ marginLeft: '20px' }}>Dashboard</Link>
                )}
            </div>
            <div>
                {user ? (
                    <>
                        <p>Welcome, {user.email}</p>
                        <button onClick={handleSignOut}>Sign Out</button>
                    </>
                ) : (
                    <Link to="/login">Log In</Link>
                )}
            </div>

            {showAddProductPopup && (
                <AddProductPopup
                    isOpen={showAddProductPopup}
                    onClose={handleCancel}
                />
            )}
        </nav>
    );
};

export default NavBar;
