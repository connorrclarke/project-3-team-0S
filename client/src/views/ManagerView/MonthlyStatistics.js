import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import './ManageStatistics.css';
import { useNavigate } from "react-router-dom";
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register the components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_URL = process.env.REACT_APP_API_URL;
//const API_URL = "http://localhost:5555/api";

/**
 * @function ManageStatistics
 * @description Component for viewing and managing monthly sales statistics.
 * @returns {JSX.Element}
 */
const ManageStatistics = () => {
    const navigate = useNavigate();

    const [employeeSales, setEmployeeSales] = useState([]);
    const [PaymentSales, setPaymentSales] = useState([]);
    const [month, setMonth] = useState(10);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [itemSales, setItemSales] = useState([]);

    /**
     * @function fetchStatistics
     * @description Fetches employee sales statistics for a specific month.
     * @param {number} month - The month for which data is requested.
     * @returns {Promise<void>}
     */
    const fetchStatistics = async (month) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/stats/top-employee-sales/${month}`);
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

    /**
     * @function fetchPaymentStats
     * @description Fetches payment method statistics for a specific month.
     * @param {number} month - The month for which data is requested.
     * @returns {Promise<void>}
     */
    const fetchPaymentStats = async (month) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/stats/dailypayment/${month}`);
            if (!response.ok) {
                throw new Error('Failed to fetch payment sales');
            }
            const data = await response.json();
            setPaymentSales(data);
        } catch (err) {
            setError(err.message || 'Error fetching payment sales data');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * @function fetchItemSales
     * @description Fetches top-selling items data.
     * @returns {Promise<void>}
     */
    const fetchItemSales = async () => {
        try {
            const response = await fetch(`${API_URL}/stats/top-item-sales/`);
            if (!response.ok) {
                throw new Error('Failed to fetch item sales');
            }
            const data = await response.json();
            setItemSales(data);
        } catch (err) {
            setError(err.message || 'Error fetching item sales data');
            console.error('Error:', err);
        }
    };

    useEffect(() => {
        fetchStatistics(month); // Fetch employee sales when the component mounts or month changes
        fetchPaymentStats(month)
    }, [month]);

    useEffect(() => {
        fetchItemSales(); // Fetch item sales when the component mounts
    }, []);

    /**
     * @function handleMonthChange
     * @description Updates the displayed statistics based on the selected month.
     * @param {Object} event - The event object from the month selector.
     * @returns {void}
     */
    const handleMonthChange = (event) => {
        const selectedMonth = parseInt(event.target.value, 10); // Convert month to integer
        setMonth(selectedMonth);
        fetchStatistics(selectedMonth);

    };

    const paymentChartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `Payment Types on Month: ${month}`,
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw}`,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Payment Type',
                },
            },
            y1: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Times Used',
                },
                beginAtZero: true,
            },
            y2: {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'Total Sales ($)',
                },
                beginAtZero: true,
                grid: {
                    drawOnChartArea: false, // Avoid grid lines overlapping
                },
            },
        },
    };

    const EmployeeSalesChartData = {
        labels: employeeSales.map((employee) => `Employee ${employee.EmployeeId}`),
        datasets: [
            {
                label: 'Total Sales',
                data: employeeSales.map((employee) => employee.TotalSales),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'black',
                borderWidth: 1,
            },
        ],
    };

    const ItemSalesData = {
        labels: itemSales.map((item) => `${item.Item}`),
        datasets: [
            {
                label: 'All time Orders',

                data: itemSales.map((item) => item.TimesOrdered),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };
    const PaymentTypeData = {
        labels: PaymentSales.map((Item) => `${Item.Item}`),
        datasets: [
            {
                label: 'Times Used',
                data: PaymentSales.map((Item) => Item.TimesUsed),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'black',
                borderWidth: 1,
                yAxisID: 'y1',
            },
            {
                label: 'Total Sales',
                data: PaymentSales.map((Item) => Item.TotalAmount),
                backgroundColor: 'rgba(100, 192, 100, 0.2)',
                borderColor: 'black',
                borderWidth: 1,
                yAxisID: 'y2',
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
            <div className="charts">
                <Bar data={EmployeeSalesChartData} options={chartOptions}/>

            </div>
            
            <div className={"charts"}>
                <Bar data={ItemSalesData}
                     options={{responsive: true, plugins: {title: {display: true, text: 'Top Item Sales'}}}}/>
            </div>
            
            <div className={"charts"}>
                <Bar data={PaymentTypeData}
                     options={paymentChartOptions}/>
            </div>

            <button className={"backButton"} onClick={() => navigate("/manager")}>Back</button>
        </div>
    );
};

export default ManageStatistics;