const express = require("express");
const cors = require("cors");
const path = require("path");
const redis = require('redis');

const publisher = redis.createClient({
  port: 19196,
  password: "Hjc*H^kDzZuxV6@HiZYY#m6KefVCkz&kb%h5gtpT",
  host: "redis-19196.c273.us-east-1-2.ec2.cloud.redislabs.com",
});
const subscriber = redis.createClient({
  port: 19196,
  password: "Hjc*H^kDzZuxV6@HiZYY#m6KefVCkz&kb%h5gtpT",
  host: "redis-19196.c273.us-east-1-2.ec2.cloud.redislabs.com",
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(`${__dirname}/assets/img`));
app.options('*', cors());

app.post("/message/send", (req, res) => {
  publisher.publish("topic-analytics", JSON.stringify(req.body));
  res.send("Publishing an Event using Redis");
});

subscriber.on("message", (channel, message) => {
  console.log(`Received data :${message}`);
});

subscriber.subscribe("topic-analytics");

require('./controllers/gameNodeController')(app);
require('./controllers/labelController')(app);
require('./controllers/gameController')(app);
require('./controllers/nodeConnectionController')(app);

app.listen(process.env.PORT || 8080, () => {
  console.log("Started application on port %d", 8080);
});
