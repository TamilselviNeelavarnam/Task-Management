const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: {
        type: Boolean,
        default: false
    },
    dueDate: Date
});

module.exports = mongoose.model("Task", taskSchema);