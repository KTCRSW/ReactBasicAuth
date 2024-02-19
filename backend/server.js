const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const _DB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "react-auth",
});

_DB.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

const PORT = 8081;

app.post('/', (req, res) => {
    res.send("Hello");
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const values = [name, email, password];

    _DB.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Number of records inserted:', result.affectedRows);
        return res.status(200).json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log('Server started on port', PORT);
});
