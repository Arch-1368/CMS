
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306, // Change to 3307 if you updated my.ini
    user: 'root',
    password: 'student',
    database: 'church_management'
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL Database");
    }
});

db.query('SELECT 1', (err, results) => {
  if (err) {
    console.error('Database query failed:', err);
  } else {
    console.log('Database query succeeded:', results);
  }
});

module.exports = db;