'use strict';

const path = require('path');
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var data = fs.readFileSync('data.json', 'utf8');
var unicornData = JSON.parse(data);

app.get('/', listAll);
app.put('/updateLocation', updateLocation);

function listAll(request, response) {
  response.render('index', unicornData);
}

function updateLocation(request, response) {
  let id = request.body.id;
  let location = request.body.location;
  
  for (let unicorn of unicornData.unicorns) {
    if (unicorn.id === id) {
      unicorn.location = location;
    }
  }

  fs.writeFileSync('data.json', JSON.stringify(unicornData));
  response.status(200).send("Location Updated.");
}

app.listen(8000, () => { console.log('Server is listening on 8000.'); });
