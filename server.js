require('dotenv').config({path:'./.env'});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoute = require('./routes/auth.route');

const app = express();
const config = require('./config');
const PORT = config.PORT || 5000;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(config.DB_URI, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});

app.use('/auth', authRoute);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongo DB is CONNECTED')
    console.log(config.DB_URI)
});

app.listen(PORT, () => {
    console.log('Server is listining on port:' + PORT);
    console.log(PORT)
})