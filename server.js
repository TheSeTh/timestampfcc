var express = require('express');
var app = express();
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var port = process.env.PORT || 8080;

app.set("views", __dirname + '/views');
app.set("view engine", "pug");

app.get('/', function (req, res) {
  res.render("index");
});

app.get('/:data', function(req,res) {
    var query = parseInt(req.params.data,10);
    var d;
    
    if(isNaN(query)) {
        d = new Date(req.params.data);
    }
    else
        d = new Date(Number(req.params.data)*1000);
    
    if(d.toString() != 'Invalid Date') {
        res.end(JSON.stringify({"unix" : d.getTime()/1000, "natural" : monthNames[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear()}));
    }
    else {
        res.end(JSON.stringify({"unix" : null, "natural": null}));
    }
});

app.listen(port);