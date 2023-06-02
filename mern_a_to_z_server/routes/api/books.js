const express = require('express');
const router = express.Router();

// Load Book model
const Book = require('../../models/Book');

// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('Δοκιμή διαδρομής βιβλίου!'));

// @route GET api/books
// @description Get all books
// @access Public
router.get('/', (req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(404).json({ nobooksfound: 'Δεν βρέθηκαν βιβλία' }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) => res.status(404).json({ nobookfound: 'Δεν βρέθηκαν βιβλία' }));
});

// @route GET api/books
// @description add/save book
// @access Public
router.post('/', (req, res) => {
  Book.create(req.body)
    .then((book) => res.json({ msg: 'Το βιβλίο προστέθηκε με επιτυχία' }))
    .catch((err) => res.status(400).json({ error: 'Δεν είναι δυνατή η προσθήκη αυτού του βιβλίου' }));
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then((book) => res.json({ msg: 'Ενημερώθηκε με επιτυχία' }))
    .catch((err) =>
      res.status(400).json({ error: 'Δεν είναι δυνατή η ενημέρωση της Βάσης Δεδομένων' })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then((book) => res.json({ mgs: 'Η καταχώρηση βιβλίου διαγράφηκε με επιτυχία ' }))
    .catch((err) => res.status(404).json({ error: 'Δεν υπάρχει τέτοιο βιβλίο' }));
});

module.exports = router;
