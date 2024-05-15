import { auth } from './Firebase';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app'; // Adjust import statement

const firestore = firebase.firestore();

// Sign up with email and password
export const signUp = async (email, password) => {
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        console.log('User created successfully');
        // Optionally, you can return additional data or perform other actions here
    } catch (error) {
        console.error('Error creating user:', error.message);
        throw error; // Rethrow the error to handle it in the component
    }
};

// Sign in with email and password
export const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        return true; // Return true if login is successful
    } catch (error) {
        throw error; // Throw error if login fails
    }
};

// Sign out
export const signOut = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        throw error;
    }
};

// Get current user
export const getCurrentUser = () => {
    return auth.currentUser;
};

// Function to fetch all products
export const getAllProducts = async () => {
    try {
        const productsSnapshot = await firestore.collection('products').get(); // Query all products collection
        const products = productsSnapshot.docs.map(doc => ({
            id: doc.id, // Document ID
            ...doc.data() // Product data
        }));
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Function to fetch a product by its ID
export const getProductById = async (productId) => {
    try {
        const productsSnapshot = await firestore.collection('products').where('id', '==', productId).get(); // Query product by id field
        if (!productsSnapshot.empty) {
            const productDoc = productsSnapshot.docs[0];
            return { id: productDoc.id, ...productDoc.data() }; // Return product data
        } else {
            throw new Error('Product not found');
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
        throw error;
    }
};

// Function to add an order to the orders collection
export const addOrder = async (orderData) => {
    try {
        await firestore.collection('orders').add({
            ...orderData,
            createdAt: new Date()  // Server timestamp
        });
        console.log('Order added successfully');
    } catch (error) {
        console.error('Error adding order:', error);
        throw error;
    }
};


// Function to fetch orders by user email
export const getOrdersByUser = async (email) => {
    try {
        const ordersRef = firestore.collection('orders');
        const snapshot = await ordersRef.where('userEmail', '==', email).get();
        const orders = [];
        snapshot.forEach(doc => {
            orders.push(doc.data());
        });
        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

// Function to add a new product to the products collection
export const addProduct = async (productData) => {
    try {
        // Get a reference to the "products" collection
        const productsRef = firestore.collection('products');

        // Retrieve the last document from the collection to get the current maximum value of the "id" field
        const lastProductQuery = await productsRef.orderBy('id', 'desc').limit(1).get();

        let newId = 1; // Default value for the new "id" field

        // If there is at least one document in the collection, increment the "id" value by one
        if (!lastProductQuery.empty) {
            const lastProduct = lastProductQuery.docs[0].data();
            const lastId = parseInt(lastProduct.id, 10); // Convert the last "id" to a number
            newId = String(lastId + 1); // Increment the "id" value by one and convert it back to a string
        }

        // Add the new document to the collection with the incremented "id" value
        await productsRef.add({ ...productData, id: newId });
        console.log('Product added with ID: ', newId);

        return newId; // Return the new ID of the newly added product
    } catch (error) {
        console.error('Error adding product: ', error);
        throw error;
    }
};

// Function to update a product in the database
export const updateProduct = async (productId, updatedProductData) => {
    try {
        // Update the product document in the 'products' collection where the 'id' field matches the provided productId
        const productRef = await firestore.collection('products').where('id', '==', productId).get();
        if (productRef.empty) {
            throw new Error('Product not found');
        }
        productRef.forEach(doc => {
            // Update the document with the provided updated product data
            doc.ref.update(updatedProductData);
        });
        console.log('Product updated successfully');
    } catch (error) {
        throw new Error('Error updating product: ' + error.message);
    }
};

// Function to fetch product sales data
export const getProductSalesData = async () => {
    try {
        const productsRef = firestore.collection('products');
        const productSalesData = [];

        // Fetch sales data for each product
        const productsSnapshot = await productsRef.get();
        for (const productDoc of productsSnapshot.docs) {
            const productId = productDoc.id;
            const productName = productDoc.data().name;

            // Query orders collection to get sales data for the product
            const ordersRef = firestore.collection('orders');
            const productOrdersSnapshot = await ordersRef.where('productId', '==', productId).get();
            let totalSales = 0;
            productOrdersSnapshot.forEach(orderDoc => {
                const orderData = orderDoc.data();
                totalSales += orderData.quantity * orderData.unitPrice;
            });

            // Add product sales data to the array
            productSalesData.push({ productId, productName, totalSales });
        }

        return productSalesData;
    } catch (error) {
        console.error('Error fetching product sales data:', error);
        throw error;
    }
};

// Function to fetch financial year sales data
export const getFinancialYearSalesData = async () => {
    try {
        const ordersRef = firestore.collection('orders');
        const allOrdersData = [];

        // Fetch all orders
        const ordersSnapshot = await ordersRef.get();
        
        // Group orders by month and calculate total sales for each month
        const monthlySalesMap = new Map(); // Map to store monthly sales data
        ordersSnapshot.forEach(orderDoc => {
            const orderData = orderDoc.data();
            const orderDate = orderData.createdAt.toDate(); // Convert Firestore timestamp to JavaScript Date object
            const monthKey = orderDate.getMonth(); // Get the month index (0 for January, 1 for February, etc.)
            const totalSales = orderData.orderPrice;
            if (monthlySalesMap.has(monthKey)) {
                monthlySalesMap.set(monthKey, monthlySalesMap.get(monthKey) + totalSales);
            } else {
                monthlySalesMap.set(monthKey, totalSales);
            }
        });

        // Convert monthly sales map to an array of objects
        monthlySalesMap.forEach((sales, monthIndex) => {
            // Format the month index (0-based) to a human-readable month name
            const monthName = new Date(2024, monthIndex).toLocaleString('en-US', { month: 'long' });
            allOrdersData.push({ month: monthName, sales });
        });

        return allOrdersData;
    } catch (error) {
        console.error('Error fetching all orders data:', error);
        throw error;
    }
};




