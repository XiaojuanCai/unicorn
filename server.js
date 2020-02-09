'use strict';

const path = require('path');
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

app.set('views', path.join(__dirname, 'views'));

console.log(__dirname);
app.set('view engine', 'ejs');



app.get('/', listAll);

function listAll(request, response){
  var data=fs.readFileSync('data.json', 'utf8');
  var unicorns=JSON.parse(data);
  const unicorndata = {'unicorns': unicorns};
  // console.log(unicorns);

  response.render('index', unicorndata);
}

app.listen(8000, ()=>{console.log('Server is listening on 8000.');});
