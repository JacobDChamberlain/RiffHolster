const express = require('express');
const sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const cookierParser = reqiure('cookie-parser');


const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookierParser());


app.listen(PORT, () => console.log(`Backend Server is connected on port ${PORT}. Safe Travels, Happy Querying`));