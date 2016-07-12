var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

bookRouter = require('./routes/bookRoutes')();

app.use('/api/books', bookRouter);

app.get('/', function(req, res) {
    res.send('Welcome to my API');
});

app.listen(port, function() {
    console.log('Gulp is running on port ' + port);
});
