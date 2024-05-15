import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../AuthContext';
import { getOrdersByUser } from '../controller/Api';
import Chart from 'chart.js/auto';
import { CartContext } from '../CartContext';
import NavBar from './NavBar';

const Dashboard = () => {
    const { currentUser } = useAuth();
    const [orders, setOrders] = useState([]);
    const chartRef = useRef(null);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                const userOrders = await getOrdersByUser(currentUser.email);
                setOrders(userOrders);
            } catch (error) {
                console.error('Error fetching user orders:', error);
            }
        };
        fetchUserOrders();
    }, [currentUser.email]);

    const getOrdersByMonth = () => {
        const ordersByMonth = {};
        orders.forEach(order => {
            const month = new Date(order.createdAt).getMonth();
            if (!ordersByMonth[month]) {
                ordersByMonth[month] = 1;
            } else {
                ordersByMonth[month]++;
            }
        });
        return ordersByMonth;
    };

    const renderChart = () => {
        const ordersByMonth = getOrdersByMonth();
        const months = Object.keys(ordersByMonth);
        const orderCounts = Object.values(ordersByMonth);

        if (chartRef.current) {
            chartRef.current.destroy(); // Destroy previous chart instance
        }

        const ctx = document.getElementById('ordersChart');
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months.map(month => new Date(0, month).toLocaleString('default', { month: 'long' })),
                datasets: [{
                    label: 'Number of Orders',
                    data: orderCounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    useEffect(() => {
        renderChart();
    }, [orders]); // Re-render chart when orders change

    return (
        <div>
            <NavBar cartItems={cartItems} />
            <h1>Dashboard</h1>
            <canvas id="ordersChart" width="250" height="250"></canvas>
        </div>
    );
};

export default Dashboard;
