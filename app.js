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
app.use("/:area", express.static(__dirname + '/public'));
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
  }

  var data = {
    "logged_in": logged_in,
    "email": email,
    "id" :id

  }

app.get('/logout', function(req, res){
  req.session.user=null;
  res.redirect('/')
})
  res.render('index', data);
});
//sign up page
app.get("/signup", function(req, res){
  res.render('signup.html')
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
  db.many("SELECT * FROM lists WHERE users_id IN (SELECT id FROM users WHERE id =$1)", [req.params.id])
    .catch(function(error){
    res.send("there was an error " + error);
  })
  .then(function(data){
   //what to do if you are getting no data in it? if(message:no data returned from the query)
      json_data_users = data;
      res.render('yourlists.html',{
        data: json_data_users
      }).error(function(data){
        alert('no data yet!')
      })
    })


});

app.get("/yourlists/:id/:listname", function(req, res){
  id = req.params.id
  listname = req.params.listname
  db.many("SELECT * FROM lists WHERE list_name ='"+listname+ "' AND users_id IN (SELECT id FROM users WHERE id =$1)", [req.params.id]).then(function(data){
      json_data_list = data;
      res.render('singlelist.html',{
        data: json_data_list
      })

  }
)});

app.get("/:area/:name", function(req, res){
  area = req.params.area
  name = req.params.name
  client.get("https://api.foursquare.com/v2/venues/explore?client_id=ZNEGNE4KLQ5OW03GEGIIDCS0XCZFCQE01S04NJVAN5R5LPCY&client_secret=CYYND5AXCAJ1SMQDNPZBHODBX1OEX3SQY4RBLPQKDAPXHQGT&near="+area+",NY &sortByDistance=1&radius=500&query="+name+"&v=20161124&m=foursquare", function (data, response) {
    restaurant_name = data.response.groups[0].items[0].venue.name;
    address = data.response.groups[0].items[0].venue.location.formattedAddress[0] + data.response.groups[0].items[0].venue.location.formattedAddress[1] + data.response.groups[0].items[0].venue.location.formattedAddress[2];
    res.render('single_restaurant.html',{
    area: area,
    restaurant_name: restaurant_name,
    address : address
})

})
})
app.post('/confirmation',function(req, res){
  data = req.body
  id = req.session.user.id
  db.none('INSERT INTO lists (list_name, location, restaurant_name, address, comments, users_id) VALUES ($1,$2,$3,$4,$5, $6)',
    [data.list_name, data.location, data.restaurant_name, data.address, data.comments, id])

  res.render('confirmation.html')
});
