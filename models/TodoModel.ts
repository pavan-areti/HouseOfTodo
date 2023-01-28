// creating model for Todo
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Not Done",
    },
  },
  {
    timestamps: true,
  }
);

const Todos = mongoose.model("Todo", TodoSchema);

module.exports = Todos;