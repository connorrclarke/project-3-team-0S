// Import required packages
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const dotenv = require('dotenv').config();

// Initialize the app
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5555;

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
 * Test database connection endpoint.
 *
 * @async
 * @function
 * @name testDbConnection
 * @route GET /api/test-db
 * @returns {Object} A simple confirmation of the database connection.
 * @throws {Error} If there is an issue connecting to the database.
 */
app.get('/api/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "teammembers";');
        res.json(result.rows);
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

/**
 * Endpoint to get all menu items.
 *
 * @async
 * @function
 * @name getMenuItems
 * @route GET /api/menu-items
 * @returns {Object} JSON object containing menu items.
 * @throws {Error} If there is an issue fetching menu items from the database.
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
 * Endpoint to get all menu items that are entrees.
 * 
 * @async
 * @function
 * @name getEntrees
 * @route GET /api/menu-items/entrees
 * @returns {Object} JSON object containing entree menu items.
 * @throws {Error} If there is an issue fetching entree menu items from the database.
 */
app.get('/api/menu-items/entrees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "MenuItems" WHERE "Category" = \'Entree\';');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching entrees:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Endpoint to get all menu items that are sides.
 * 
 * @async
 * @function
 * @name getSides
 * @route GET /api/menu-items/sides
 * @returns {Object} JSON object containing side menu items.
 * @throws {Error} If there is an issue fetching side menu items from the database.
 */
app.get('/api/menu-items/sides', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "MenuItems" WHERE "Category" = \'Side\';');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching sides:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Endpoint to get all menu items that are appetizers.
 * 
 * @async
 * @function
 * @name getAppetizers
 * @route GET /api/menu-items/appetizers
 * @returns {Object} JSON object containing appetizer menu items.
 * @throws {Error} If there is an issue fetching appetizer menu items from the database.
 */
app.get('/api/menu-items/appetizers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "MenuItems" WHERE "Category" = \'Appetizer\';');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching sides:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Endpoint to get all menu items that are drinks.
 * 
 * @async
 * @function
 * @name getDrinks
 * @route GET /api/menu-items/drinks
 * @returns {Object} JSON object containing drink menu items.
 * @throws {Error} If there is an issue fetching drink menu items from the database.
 */
app.get('/api/menu-items/drinks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "MenuItems" WHERE "Category" = \'Drinks\';');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching sides:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Endpoint to get all employees.
 *
 * @async
 * @function
 * @name getEmployees
 * @route GET /api/employees
 * @returns {Object} JSON object containing employee details.
 * @throws {Error} If there is an issue fetching employee data from the database.
 */
app.get('/api/employees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Employees" ORDER BY "Employed" DESC, "EmployeeId" ASC;');
        res.json(result.rows);
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
 * @route GET /api/fire/:employeeId
 * @param {Object} req - The request object containing the employee's ID.
 * @param {Object} res - The response object that will send the status of the operation.
 * @returns {Object} A message confirming the firing of the employee.
 * @throws {Error} If there is an issue with the database operation.
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
 *
 * @async
 * @function
 * @name hireEmployee
 * @route POST /api/hire
 * @param {Object} req - The request object containing the new employee's details.
 * @param {Object} res - The response object that will send a confirmation message.
 * @returns {Object} A message and the newly hired employee's information.
 * @throws {Error} If there is an issue with hiring the employee in the database.
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
 *
 * @async
 * @function
 * @name getInventory
 * @route GET /api/inventory
 * @returns {Object} JSON object containing inventory items.
 * @throws {Error} If there is an issue fetching inventory data from the database.
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
 *
 * @async
 * @function
 * @name addInventoryItem
 * @route POST /api/inventory
 * @param {Object} req - The request object containing the inventory item details.
 * @param {Object} res - The response object that will send a confirmation and the added item.
 * @returns {Object} The newly added inventory item.
 * @throws {Error} If there is an issue adding the inventory item to the database.
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
        const result = await pool.query('SELECT * FROM "MenuItems" ORDER BY "MenuItemId" ASC ;');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update the availability of a menu item
app.patch('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    const { Available } = req.body;

    if (typeof Available !== 'boolean') {
        return res.status(400).json({ error: 'Invalid value for availability. Must be a boolean.' });
    }

    try {
        const query = `
            UPDATE "MenuItems" 
            SET "available" = $1 
            WHERE "MenuItemId" = $2 
            RETURNING *;
        `;
        const values = [Available, id];

        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ message: 'Item updated successfully', item: result.rows[0] });
    } catch (error) {
        console.error('Error updating item availability:', error);
        res.status(500).json({ error: 'Failed to update item availability' });
    }
});

/**
 * Endpoint to create a new order.
 * 
 * @async
 * @function
 * @name createOrder
 * @route POST /api/order
 * @param {Object} req - The request object containing the order details.
 * @param {Object} res - The response object that will send a confirmation message.
 * @returns {Object} A message confirming the order creation and the order ID.
 * @throws {Error} If there is an issue creating the order in the database.
 */
app.post('/api/order', async (req, res) => {
    const { total, method } = req.body;

    // Hardcoded employee ID for demonstration purposes
    const employeeId = 11;

    if (!total || !method) {
        return res.status(400).json({ error: "Total amount and payment method are required." });
    }

    try {
        const query = `
            INSERT INTO "Orders" ("EmployeeId", "SaleDate", "AmountSold", "PaymentType") 
            VALUES ($1, NOW(), $2, $3)
            RETURNING "OrderId";
        `;
        const values = [employeeId, total, method];
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            throw new Error("Failed to create order");
        }

        res.status(201).json({ message: "Order created successfully", orderNumber: result.rows[0].OrderId });
    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Endpoint to get the most recent order.
 *
 * @async
 * @function
 * @name getMostRecentOrder
 * @route GET /api/lastOrder
 * @returns {Object} JSON object containing the most recent order details.
 * @throws {Error} If there is an issue fetching the most recent order from the database.
 */
app.get('/api/lastOrder', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Orders" ORDER BY "OrderId" DESC LIMIT 1;');
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No orders found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching most recent order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Server start
app.listen(port, () => { console.log(`Server started on http://localhost:${port}`); });

// Export the app module for Vercel
module.exports = app;