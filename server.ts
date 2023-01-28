import express from 'express';
const app: express.Application = express();
require('dotenv').config();
require('./config/dbConfig');
// const todoroute = require("./routes/todoroutes");
const port:(String|Number) = process.env.PORT || 5000;   
app.use(express.json());



 
app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});