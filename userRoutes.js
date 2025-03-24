const express = require('express');
const db = require('../models/db');

const router = express.Router();

// Get All Users
router.get('/', (req, res) => {
    db.query('SELECT id, full_name, email, role FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Get Single User by ID
router.get('/:id', (req, res) => {
    db.query('SELECT id, full_name, email, role FROM users WHERE id = ?', [req.params.id], (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ error: "User not found" });
        res.json(results[0]);
    });
});

// Delete User
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "User deleted successfully" });
    });
});

module.exports = router;
