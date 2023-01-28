// express router for todo
const router = require("express").Router();
const Todo = require('../models/TodoModel');

// get all todos
router.post('/getTodos', async (req: any, res: any) => {
    try{
        const todos = await Todo.find();
        res.send({
            success: true,
            data: todos
        })
    }
    catch(error:any){
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});
// add todo
router.post('/add-todo', async (req: any, res: any) => {
    try{
        const newTodo = new Todo(req.body);
        const saveTodo = await newTodo.save();
        res.send({
            success: true,
            data: saveTodo
        })
    }
    catch(error:any){
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// update todo
router.post('/edit-todo', async (req: any, res: any) => {
    try{
        await Todo.findByIdAndUpdate(req.body.id, req.body);
        res.send({
            success: true,
            data: req.body
        })
    }
    catch(error:any){
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// delete todo
router.post('/delete-todo', async (req: any, res: any) => {
    try{
       await Todo.findByIdAndDelete(req.body.id);
        res.send({
            success: true,
            data: req.body
        })
    }
    catch(error:any){
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;