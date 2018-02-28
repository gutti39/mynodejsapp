

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
var db

app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', (process.env.PORT || 5000));

// app.set('view engin', 'ejss')

//app.get('/', (req, res) => {
//	  res.sendFile(__dirname + '/index.html');
//});

//app.post('/quotes', (req, res) => {
//  console.log(req.body)
//})

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', { quotes: result })
  })
})

MongoClient.connect('mongodb://gvn39:gvn39@ds143678.mlab.com:43678/db_gsn', (err, client) => {
  if (err) return console.log(err)
  db = client.db('db_gsn')
  // app.listen(3000, () => {
  //   console.log('listening on 3000')
  // })

  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
})

app.post('/quotes', (req, res) => {
  console.log(JSON.stringify(req.body))
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.get("/search", (req, res) => {
  res.sendFile(__dirname + '/search.html');
});

app.post("/search", function (req, res) {
  console.log(JSON.stringify(req.body))
  db.collection('quotes').find({name: req.body.query}).toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    console.log(JSON.stringify(result))
    res.render('index.ejs', { quotes: result })
  })
});




