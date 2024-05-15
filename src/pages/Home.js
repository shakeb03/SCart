import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { getAllProducts } from '../controller/Api';
import { CartContext } from '../CartContext';
import { useAuthState } from 'react-firebase-hooks/auth'; // Import useAuthState
import { auth } from '../controller/Firebase';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const { addToCart } = useContext(CartContext);
    const [user] = useAuthState(auth); // Get the user from Firebase auth

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getAllProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <NavBar cartItems={cartItems} />
            <h1>Home Page</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map(product => (
                    <div key={product.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '200px' }}>
                        <img src={product.imageURL} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        <Link to={`/product/${product.id}`}>
                            <button style={{ marginRight: '5px' }}>View Details</button>
                        </Link>
                        {user && user.email === "admin@scart.com" && ( // Check if user is admin
                            <Link to={`/product/${product.id}/edit`}>
                                <button style={{ marginRight: '5px' }}>Edit</button>
                            </Link>
                        )}
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
