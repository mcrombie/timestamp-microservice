// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const http = require('http');
const fs = require('fs');

const getTimestamp = date => ({
    unix: date.getTime(),
    utc: date.toUTCString()
});



// your first API endpoint... 
app.get("/api/timestamp*", function (req, res) {
  const dateString = req.url.split('/api/timestamp/')[1];
  let timestamp = "blank";
  if(dateString === undefined || dateString === ""){
      timestamp = getTimestamp(new Date());
  }
  else{
      const date = !isNaN(dateString) ? new Date(parseInt(dateString)) : new Date(dateString);
      if(!isNaN(date.getTime())){
          timestamp = getTimestamp(date);
      }
      else{ //per user story #5
          timestamp = {
              error: "invalid date" 
          };
      }
  }
  console.log(timestamp);

  // res.writeHead(200, {'Content-Type' : 'application/json'});
  res.send(JSON.stringify(timestamp));
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});