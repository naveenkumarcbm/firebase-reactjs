var express = require('express');
const router = express.Router();
const auth = require('../auth');
const { getAllItem, addItem, updateItem, deleteItem } = require('../../api/todos/index');

router.get('/all', auth, getAllItem);
router.post('/add', auth, addItem);
router.put('/:id', auth, updateItem);
router.delete('/:id', auth, deleteItem);

module.exports = router;
