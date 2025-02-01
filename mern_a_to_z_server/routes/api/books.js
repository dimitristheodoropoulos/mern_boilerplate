const express = require('express');
const router = express.Router();

// Load Book model
const Book = require('../../models/Book');

// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('Δοκιμή διαδρομής βιβλίου!'));

// @route GET api/books
// @description Get all books or filter by category
// @access Public
router.get('/', (req, res) => {
  const category = req.query.category; // Get category filter from query string
  const query = category ? { category } : {}; // If category filter exists, filter by category

  Book.find(query)
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

// @route POST api/books
// @description Add/save book
// @access Public
router.post('/', (req, res) => {
  const { title, isbn, author, description, published_date, publisher, category } = req.body;

  Book.create({ title, isbn, author, description, published_date, publisher, category })
    .then((book) => res.json({ msg: 'Το βιβλίο προστέθηκε με επιτυχία', book }))
    .catch((err) => res.status(400).json({ error: 'Δεν είναι δυνατή η προσθήκη αυτού του βιβλίου' }));
});

// @route PUT api/books/:id
// @description Update book
// @access Public
router.put('/:id', (req, res) => {
  const { title, isbn, author, description, published_date, publisher, category } = req.body;

  Book.findByIdAndUpdate(req.params.id, { title, isbn, author, description, published_date, publisher, category })
    .then((book) => res.json({ msg: 'Ενημερώθηκε με επιτυχία' }))
    .catch((err) =>
      res.status(400).json({ error: 'Δεν είναι δυνατή η ενημέρωση της Βάσης Δεδομένων' })
    );
});

// @route DELETE api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id)
    .then(() => res.json({ msg: 'Η καταχώρηση βιβλίου διαγράφηκε με επιτυχία' }))
    .catch((err) => res.status(404).json({ error: 'Δεν υπάρχει τέτοιο βιβλίο' }));
});

module.exports = router;
