const {PORT = 3000} = process.env;
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

server.get('/background/:color', (req, res, next) => {
    res.send(`
      <body style="background: ${req.params.color};">
        <h1>Hello World</h1>
      </body>
    `);
});


server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});
