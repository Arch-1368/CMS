const express = require('express');
const db = require('../models/db');

const router = express.Router();

// Create Event
router.post('/', (req, res) => {
    const { title, description, event_date, event_time, location } = req.body;

    db.query(
        'INSERT INTO events (title, description, event_date, event_time, location) VALUES (?, ?, ?, ?, ?)',
        [title, description, event_date, event_time, location],
        (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Event created successfully" });
        }
    );
});

// Get All Events
router.get('/', (req, res) => {
    db.query('SELECT * FROM events', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Get Single Event by ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM events WHERE id = ?', [req.params.id], (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ error: "Event not found" });
        res.json(results[0]);
    });
});

// Update Event
router.put('/:id', (req, res) => {
    const { title, description, event_date, event_time, location } = req.body;
    const eventId = req.params.id;

    db.query(
        'UPDATE events SET title=?, description=?, event_date=?, event_time=?, location=? WHERE id=?',
        [title, description, event_date, event_time, location, eventId],
        (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Event updated successfully" });
        }
    );
});

// Delete Event
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM events WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Event deleted successfully" });
    });
});

module.exports = router;
