const express = require("express");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

var cors = require('cors');
var path = require('path');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(__dirname + '/assets/img/nodes'));
app.options('*', cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
})

require('./controllers/gameNodeController')(app);
require('./controllers/labelController')(app);
require('./controllers/gameController')(app);
require('./controllers/nodeConnectionController')(app);

Sentry.init({
    dsn: "https://20b2cf9a73d440eea49ec52bda28399f@o925556.ingest.sentry.io/5880064",
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
      ],
    tracesSampleRate: 1.0,
  });

  Sentry.configureScope(scope => {
    scope.setSpan(transaction);
  });  
  

app.listen(process.env.PORT || 8080, function () {
    console.log("Started application on port %d", 8080);
});