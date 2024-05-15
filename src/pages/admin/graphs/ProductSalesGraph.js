// ProductSalesGraph.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ProductSalesGraph = ({ productSalesData }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (productSalesData.months.length > 0 && productSalesData.products.length > 0) {
            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: productSalesData.months,
                    datasets: productSalesData.products.map(product => ({
                        label: product.name,
                        data: product.sales,
                        fill: false,
                        backgroundColor: product.backgroundColor,
                        borderColor: product.borderColor,
                        tension: 0.1
                    }))
                },
            });
        }
    }, [productSalesData]);

    return (
        <div>
            <h2>Sale of Each Product and Its Revenue Month-wise</h2>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default ProductSalesGraph;
