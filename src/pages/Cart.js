import React, { useState, useContext } from 'react';
import NavBar from './NavBar';
import { CartContext } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../controller/Api';
import { useAuth } from '../AuthContext';


const Cart = () => {
    const { cartItems, deleteFromCart, updateQuantity, clearCart } = useContext(CartContext);
    const isLoggedIn = true;
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    // const username = "TestUser";
    const username = currentUser ? currentUser.email : '';

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) {
            newQuantity = 1; // Set the default quantity to 1 if newQuantity is less than 1
        }
        updateQuantity(productId, newQuantity); // Call updateQuantity function from CartContext
    };

    const handleDeleteProduct = (productId) => {
        deleteFromCart(productId); // Call deleteFromCart function from CartContext
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handlePlaceOrder = async () => {
        try {
            const productNames = cartItems.map(item => item.name);
            // Prepare order data
            const orderData = {
                orderPrice: calculateTotal(),
                productName: productNames,
                userEmail: username,
                // Add more fields as needed, such as user information
            };

            // Call the API to add the order
            await addOrder(orderData);

            // Clear the cart after placing the order
            clearCart();

            // Redirect to a success page or display a success message
            navigate('/Checkout');
        } catch (error) {
            console.error('Error placing order:', error);
            // Handle error, such as displaying an error message to the user
        }
    };

    return (
        <div>
            <NavBar cartItems={cartItems} isLoggedIn={isLoggedIn} username={username} />
            <h1>Cart</h1>
            {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    <img src={item.imageURL} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                    <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <h3>{item.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ marginRight: '5px' }}>Quantity: </label>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                min="1"
                            />
                            <button style={{ marginLeft: '10px' }} onClick={() => handleDeleteProduct(item.id)}>Delete</button>
                        </div>
                        <p>Price: ${item.price}</p>
                    </div>
                </div>
            ))}
            <div style={{ borderTop: '1px solid #ccc', paddingTop: '10px', marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p>Total Price: ${calculateTotal()}</p>
                <button onClick={handlePlaceOrder}>Place Order</button>
            </div>
        </div>
    );
};

export default Cart;
