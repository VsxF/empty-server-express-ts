import express = require('express');
import bodyParser = require('body-parser');

const port: number = 8080;
const app: express.Application = express();




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use( function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.send(200);
    }
    else {
        //move on
        next();
    }
})

require('./api-routes')(app);

app.use(function(req, res) {
    res.type("text/plain");
    res.status(404);
    res.send('404 - Not Found');
});

app.use(((err, req, res, next) => {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.send('500 - Server Error');
}) as express.ErrorRequestHandler);


app.listen(port, function() {
    console.log("Server runing in port " + port);
});