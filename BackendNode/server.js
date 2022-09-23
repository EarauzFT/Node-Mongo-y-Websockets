const express = require('express');
const app = express();
const server = require('http').Server(app);

const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('./socket')
const db = require('./db');
const router = require('./network/routes')

db('mongodb://localhost:27017/telegrom');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

socket.connect(server);
router(app); // de esta manera le pasamos las rutas

app.use('/app', express.static('public'));

server.listen(3000, function () {
    console.log('App listen in: http://localhost:3000')
});