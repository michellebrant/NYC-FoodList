var port = process.env.PORT || 8080;
const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const session = require('express-session');
var Client = require('node-rest-client').Client;

var client = new Client();
app.listen(port);
console.log('we are live on 8080')
/* BCrypt stuff here */
const bcrypt = require('bcrypt');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/html');
app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'theTruthIsOutThere51',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

var db = pgp('postgres://MichelleBrant@localhost:5432/foodlist_db');
//main login page
app.get("/", function(req, res){
  var logged_in;
  var email;
  var id;

  if(req.session.user){
    logged_in = true;
    email = req.session.user.email;
    id = req.session.user.id;
    console.log(req.session.user)
    console.log(id)
  }

  var data = {
    "logged_in": logged_in,
    "email": email,
    "id" :id

  }

  res.render('index', data);
});
//sign up page
app.get("/signup", function(req, res){
  res.render('signup/index')
});
app.get("/new", function(req, res){
  res.render('new.html')
});
//create new user
app.post('/signup', function(req, res){
  var data = req.body;

  bcrypt.hash(data.password, 10, function(err, hash){
    db.none(
      "INSERT INTO users (email, password_digest) VALUES ($1, $2)",
      [data.email, hash]
    ).then(function(){
      res.send('User created!');
    })
  });
})

//signin
app.post('/login', function(req, res){
  var data = req.body;


  db.one(
    "SELECT * FROM users WHERE email = $1",
    [data.email, data.id]
  ).catch(function(){
    res.send('Email/Password not found.')
  }).then(function(user){
    bcrypt.compare(data.password, user.password_digest, function(err, cmp){
      if(cmp){
        req.session.user = user;
        db.one("SELECT * FROM users WHERE email = $1", [data.email]).then(function(data){
          Data = data;
        res.redirect('/');
  })
      } else {
        res.send('Email/Password not found.')
      }
    });
  });
});


app.get("/yourlists/:id", function(req, res){
  id = req.params.id
  db.many("SELECT * FROM lists WHERE users_id IN (SELECT id FROM users WHERE id =$1)", [req.params.id]).then(function(data){
      json_data_users = data;
      res.render('yourlists.html',{
        data: json_data_users
      })

  }
)});

app.get("/yourlists/:id", function(req, res){
  id = req.params.id
  db.many("SELECT * FROM lists WHERE users_id IN (SELECT id FROM users WHERE id =$1)", [req.params.id]).then(function(data){
      json_data_users = data;
      res.render('yourlists.html',{
        data: json_data_users
      })

  }
)});

client.get("https://api.foursquare.com/v2/venues/explore?client_id=ZNEGNE4KLQ5OW03GEGIIDCS0XCZFCQE01S04NJVAN5R5LPCY&client_secret=CYYND5AXCAJ1SMQDNPZBHODBX1OEX3SQY4RBLPQKDAPXHQGT&near=flushing, NY &sortByDistance=1&radius=500&query=sushi&v=20161124&m=foursquare", function (data, response) {
    // parsed response body as js object
    console.log(data.response.groups[0].items[0].venue.name);
    // raw response
});


