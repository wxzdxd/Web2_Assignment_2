const express = require('express'); // include express
const mysql = require('mysql2'); // include mysql
const cors = require('cors'); // include cors

const app = express();

// CORS
app.use(cors());

// JSON requests
app.use(express.json());

// MySQL connection 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // MySQL username
    password: 'qwe#@!123',  // MySQL password
    database: 'crowdfunding_db', // database
    port: 3306           // MySQL port
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error( err);
        return;
    }
    console.log('sucess');
});

// Get active fundraisers with categories --- home
app.get('/api/fundraisers', (req, res) => {
    const query = `
        SELECT f.*, c.NAME
        FROM fundraiser f
        JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
        WHERE f.ACTIVE = 1`;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        res.json(results);
    });
});

// Get categories ---search
app.get('/api/categories', (req, res) => {
    const query = 'SELECT * FROM category';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        res.json(results);
    });
});

// Query to select active fundraisers ---- search
app.get('/api/search', (req, res) => {
    // Filtering criteria from query parameters
    const { category, organizer, city } = req.query;

    // Select active fundraisers
    let query = `
        SELECT f.*, c.NAME 
        FROM fundraiser f
        JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
        WHERE f.ACTIVE = 1`;

    // Add conditions to the query based on the provided parameters
    const queryParams = [];
    
    if (category) {
        query += ` AND f.CATEGORY_ID = ?`;
        queryParams.push(category);
    }

    if (organizer) {
        query += ` AND f.ORGANIZER LIKE ?`;
        queryParams.push(`%${organizer}%`);
    }

    if (city) {
        query += ` AND f.CITY LIKE ?`;
        queryParams.push(`%${city}%`);
    }

    // Database query
    db.query(query, queryParams, (err, results) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        res.json(results);
    });
});

// Get detail by ID ---- fundraiser
app.get('/api/fundraiser/:id', (req, res) => {
    const query = `
        SELECT f.*, c.NAME 
        FROM fundraiser f
        JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
        WHERE f.FUNDRAISER_ID = ?`;

    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        if (result.length === 0) {
            return res.status(404).send('Fundraiser not found');
        }
        res.json(result[0]);
    });
});

// server listen
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`localhost:${PORT}`);
});