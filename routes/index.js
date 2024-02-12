const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.get('/tasks', taskController.getAllTasks);

router.post('/add', taskController.addTask);

router.put('/update', taskController.updateTask);

router.delete('/delete', taskController.deleteTask);

module.exports = router;
