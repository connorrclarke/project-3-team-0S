const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Import CORS
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
    ssl: {rejectUnauthorized: false}
});

/**
 * Handles server shutdown and cleans up database connections.
 *
 * @returns {void}
 */
process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

/**
 * Endpoint to get all menu items.
 *
 * @async
 * @function
 * @name getMenuItems
 * @returns {Object} JSON object containing menu items.
 * @throws {Error} If there is an issue fetching menu items from the database.
 */
app.get('/api/menu-items', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "MenuItems";');
        res.json(result.rows); // Send data as JSON response
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Endpoint to get all employees.
 *
 * @async
 * @function
 * @name getEmployees
 * @returns {Object} JSON object containing employee details.
 * @throws {Error} If there is an issue fetching employee data from the database.
 */
app.get('/api/employees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Employees";');
        res.json(result.rows); // Send data as JSON response
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Endpoint to fire an employee by updating their employment status.
 *
 * @async
 * @function
 * @name fireEmployee
 * @param {Object} req - The request object containing the employee's ID.
 * @param {Object} res - The response object that will send the status of the operation.
 * @returns {Object} A message confirming the firing of the employee.
 * @throws {Error} If there is an issue with the database operation.
 */
app.get('/api/fire/:employeeId', async (req, res) => {
    try {
        const employeeId = req.params.employeeId; // Get EmployeeId from URL parameter
        const result = await pool.query('UPDATE "Employees" SET "Employed" = false WHERE "EmployeeId" = $1', [employeeId]); // Use $1 for parameterized query
        res.status(200).json({ message: 'Employee fired successfully' });
    } catch (error) {
        console.error('Error firing employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Endpoint to hire a new employee.
 *
 * @async
 * @function
 * @name hireEmployee
 * @param {Object} req - The request object containing the new employee's details.
 * @param {Object} res - The response object that will send a confirmation message.
 * @returns {Object} A message and the newly hired employee's information.
 * @throws {Error} If there is an issue with hiring the employee in the database.
 */
app.post('/api/hire', async (req, res) => {
    try {
        const { firstName, lastName, role, phoneNumber, employed } = req.body; // Extract data from request body

        const result = await pool.query(
            `SELECT hire_new_employee($1, $2, $3, $4, $5)`, // Call the function using $1, $2, ... for parameters
            [firstName, lastName, role, phoneNumber, employed] // Values from the request body
        );

        res.status(201).json({ message: 'Employee hired successfully', employee: result.rows[0] });
    } catch (error) {
        console.error('Error hiring employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Endpoint to fetch all inventory items.
 *
 * @async
 * @function
 * @name getInventory
 * @returns {Object} JSON object containing inventory items.
 * @throws {Error} If there is an issue fetching inventory data from the database.
 */
app.get('/api/inventory', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Inventory";');
        res.json(result.rows); // Send data as JSON response
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Endpoint to add a new inventory item.
 *
 * @async
 * @function
 * @name addInventoryItem
 * @param {Object} req - The request object containing the inventory item details.
 * @param {Object} res - The response object that will send a confirmation and the added item.
 * @returns {Object} The newly added inventory item.
 * @throws {Error} If there is an issue adding the inventory item to the database.
 */
app.post('/api/inventory', async (req, res) => {
    try {
        const { itemName, quantity, price, description } = req.body; // Extract data from the request body

        // Insert new item into the Inventory table
        const result = await pool.query(
            `INSERT INTO "Inventory" ("ItemName", "Quantity", "Price", "Description") 
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [itemName, quantity, price, description] // Values from the request body
        );

        res.status(201).json(result.rows[0]); // Return the newly added item
    } catch (error) {
        console.error('Error adding inventory item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/api/items', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "MenuItems";');
        res.json(result.rows); // Send data as JSON response
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/items', async (req, res) => {
    console.log('Received request:', req.body);
    try {
        const { Name, Price, Seasonal, Calories, Category, available } = req.body;

        // Ensure all required fields are provided
        if (!Name || !Price || Seasonal === undefined || !Calories || !Category || available === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Fetch the largest existing MenuItemId
        const result = await pool.query('SELECT MAX("MenuItemId") AS max_id FROM "MenuItems";');
        const maxId = result.rows[0].max_id || 0; // Default to 0 if no rows exist

        // Increment the ID for the new item
        const newId = maxId + 1;

        // Insert the new item into the database
        const insertResult = await pool.query(
            `INSERT INTO "MenuItems" ("MenuItemId", "Name", "Price", "Seasonal", "Calories", "Category", "available")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;`,
            [newId, Name, Price, Seasonal, Calories, Category, available]
        );

        // Return the newly added item
        res.status(201).json(insertResult.rows[0]);
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




// Server start
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
