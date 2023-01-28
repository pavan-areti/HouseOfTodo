// express router for todo
const router = require("express").Router();
const Todo = require("../models/TodoModel");

// get all todos
router.post("/getTodos", async (req: any, res: any) => {
  try {
    const todos = await Todo.find();
    res.status(200).send({
      success: true,
      message: "Todos fetched successfully",
      data: todos,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});
// add todo
router.post("/add-todo", async (req: any, res: any) => {
  try {
    const newTodo = new Todo(req.body);
    const saveTodo = await newTodo.save();
    res.send({
      success: true,
      message: "Todo added successfully",
      data: saveTodo,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

// update todo
router.post("/edit-todo", async (req: any, res: any) => {
  try {
    await Todo.findByIdAndUpdate(req.body.id, req.body);
    res.status(200).send({
      success: true,
      message: "Todo updated successfully",
      data: req.body,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

// delete todo
router.post("/delete-todo", async (req: any, res: any) => {
  try {
    await Todo.findByIdAndDelete(req.body.id);
    res.status(200).send({
      success: true,
      message: "Todo deleted successfully",
      data: req.body,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
