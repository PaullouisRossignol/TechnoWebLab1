"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//imports
var express = require("express");
var metrics_1 = require("./metrics");
//init ExpressJS
var app = express();
var port = process.env.PORT || '1337';
//set the display module
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
//root to public dir
app.use(express.static('public'));
//default Page
app.get('/hello/:name', function (req, res) { return res.render('hello.ejs', { name: req.params.name }); });
app.get('/', function (req, res) { return res.render('home.ejs'); });
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("server is listening on port " + port);
});
app.get('/metrics.json', function (req, res) {
    metrics_1.MetricsHandler.get(function (err, result) {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
