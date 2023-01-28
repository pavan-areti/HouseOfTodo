const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config();
require('./config/dbConfig');

const port:(String|Number) = process.env.PORT || 5000;   
app.use(cors())
app.use(express.json());

const todoroute = require("./routes/ToDoRoutes");
app.use('/api/todo', todoroute);

 
app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});