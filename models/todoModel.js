const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "To-do text is required"],
      trim: true,
      maxlength: [500, "To-do text cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.models.ToDo || mongoose.model("ToDo", todoSchema);
