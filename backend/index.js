const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const { readdirSync } = require('fs');

const app = express();

app.use(bodyParser.json());

const options = {
  origin: process.env.FRONTEND_DOMAIN,
  useSuccessStatus: 200,
};

app.use(cors());
// Read all routes dynamically
readdirSync('./routes').map(
  (r) => app.use('/api/v1', require('./routes/' + r))
);

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(() => {
    // Node Server
    const port = process.env.PORT || 8000;
    app.listen(port);
    console.log(`localhost:${port}`);
    // Socket IO Setup
    // const io = require('./services/socket').init(server);
    // io.on('connection', socket => {
    //     console.log('Client connected');
    // });
  })
  .catch((err) => {
    console.log(err);
  });
