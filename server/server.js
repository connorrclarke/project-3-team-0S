const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Import CORS


const dotenv = require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

// Add process hook to shutdown pool
process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

app.get('/', (req, res) => {
    res.send('Server Started!');
});

// app.get('/user', (req, res) => {
//     teammembers = []
//     pool
//         .query('SELECT * FROM teammembers;')
//         .then(query_res => {
//             for (let i = 0; i < query_res.rowCount; i++){
//                 teammembers.push(query_res.rows[i]);
//             }
//             const data = {teammembers: teammembers};
//             console.log(teammembers);
//             res.render('user', data);
//         });
// });

// app.get('/api/menu_items', (req, res) => {
//     const menuItems = []; // Use const for a fixed reference
//     pool
//         .query('SELECT * FROM "MenuItems" WHERE "Category" = \'Entree\';')
//         .then(query_res => {
//             for (let i = 0; i < query_res.rowCount; i++) {
//                 menuItems.push(query_res.rows[i]);
//             }
//             const data = { menuItems: menuItems };
//             console.log(menuItems);
//             //res.json(data);
//             res.render('menu_items', data);
//         })
//         .catch(err => {
//             console.error('Error executing query', err.stack);
//             res.status(500).send('Something went wrong');
//         });
// });

app.get('/api/menu-items', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "MenuItems";');
        res.json(result.rows); // Send data as JSON response
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/employees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Employees";');
        res.json(result.rows); // Send data as JSON response
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

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

app.post('/api/hire', async (req, res) => {
    try {
        const {firstName, lastName, role, phoneNumber , employed} = req.body; // Extract data from request body

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


app.get('/api/inventory', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Inventory";');
        res.json(result.rows); // Send data as JSON response
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
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




app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});