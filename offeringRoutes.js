const express = require('express');
const db = require('../models/db');

const router = express.Router();

// Add Offering
router.post('/', (req, res) => {
    const { user_id, amount } = req.body;

    db.query(
        'INSERT INTO offerings (user_id, amount) VALUES (?, ?)',
        [user_id, amount],
        (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Offering recorded successfully" });
        }
    );
});

// Get All Offerings
router.get('/', (req, res) => {
    db.query(
        'SELECT o.id, u.full_name, o.amount, o.offering_date FROM offerings o JOIN users u ON o.user_id = u.id',
        (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json(results);
        }
    );
});

// Get Single Offering by ID
router.get('/:id', (req, res) => {
    db.query(
        'SELECT o.id, u.full_name, o.amount, o.offering_date FROM offerings o JOIN users u ON o.user_id = u.id WHERE o.id = ?',
        [req.params.id],
        (err, results) => {
            if (err || results.length === 0) return res.status(404).json({ error: "Offering not found" });
            res.json(results[0]);
        }
    );
});

// Delete Offering
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM offerings WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Offering deleted successfully" });
    });
});

module.exports = router;
