const express = require('express');
const sequelize = require('sequelize');
const cors = require('cors');
const dotenv = require('dotenv').config();
const cookierParser = require('cookie-parser');

const db = require('./models');
const userRoutes = require('./routes/userRoutes');
const tabRoutes = require('./routes/tabRoutes');


const PORT = process.env.PORT || 8080;

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
};

app.use( cors( corsOptions ) );
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookierParser());

app.use( '/users', userRoutes);
app.use( '/tabs', tabRoutes );


app.listen(PORT, () => console.log(`Backend Server is connected on port ${PORT}. Safe Travels, Happy Querying`));