// Import required packages
const express = require('express'); // Express framework
const { auth, requiresAuth } = require('express-openid-connect'); // Auth0 middleware
const { Pool } = require('pg'); // PostgreSQL client
const cors = require('cors'); // Cross-Origin Resource Sharing middleware
const dotenv = require('dotenv').config(); // Environment variable loader

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

const config = {
    authRequired: false, // Users can access public routes without logging in
    auth0Logout: true, // Use Auth0 logout endpoint
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};
app.use(auth(config));

/**
 * Root route.
 * @name GET /
 * @description Checks if the user is authenticated and returns a message accordingly.
 * @returns {string} "Logged in" if authenticated, otherwise "Logged out".
 */
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

/**
 * Protected route.
 * @name GET /protected
 * @description Returns a personalized message if the user is authenticated.
 * @throws {401} Unauthorized if the user is not logged in.
 * @returns {Object} Greeting message for the authenticated user.
 */
app.get('/protected', (req, res) => {
    if (!req.oidc.isAuthenticated()) {
        return res.status(401).send('Unauthorized');
    }
    res.json({ message: `Hello, ${req.oidc.user.name}!` });
});

/**
 * Profile route.
 * @name GET /profile
 * @description Returns the user's profile information. Authentication required.
 * @returns {Object} JSON representation of the user's profile.
 */
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

/**
 * Graceful shutdown handler.
 *
 * @event SIGINT
 * @description Closes the database pool when the application is terminated.
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
 * @async
 * @name testDbConnection
 * @route GET /api/test-db
 * @description Verifies database connectivity by fetching sample data.
 * @returns {Object} A JSON response with database rows.
 * @throws {500} Internal server error if the connection fails.
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
 * Fetch all menu items.
 * @async
 * @name getMenuItems
 * @route GET /api/menu-items
 * @description Retrieves all menu items from the database.
 * @returns {Object} JSON object containing menu items.
 * @throws {500} Internal server error on failure.
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
 * Fetch entree items.
 * @async
 * @name getEntrees
 * @route GET /api/menu-items/entrees
 * @description Retrieves all entree items from the database.
 * @returns {Object} JSON object containing entree items.
 * @throws {500} Internal server error on failure.
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
 * Fetch side items.
 * @async
 * @name getSides
 * @route GET /api/menu-items/sides
 * @description Retrieves all side items from the database.
 * @returns {Object} JSON object containing side items.
 * @throws {500} Internal server error on failure.
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
 * Fetch appetizer items.
 * @async
 * @name getAppetizers
 * @route GET /api/menu-items/appetizers
 * @description Retrieves all appetizer items from the database.
 * @returns {Object} JSON object containing appetizer items.
 * @throws {500} Internal server error on failure.
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
 * Fetch drink items.
 * @async
 * @name getDrinks
 * @route GET /api/menu-items/drinks
 * @description Retrieves all drink items from the database.
 * @returns {Object} JSON object containing drink items.
 * @throws {500} Internal server error on failure.
 */
app.get('/api/menu-items/drinks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "MenuItems" WHERE "Category" = \'Drink\';');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching sides:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Fetch employee list.
 * @async
 * @name getEmployees
 * @route GET /api/employees
 * @description Retrieves all employees from the database.
 * @returns {Object} JSON object containing employee details.
 * @throws {500} Internal server error on failure.
 */
app.get('/api/employees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Employees" ORDER BY "EmployeeId" ASC ;');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Fire an employee.
 * @async
 * @name fireEmployee
 * @route GET /api/fire/:employeeId
 * @description Updates the employment status of an employee to 'false'.
 * @param {string} employeeId - The ID of the employee to fire.
 * @returns {Object} A confirmation message.
 * @throws {500} Internal server error on failure.
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
 * Hire a new employee.
 * @async
 * @name hireEmployee
 * @route POST /api/hire
 * @description Adds a new employee to the database.
 * @param {Object} req.body - The employee's details.
 * @returns {Object} Confirmation message and the new employee's information.
 * @throws {500} Internal server error on failure.
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
 * Fetch inventory items.
 * @async
 * @name getInventory
 * @route GET /api/inventory
 * @description Retrieves all inventory items from the database.
 * @returns {Object} JSON object containing inventory items.
 * @throws {500} Internal server error on failure.
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
 * Add an inventory item.
 * @async
 * @name addInventoryItem
 * @route POST /api/inventory
 * @description Adds a new inventory item to the database.
 * @param {Object} req.body - The inventory item's details.
 * @returns {Object} The newly added inventory item.
 * @throws {500} Internal server error on failure.
 */
