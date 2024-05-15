import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters
import { getProductById } from '../controller/Api'; // Import getProductById function
import { CartContext } from '../CartContext';
import NavBar from './NavBar';

const Product = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null); // Define product state
    const { addToCart } = useContext(CartContext);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Fetch product details when the component mounts
        const fetchProductDetails = async () => {
            try {
                const productDetails = await getProductById(id);
                setProduct(productDetails);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProductDetails();
    }, [id]); // Dependency on id ensures this effect runs whenever id changes

    const handleAddToCart = () => {
        if (product) {
            addToCart(product); // Call the addToCart function passed as prop
            console.log(`Added ${product.name} to cart`);
        }

    };

    return (
        <div>
            <NavBar cartItems={cartItems} />
            <h1>Product Details</h1>
            {product && (
                <div>
                    <h2>{product.name}</h2>
                    <p>Price: ${product.price}</p>
                    <img src={product.imageURL} style={{ width: '250px', height: '250px', objectFit: 'cover' }} alt={product.name} />
                    <p>Description: {product.description}</p>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                </div>
            )}
        </div>
    );
};
export default Product;
