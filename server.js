const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { chats } = require("./data/data.js");
const connecDB = require('./config/db.js');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');


const app = express();
dotenv.config();
app.use(cors());

// MONGODB CONNECTION INJECT
connecDB();

// TO ACCEPT THE JSON DATA
app.use(express.json());

//  HOME END POINT
app.get('/', (req, res) => {
    res.send("API is Running Successfully");
});

//  GET CHATS DATA
// app.get('/api/chat', (req, res) => {
//     res.send(chats);
// });

// GET SINGLE CHAT DATA USING PARAMS
app.get('/api/chat/:id', (req, res) => {
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
});

// USER ROUTER
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

// ERROR HANDLERS
app.use(notFound);
app.use(errorHandler);



// USING THE DOTENV FOR IMPORT THE PORT 
const PORT = process.env.PORT || 5000

// SERVER LISTEN IN APP
app.listen(PORT, () => {
    console.log(`SERVER STARTED WITH ${PORT}`.yellow.bold);
});