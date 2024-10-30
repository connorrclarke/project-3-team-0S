const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

const app = express();
const port = 3000;

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

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    //res.json({"users": ["userOne", "userTwo", "userThree"]})
    res.json({"users": ["userOne", "userTwo", "userThree", "userFour", "userFive"]})
})

app.get('/user', (req, res) => {
    teammembers = []
    pool
        .query('SELECT * FROM teammembers;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                teammembers.push(query_res.rows[i]);
            }
            const data = {teammembers: teammembers};
            console.log(teammembers);
            res.render('user', data);        
        });
});

app.get('/menu_items', (req, res) => {
    const menuItems = []; // Use const for a fixed reference
    pool
        .query('SELECT * FROM "MenuItems" WHERE "Category" = \'Entree\';')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++) {
                menuItems.push(query_res.rows[i]);
            }
            const data = { menuItems: menuItems };
            console.log(menuItems);
            //res.json(data);
            res.render('menu_items', data);
        })
        .catch(err => {
            console.error('Error executing query', err.stack);
            res.status(500).send('Something went wrong');
        });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});