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

// Get active fundraisers by category ---- search
app.get('/api/fundraiser/category/:categoryId', (req, res) => {
    const query = `
        SELECT f.*, c.NAME 
        FROM fundraiser f
        JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
        WHERE f.ACTIVE = 1 AND f.CATEGORY_ID = ?`;

    db.query(query, [req.params.categoryId], (err, results) => {
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