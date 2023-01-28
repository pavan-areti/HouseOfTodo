const mangoose = require('mongoose');
mangoose.connect(process.env.MONGODB_URL)


const db = mangoose.connection;

db.on('connected', () => {
    console.log(`Mongoose connected to ${db.host}:${db.port}`);
})

db.on('error', (error:any) => {
    console.log(`Mongoose connection error: ${error}`);
})