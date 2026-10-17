const mongoose = require("mongoose");
const ToDoModel = require("../models/todoModel");

module.exports.getToDo = async (_req, res) => {
  const todos = await ToDoModel.find().sort({ _id: -1 }).lean();
  return res.status(200).json(todos);
};

module.exports.saveToDo = async (req, res) => {
  const text = typeof req.body?.text === "string" ? req.body.text.trim() : "";

  if (!text) {
    return res.status(400).json({ message: "text is required and cannot be empty" });
  }

  const todo = await ToDoModel.create({ text });
  return res.status(201).json(todo);
};

module.exports.updateToDo = async (req, res) => {
  const { _id } = req.body || {};
  const text = typeof req.body?.text === "string" ? req.body.text.trim() : "";

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(400).json({ message: "A valid _id is required" });
  }

  if (!text) {
    return res.status(400).json({ message: "text is required and cannot be empty" });
  }

  const todo = await ToDoModel.findByIdAndUpdate(
    _id,
    { text },
    { new: true, runValidators: true }
  );

  if (!todo) {
    return res.status(404).json({ message: "To-do item not found" });
  }

  return res.status(200).json(todo);
};

module.exports.deleteToDo = async (req, res) => {
  const { _id } = req.body || {};

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(400).json({ message: "A valid _id is required" });
  }

  const todo = await ToDoModel.findByIdAndDelete(_id);

  if (!todo) {
    return res.status(404).json({ message: "To-do item not found" });
  }

  return res.status(200).json({ message: "Deleted Successfully", _id: todo._id });
};
