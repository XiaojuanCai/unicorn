'use strict';

require('dotenv').config();
const PORT = process.env.PORT;

const path = require('path');
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let unicornData = {};
fs.readFile('data.json', 'utf8', (err, data) => {
  unicornData = JSON.parse(data);
});

app.get('/', listAll);
app.put('/location', updateLocation);

function listAll(request, response) {
  response.render('index', unicornData);
}

function updateLocation(request, response) {
  let id = request.body.id;
  let location = request.body.location;
  let unicorns = unicornData.unicorns;

  let indexOfUpdated = unicorns.findIndex(unicorn => unicorn.id === id);
  unicorns[indexOfUpdated].location = location;

  fs.writeFile('data.json', JSON.stringify(unicornData)+'\n', (err) => {
    if (err) throw err;
    response.status(200).json(unicorns[indexOfUpdated]);
  });
}

app.listen(PORT, () => { console.log(`Server is listening on ${PORT}.`); });
