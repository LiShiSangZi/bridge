/*
The MIT License (MIT)

Copyright (c) 2015 Crow
*/

"use strict";

var http = require('http');
var express = require('express');
var urllib = require('url');
var path = require('path');
var bodyParser = require('body-parser');

var router = express.Router();

var JIRA = require('jira').JiraApi;

var jira = new JIRA('http', 'jira.ustack.com', 80, 'git.ustack', 'uSt@ck2015', '2');


var app = express();

app.set('port', process.env.PORT || 5000);
app.use(bodyParser());

app.use("/hook", function(req, res) {
    console.log(req.body);
    if (req.body && req.body.ref == 'refs/heads/develop' && req.body.commits && req.body.commits) {
        req.body.commits.forEach(function(commit) {
            var message = '';
            if (commit.message.indexOf(':') >= 0) {
                message = commit.message.replace(/^(.*?)\:(.*?)$/, '$1');
            } else {
                message = commit.message;
            }
            jira.addComment(message, commit.author.name + ' pushed a ommit: [' + commit.id.substring(0, 8) + '|' + commit.url + '] on ' + commit.timestamp, function(error) {

            });
        });
    }
    res.status(200).send(req.body);
});

app.use("/jenkins", function(req, res) {
    if (req.body) {
        console.log(req.body);
    }
    res.status(200).send({});
});

//start the app
http.createServer(app).listen(app.get('port'), function() {
    console.info('Express server listening on port ' + app.get('port'));
});