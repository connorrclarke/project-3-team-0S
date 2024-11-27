import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import './ManageStatistics.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_URL = "http://localhost:5555/api";

const ManageStatistics = () => {
    const [employeeSales, setEmployeeSales] = useState([]);
    const [month, setMonth] = useState(1); // Default to January (1)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchStatistics = async (selectedMonth) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/stats/top-employee-sales/${selectedMonth}`);
            if (!response.ok) {
                throw new Error('Failed to fetch employee sales');
            }
            const data = await response.json();
            setEmployeeSales(data);
        } catch (err) {
            setError(err.message || 'Error fetching employee sales data');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatistics(month);  // Fetch data when the component mounts or when month changes
    }, [month]);

    const handleMonthChange = (event) => {
        const selectedMonth = parseInt(event.target.value, 10); // Convert month to integer
        setMonth(selectedMonth);
        fetchStatistics(selectedMonth);
    };

    const chartData = {
        labels: employeeSales.map((employee) => `Employee ${employee.EmployeeID}`),
        datasets: [
            {
                label: 'Total Sales',
                data: employeeSales.map((employee) => employee.TotalSales),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `Employee Sales for Month ${month}`,
            },
            tooltip: {
                callbacks: {
                    label: (context) => `Employee ${context.label}: $${context.raw}`,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Employee ID',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Total Sales ($)',
                },
                beginAtZero: true,
            },
        },
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="statistics-page">
            <h1>Manage Monthly Statistics</h1>

            {/* Month Selector */}
            <div>
                <label htmlFor="month">Select Month: </label>
                <select id="month" value={month} onChange={handleMonthChange}>
                    <option value={1}>January</option>
                    <option value={2}>February</option>
                    <option value={3}>March</option>
                    <option value={4}>April</option>
                    <option value={5}>May</option>
                    <option value={6}>June</option>
                    <option value={7}>July</option>
                    <option value={8}>August</option>
                    <option value={9}>September</option>
                    <option value={10}>October</option>
                    <option value={11}>November</option>
                    <option value={12}>December</option>
                </select>
            </div>

            {/* Histogram: Employee Sales */}
            <section>
                <h2>Employee Sales Histogram</h2>
                <div className="chart-container">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </section>
        </div>
    );
};

export default ManageStatistics;
