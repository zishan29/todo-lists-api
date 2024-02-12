const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Task = require('../models/task');

exports.addTask = [
  body('name').custom(async (comment) => {
    if (!comment) {
      throw new Error('Please provide task name');
    }
  }),
  body('description').custom(async (comment) => {
    if (!comment) {
      throw new Error('Please provide task description');
    }
  }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = {};
      errors.array().forEach((error) => {
        const { path, msg } = error;
        if (!errorMessages[path]) {
          errorMessages[path] = [];
        }
        errorMessages[path].push(msg);
      });

      res.status(400).json({ errors: errorMessages });
    } else {
      const newTask = new Task({
        name: req.body.name,
        description: req.body.description,
      });
      try {
        await newTask.save();
        res.status(200).json('Task added successfully');
      } catch (err) {
        res.status(400).json({ err });
      }
    }
  }),
];

exports.updateTask = asyncHandler(async (req, res, next) => {
  try {
    const newTask = new Task({
      status: req.body.status,
      _id: req.body.id,
    });
    const updatedTask = await Task.findByIdAndUpdate(req.body.id, newTask, {
      new: true,
    });
    res.status(200).json({ message: 'Task updated successfully', updatedTask });
  } catch (err) {
    res.status(400).json({ err });
  }
});

exports.deleteTask = asyncHandler(async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.body.id);
    res.status(200).json({ message: 'Task deleted successfully', deletedTask });
  } catch (err) {
    res.status(400).json({ err });
  }
});

exports.getAllTasks = asyncHandler(async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(400).json({ err });
  }
});
