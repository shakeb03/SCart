import React, { useState } from 'react';
import Modal from 'react-modal';
import { addProduct } from '../controller/Api';


const AddProductPopup = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        imageURL: '',
        description: ''
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
        try {
            // Call the function to add the product with formData
            await addProduct(formData);
            // Clear the form data
            setFormData({
                name: '',
                price: '',
                imageURL: '',
                description: ''
            });
            // Close the popup
            onClose();
        } catch (error) {
            console.error('Error adding product:', error);
            // Handle error, such as displaying an error message to the user
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Add Product Popup"
        >
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Product Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Product Image URL:</label>
                    <input
                        type="url"
                        name="imageURL"
                        value={formData.imageURL}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Product Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <button type="submit">Add Product</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
};

export default AddProductPopup;
