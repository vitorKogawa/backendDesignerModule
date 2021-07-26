const express = require("express");
var cors = require('cors');
var path = require('path');
const LogRocket = require("logrocket");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(__dirname + '/assets/img/nodes'));
app.options('*', cors());

LogRocket.init('05adcb/backend-designer-module');

app.get("/", (req, res) => {
    res.send("Hello World!");
})

require('./controllers/gameNodeController')(app);
require('./controllers/labelController')(app);
require('./controllers/gameController')(app);
require('./controllers/nodeConnectionController')(app);

app.listen(process.env.PORT || 8080, function () {
    console.log("Started application on port %d", 8080);
});