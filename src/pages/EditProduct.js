import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../controller/Api';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        imageURL: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await getProductById(id);
                setProduct(fetchedProduct);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            await updateProduct(id, product);
            navigate(`/product/${id}`);
            // Redirect or display a success message
        } catch (error) {
            console.error('Error updating product:', error);
            // Handle error, such as displaying an error message to the user
        }
    };

    const handleCancel = () => {
        // Redirect to the view details page of the product without saving changes
        navigate(`/`);
    };

    return (
        <div>
            <h1>Edit Product</h1>
            <img src={product.imageURL} alt={product.name} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
            <form>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Product Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Product Description:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="button" onClick={handleCancel}>Cancel</button>
                <button type="button" onClick={handleSave}>Save</button>
            </form>
        </div>
    );
};

export default EditProduct;
