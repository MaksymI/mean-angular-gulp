var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');

var auth = require('./controllers/auth');
var message = require('./controllers/message');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

function checkAuthenticated(req, res, next) {
    if (!req.header('Authorization')) {
        return res.status(401).send({ message: 'Please make sure your reqest has an Authorization header' });
    }
    var token = req.header('Authorization').split('')[1];

    var payload = jwt.decode(token, 'secret');
}

app.get('/api/message', message.get);

app.post('/api/message', message.post);

app.post('/auth/register', auth.register);

mongoose.connect("mongodb://localhost:27017/test", function (err, db) {
    if (!err) {
        console.log("We are connected to mongo");

    }
});

var server = app.listen(5000, function () {
    console.log('listening on port ', server.address().port);
});