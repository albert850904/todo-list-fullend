const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // [true, 'must provide name'] 可以傳,message
    trim: true,
    maxlength: [20, "name cannot be more than 20 characters."],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
