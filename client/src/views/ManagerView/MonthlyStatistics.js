import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import './ManageStatistics.css';
import { Chart as ChartJS } from "chart.js/auto";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;
//const API_URL = "http://localhost:5555/api";

const ManageStatistics = () => {
    const navigate = useNavigate();

    const [employeeSales, setEmployeeSales] = useState([]);
    const [PaymentSales, setPaymentSales] = useState([]);
    const [month, setMonth] = useState(10);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [itemSales, setItemSales] = useState([]);

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

    const handleMonthChange = (event) => {
        const selectedMonth = parseInt(event.target.value, 10); // Convert month to integer
        setMonth(selectedMonth);
        fetchStatistics(selectedMonth);

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
                x: "Item Name",
                x: "Amount Sold",
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
            },
            {
                label: 'Total Sales',
                data: PaymentSales.map((Item) => Item.TotalAmount),
                backgroundColor: 'rgba(100, 192, 100, 0.2)',
                borderColor: 'black',
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
            <div className="charts">
                <Bar data={EmployeeSalesChartData} options={chartOptions}/>

            </div>
            .
            <div className={"charts"}>
                <Bar data={ItemSalesData}
                     options={{responsive: true, plugins: {title: {display: true, text: 'Top Item Sales'}}}}/>
            </div>
            .
            <div className={"charts"}>
                <Bar data={PaymentTypeData}
                     options={{responsive: true, plugins: {title: {display: true, text: `Payment Types on Month: ${month}` }}}}/>
            </div>

            <button className={"backButton"} onClick={() => navigate("/manager")}>Back</button>
        </div>
    );
};

export default ManageStatistics;
