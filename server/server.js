const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const port = 5555;

// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: { rejectUnauthorized: false }
});

/**
 * Handles server shutdown and cleans up database connections.
 */
process.on('SIGINT', () => {
    pool.end().then(() => {
        console.log('Application successfully shutdown');
        process.exit(0);
    }).catch(err => {
        console.error('Error shutting down pool:', err);
        process.exit(1);
    });
});

/**
 * Endpoint to get all menu items.
 */
app.get('/api/menu-items', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "MenuItems";');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Endpoint to get all employees.
 */
app.get('/api/employees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Employees";');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Endpoint to fire an employee.
 */
app.get('/api/fire/:employeeId', async (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        await pool.query('UPDATE "Employees" SET "Employed" = false WHERE "EmployeeId" = $1', [employeeId]);
        res.status(200).json({ message: 'Employee fired successfully' });
    } catch (error) {
        console.error('Error firing employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Endpoint to hire a new employee.
 */
app.post('/api/hire', async (req, res) => {
    try {
        const { firstName, lastName, role, phoneNumber, employed } = req.body;
        const result = await pool.query(
            `SELECT hire_new_employee($1, $2, $3, $4, $5)`,
            [firstName, lastName, role, phoneNumber, employed]
        );
        res.status(201).json({ message: 'Employee hired successfully', employee: result.rows[0] });
    } catch (error) {
        console.error('Error hiring employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Endpoint to fetch all inventory items.
 */
app.get('/api/inventory', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Inventory";');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Endpoint to add a new inventory item.
 */
app.post('/api/inventory', async (req, res) => {
    try {
        const { itemName, quantity, price, description } = req.body;
        const result = await pool.query(
            `INSERT INTO "Inventory" ("ItemName", "Quantity", "Price", "Description") 
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [itemName, quantity, price, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding inventory item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Endpoint to get all menu items (use this for the frontend to get the list).
 */
app.get('/api/items', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "MenuItems";');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Endpoint to add a new menu item.
 */
app.post('/api/items', async (req, res) => {
    const { MenuItemID, Name, Price, Seasonal, Calories, Category, Available } = req.body;

    // Ensure all required fields are provided
    if (!MenuItemID || !Name || !Price || !Calories || !Category) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const query = `
            INSERT INTO "MenuItems" ("MenuItemId", "Name", "Price", "Seasonal", "Calories", "Category", "available")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const values = [MenuItemID, Name, Price, Seasonal, Calories, Category, Available];
        await pool.query(query, values);
        res.status(201).json({ message: 'Item added successfully' });
    } catch (error) {
        console.error('Error adding menu item:', error);
        res.status(500).json({ error: 'Failed to add menu item' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
