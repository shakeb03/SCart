import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home.js';

import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Product from '../pages/Product';
import Dashboard from '../pages/Dashboard';
import EditProduct from '../pages/EditProduct';
import AdminDashboard from '../pages/admin/AdminDashboard.js';


const Routers = () => {
    return <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/product/:id/edit' element={<EditProduct />} />
        <Route path='/admindashboard' element={<AdminDashboard />} />
    </Routes>
}

export default Routers;