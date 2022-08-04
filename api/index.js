const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const caseRoute = require('./routes/case');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connected to mongoDB");
});

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/case', caseRoute);

app.get('/', (req, res) => {
    res.json("Welcome to home page")
})

app.get("/case", (req, res) => {
    res.json("welcome to cases page")
})

app.listen(3004, () => {
    console.log('backend server is running');
})