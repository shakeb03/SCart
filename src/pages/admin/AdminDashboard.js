import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { getFinancialYearSalesData } from '../../controller/Api';
import NavBar from '../NavBar';

const AdminDashboard = () => {
    const [salesData, setSalesData] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    // const [user] = useAuthState(auth); // Get the user from Firebase auth

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const data = await getFinancialYearSalesData();
                setSalesData(data);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchSalesData();
    }, []);

    const chartRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current || !salesData.length) return;

        const ctx = chartRef.current.getContext('2d');

        const newChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: salesData.map(item => item.month),
                datasets: [{
                    label: 'Total Sales',
                    data: salesData.map(item => item.sales),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Months'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Price in $'
                        }
                    }
                }
            }
        });

        return () => {
            newChart.destroy();
        };
    }, [salesData]);

    return (
        <div>
            <NavBar cartItems={cartItems} />
            <div style={{ width: '600px', height: '400px' }}>
                <h2>Total Sales Month-wise</h2>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
};

export default AdminDashboard;
