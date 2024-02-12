const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'InComplete' },
});

module.exports = mongoose.model('Task', TaskSchema);
