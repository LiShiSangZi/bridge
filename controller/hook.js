/*
The MIT License (MIT)

Copyright (c) 2015 Crow
*/
"use strict";

var express = require('express');
var fs = require('fs');
var stream = require("stream");
var router = express.Router();


router.use("/push", function(req, res, next) {
    console.log(req);

    res.send('abc');
});

module.exports = router;