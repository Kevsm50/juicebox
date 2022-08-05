const PORT = 3000;
const express = require('express');
const morgan = require('morgan');
const apiRouter = require('./api');
const { client } = require('./db');
const server = express();
require('dotenv').config();


client.connect();
server.use(express.urlencoded({extended: false}));
server.use(express.json());
server.use(morgan('dev'));
server.use('/api', apiRouter);

server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
});

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});
