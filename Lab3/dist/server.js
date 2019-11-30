"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//imports
var express = require("express");
var metrics_1 = require("./metrics");
var body_parser_1 = __importDefault(require("body-parser"));
//init ExpressJS
var app = express();
var port = process.env.PORT || '1337';
var dbMet = new metrics_1.MetricsHandler('./db/metrics');
//init   bodyparser
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded());
//set the display module
app.set('views', __dirname + "/../views");
app.set('view engine', 'ejs');
//root to public dir
//app.use(express.static('/../public'))
app.use('/static', express.static(__dirname + '/../public'));
//display//
app.get('/hello/:name', function (req, res) { return res.render('hello.ejs', { name: req.params.name }); });
app.get('/', function (req, res) {
    res.render('home.ejs');
});
app.get('/find/', function (req, res) {
    res.render('find.ejs');
});
app.post('/metrics/:id', function (req, res) {
    dbMet.save(req.params.id, req.body, function (err) {
        if (err)
            throw err;
        res.status(200).send('Post OK');
        res.end();
    });
});
app.get('/metric/:id', function (req, res) {
    //define a route 
    dbMet.getOne(req.params.id, function (err, result) {
        if (err)
            throw err;
        res.json(result);
        //to give the response
        res.end();
    });
});
app.get('/metrics/', function (req, res) {
    //define a route 
    dbMet.getAll(function (err, result) {
        if (err)
            throw err;
        res.json(result);
        //to give the response
        res.end();
    });
});
app.get('/metrics.json', function (req, res) {
    dbMet.getAll(function (err, result) {
        if (err) {
            throw err;
        }
        res.json(result);
        //to give the response
        res.end();
    });
});
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("server is listening on port " + port);
});
