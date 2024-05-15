// FinancialYearSalesGraph.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const FinancialYearSalesGraph = ({ salesData, productSalesData }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (salesData.length > 0 && productSalesData.months.length > 0 && productSalesData.products.length > 0) {
            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [
                        {
                            label: 'Sales in Current Financial Year',
                            backgroundColor: 'rgba(75,192,192,0.2)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                            hoverBorderColor: 'rgba(75,192,192,1)',
                            data: salesData
                        },
                        ...productSalesData.products.map(product => ({
                            label: `${product.name} Sales`,
                            backgroundColor: product.backgroundColor,
                            borderColor: product.borderColor,
                            borderWidth: 1,
                            data: product.sales
                        }))
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [salesData, productSalesData]);

    return (
        <div>
            <h2>Sales in Current Financial Year (Jan to Dec)</h2>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default FinancialYearSalesGraph;