app.post('/api/inventory', async (req, res) => {
    try {
        const { itemName, quantity, description } = req.body;

        // Find the next biggest InventoryId
        const idResult = await pool.query(`SELECT MAX("InventoryId") AS maxId FROM "Inventory"`);
        const nextInventoryId = (idResult.rows[0].maxid || 0 ) + 1 ; // If no rows exist, start from 1
        console.log(`Command Executed: INSERT INTO "Inventory" (${nextInventoryId} , ${itemName}, ${quantity}, ${description}) \n
       ` )
        // Insert the new inventory item with the calculated InventoryId
        const result = await pool.query(
            `INSERT INTO "Inventory" ("InventoryId", "Ingredient", "Quantity", "QuantityUnit") 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [nextInventoryId, itemName, quantity, description]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding inventory item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


/**
 * Fetch all menu items for the frontend.
 * @async
 * @name getItems
 * @route GET /api/items
 * @description Retrieves all menu items from the database.
 * @returns {Object} JSON object containing menu items.
 * @throws {500} Internal server error on failure.
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

/**
 * Add a menu item.
 * @async
 * @name addMenuItem
 * @route POST /api/items
 * @description Adds a new menu item and links it to inventory.
 * @param {Object} req.body - The menu item's details.
 * @returns {Object} JSON object with the new menu and inventory item.
 * @throws {500} Internal server error on failure.
 */
app.post('/api/items', async (req, res) => {
    const { Name, Price, Seasonal, Calories, Category, Available } = req.body;

    try {
        const insertMenuQuery = `
            INSERT INTO "MenuItems" 
            ("Name", "Price", "Seasonal", "Calories", "Category", "available") 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *;
        `;
        const menuValues = [Name, Price, Seasonal, Calories, Category, Available];
        const insertMenuResult = await pool.query(insertMenuQuery, menuValues);
        const newMenuItem = insertMenuResult.rows[0];

        // Insert a corresponding inventory item
        const insertInventoryQuery = `
            INSERT INTO "Inventory" 
            ("Ingredient") 
            VALUES ($1)
            RETURNING *;
        `;
        const inventoryValues = [Name];
        const insertInventoryResult = await pool.query(insertInventoryQuery, inventoryValues);
        const newInventoryItem = insertInventoryResult.rows[0];

        // Link the menu item and inventory item
        const linkQuery = `
            INSERT INTO "MenuInventoryJunction" ("MenuItemId", "InventoryId") 
            VALUES ($1, $2);
        `;
        await pool.query(linkQuery, [newMenuItem.MenuItemId, newInventoryItem.InventoryId]);

        // Respond with both the new menu item and inventory item
        res.status(201).json({
            menuItem: newMenuItem,
            inventoryItem: newInventoryItem,
        });
    } catch (err) {
        console.error('Error adding new item:', err);
        res.status(500).json({ error: 'Failed to add new menu and inventory item' });
    }
});

/**
 * Update menu item availability.
 * @async
 * @name updateItemAvailability
 * @route PATCH /api/items/:id
 * @description Updates the availability status of a menu item.
 * @param {string} id - The menu item's ID.
 * @param {boolean} req.body.Available - Availability status.
 * @returns {Object} Confirmation message and the updated item.
 * @throws {400} Invalid input.
 * @throws {500} Internal server error on failure.
 */
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
 * Create a new order.
 * @async
 * @name createOrder
 * @route POST /api/order
 * @description Adds a new order to the database.
 * @param {Object} req.body - The order details.
 * @returns {Object} Confirmation message and order ID.
 * @throws {400} Missing or invalid input.
 * @throws {500} Internal server error on failure.
 */
app.post('/api/order', async (req, res) => {
    const { total, method } = req.body;

    // Hardcoded employee ID for demonstration purposes
    const employeeId = 1;

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
        res.status(500).json({ error: 'Internal server error {Ordering}' });
    }
});

/**
 * Update inventory for menu items.
 * @async
 * @name updateInventory
 * @route POST /api/updateInventory
 * @description Updates inventory quantities based on menu item orders.
 * @param {Object} req.body - The menu item's name and quantity.
 * @returns {Object} Confirmation message.
 * @throws {400} Invalid input.
 * @throws {500} Internal server error on failure.
 */
app.post('/api/updateInventory', async (req, res) => {
    const { menuItemName, quantity } = req.body;

    if (!menuItemName || typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ error: "Invalid input: menuItemName and quantity are required." });
    }

    const sqlGetIngredients = `
        SELECT i."InventoryId", i."Quantity" 
        FROM "MenuInventoryJunction" mij
        JOIN "Inventory" i ON mij."InventoryId" = i."InventoryId"
        JOIN "MenuItems" mi ON mij."MenuItemId" = mi."MenuItemId"
        WHERE mi."Name" = $1;
    `;
    const sqlUpdateInventory = `
        UPDATE "Inventory" 
        SET "Quantity" = "Quantity" - $1 
        WHERE "InventoryId" = $2;
    `;

    try {
        // Get the inventory items associated with the menu item
        const result = await pool.query(sqlGetIngredients, [menuItemName]);

        // Update the inventory for each ingredient
        for (const row of result.rows) {
            const { InventoryId, Quantity } = row;

            // Ensure sufficient inventory
            if (Quantity < quantity) {
                return res.status(400).json({ 
                    error: `Insufficient inventory for ingredient ID ${InventoryId}. Current: ${Quantity}, Required: ${quantity}` 
                });
            }

            await pool.query(sqlUpdateInventory, [quantity, InventoryId]);
        }

        res.status(200).json({ message: "Inventory updated successfully!" });
    } catch (error) {
        console.error("Error updating inventory:", error);
        res.status(500).json({ error: "Internal server error {Inventory}" });
    }
});

/**
 * Fetch least popular items.
 * @async
 * @name getLeastPopularItems
 * @route GET /api/stats/least-popular
 * @description Retrieves the least popular menu items.
 * @returns {Object} JSON object containing items.
 * @throws {500} Internal server error on failure.
 */
app.get('/api/stats/least-popular', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM get_least_popular_item();');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching least popular items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Fetch most popular item by day.
 * @async
 * @name getMostPopularDay
 * @route GET /api/stats/most-popular-day
 * @description Retrieves the most popular item for a specific day.
 * @returns {Object} JSON object containing the item.
 * @throws {500} Internal server error on failure.
 */
app.get('/api/stats/most-popular-day', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM get_most_popular_item_on_day($1);', [new Date()]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching most popular items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Fetch top employee sales for the month.
 * @async
 * @name getTopEmployeeSales
 * @route GET /api/stats/top-employee-sales
 * @description Retrieves employee sales statistics for the month.
 * @returns {Object} JSON object containing sales data.
 * @throws {500} Internal server error on failure.
 */
app.get('/api/stats/top-employee-sales', async (req, res) => {
    try {
        const currentDate = new Date();
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const result = await pool.query('SELECT * FROM get_top_employee_sales_for_month($1);', [startOfMonth]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching top employee sales:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Fetch sales in a specific month.
 * @async
 * @name getSalesInMonth
 * @route GET /api/stats/salesinMonth/:month
 * @param {string} month - The month for which sales data is requested.
 * @returns {Object} JSON object containing sales data.
 * @throws {500} Internal server error on failure.
 */
app.get('/api/stats/salesinMonth/:month', async (req, res) => {
    try {
        const { month } = req.params;

        // Use parameterized queries to avoid SQL injection risks
        const query = 'SELECT * FROM "Orders" WHERE EXTRACT(MONTH FROM "SaleDate") = $1';

        const result = await pool.query(query, [month]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching top sales:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Fetch top employee sales for a specific month.
 * @async
 * @name getTopEmployeeSalesByMonth
 * @route GET /api/stats/top-employee-sales/:month
 * @description Retrieves the total sales for each employee in the specified month.
 * @param {Object} req - The request object containing the month as a URL parameter.
 * @param {Object} res - The response object that sends back the sales data or an error.
 * @returns {Object} JSON object containing employee IDs and their total sales.
 * @throws {404} If no sales data is found for the given month.
 * @throws {500} Internal server error on failure.
 */
app.get('/api/stats/top-employee-sales/:month', async (req, res) => {
    try {
        const { month } = req.params; // Get the month parameter from the URL
        console.log('Month received:', month);  // Add logging to check the month value

        const query = `
            SELECT "EmployeeId", SUM("AmountSold") AS "TotalSales"
            FROM "Orders"
            WHERE EXTRACT(MONTH FROM "SaleDate") = $1
            GROUP BY "EmployeeId"
            ORDER BY "EmployeeId" ASC         `;

        console.log('Executing query:', query, 'with month:', month);  // Add logging for query

        const result = await pool.query(query, [month]);  // Execute the query with the month parameter

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No sales data found for this month' });
        }

        res.json(result.rows);  // Return the result as JSON
    } catch (error) {
        console.error('Error fetching employee sales:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Fetch payment statistics for a specific month.
 * @async
 * @name getDailyPaymentStats
 * @route GET /api/stats/dailypayment/:month
 * @description Retrieves the payment types used, their usage counts, and total amounts for the specified month.
 * @param {Object} req - The request object containing the month as a URL parameter.
 * @param {Object} res - The response object that sends back the payment statistics or an error.
 * @returns {Object} JSON object containing payment type statistics.
 * @throws {404} If no data is found for the given month.
 * @throws {500} Internal server error on failure.
 */
app.get('/api/stats/dailypayment/:month', async (req, res) => {
    try {
        const { month } = req.params; // Get the month parameter from the URL
        console.log('Month received:', month);  // Add logging to check the month value

        const query = `
            SELECT
                o."PaymentType" AS "Item",
                COUNT(o."PaymentType") AS "TimesUsed",
                SUM(o."AmountSold" ) AS "TotalAmount"
            FROM
                "Orders" o
            WHERE EXTRACT(MONTH FROM "SaleDate") = $1
            GROUP BY
                o."PaymentType"
            ;`;

        const result = await pool.query(query, [month]);  // Execute the query with the month parameter

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No sales data found for this month' });
        }

        res.json(result.rows);  // Return the result as JSON
    } catch (error) {
        console.error('Error fetching employee sales:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Fetch the most frequently ordered menu items.
 * @async
 * @name getTopItemSales
 * @route GET /api/stats/top-item-sales/
 * @description Retrieves the top menu items based on the number of times they were ordered.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object that sends back the item sales data or an error.
 * @returns {Object} JSON object containing menu items and their order counts.
 * @throws {404} If no sales data is found.
 * @throws {500} Internal server error on failure.
 */
app.get('/api/stats/top-item-sales/', async (req, res) => {
    try {

        const query = `
            SELECT
                mi."Name" AS "Item",
                COUNT(moj."MenuItemId") AS "TimesOrdered"
            FROM
                "MenuOrderJunction" moj
                    JOIN
                "MenuItems" mi
                ON
                    moj."MenuItemId" = mi."MenuItemId"
            GROUP BY
                mi."Name"
            ;
        `;

        const result = await pool.query(query);  // Execute the query with the month parameter

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No sales data found for this month' });
        }

        res.json(result.rows);  // Return the result as JSON
    } catch (error) {
        console.error('Error fetching employee sales:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Reset inventory to initial values.
 * @async
 * @name resetInventory
 * @route POST /api/resetInventory
 * @description Resets the inventory database to predefined values.
 * @returns {Object} Confirmation message.
 * @throws {500} Internal server error on failure.
 */
app.post('/api/resetInventory', async (req, res) => {
    const resetInventorySQL = `
        TRUNCATE "Inventory" RESTART IDENTITY CASCADE;

        INSERT INTO "Inventory" ("InventoryId", "Ingredient", "Quantity", "QuantityUnit") VALUES
        (1, 'Chicken', 100, 'orders remaining'),
        (2, 'Orange Mix', 100, 'orders remaining'),
        (3, 'Beef', 100, 'orders remaining'),
        (4, 'Beijing Mix', 100, 'orders remaining'),
        (5, 'Kung Pao Mix', 100, 'orders remaining'),
        (6, 'Shrimp', 100, 'orders remaining'),
        (7, 'Honey Walnut Mix', 100, 'orders remaining'),
        (8, 'Teriyaki Mix', 100, 'orders remaining'),
        (9, 'SweetFire Mix', 100, 'orders remaining'),
        (10, 'Black Pepper Mix', 100, 'orders remaining'),
        (11, 'Broccoli', 100, 'orders remaining'),
        (12, 'Broccoli Beef Sauce', 100, 'orders remaining'),
        (13, 'Sweet and Sour Mix', 100, 'orders remaining'),
        (14, 'White Rice', 100, 'orders remaining'),
        (15, 'Fried Rice Vegetables', 100, 'orders remaining'),
        (16, 'Chow Mein', 100, 'orders remaining'),
        (17, 'Egg Rolls', 100, 'orders remaining'),
        (18, 'Spring Rolls', 100, 'orders remaining'),
        (19, 'Soda', 100, 'orders remaining'),
        (20, 'Cups', 100, 'orders remaining'),
        (21, 'Mexican Coke', 100, 'orders remaining'),
        (22, 'Apple Juice', 100, 'orders remaining'),
        (23, 'Water Bottle', 100, 'orders remaining'),
        (24, 'Bourbon Mix', 100, 'orders remaining'),
        (25, 'Honey Sesame Mix', 100, 'orders remaining'),
        (26, 'Mushroom Mix', 100, 'orders remaining'),
        (27, 'String Bean Mix', 100, 'orders remaining'),
        (28, 'Super Greens', 100, 'orders remaining'),
        (29, 'Cream Cheese Rangoons', 100, 'orders remaining'),
        (30, 'Apple Pie Rolls', 100, 'orders remaining'),
        (31, 'Mushrooms', 100, 'orders remaining');
    `;

    try {
        await pool.query(resetInventorySQL);
        res.status(200).json({ message: 'Inventory has been reset to initial values.' });
    } catch (error) {
        console.error('Error resetting inventory:', error);
        res.status(500).json({ error: 'Failed to reset inventory.' });
    }
});

// Server start
app.listen(port, () => { console.log(`Server started on http://localhost:${port}`); });

module.exports = app;