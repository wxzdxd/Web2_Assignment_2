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

// server listen
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`localhost:${PORT}`);
});