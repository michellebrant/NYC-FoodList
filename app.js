var express = require('express');
var app     = express();
var port    = process.env.PORT || 8080;
var bdPars = require('body-parser')
var methodOverride = require('method-override')

console.log('port: ' + port);

var pgp = require("pg-promise")();
var db = pgp("postgres://MichelleBrant@localhost:5432/zoo");
app.listen(port);
app.use(methodOverride('_method'))
app.use(bdPars.urlencoded({extended:false}));
app.use(bdPars.json());
console.log('Hereeeee we go on ' + port);

app.use(express.static(__dirname + '/public'));

//mustache

mustache = require('mustache-express');

//configure.
app.engine('html',mustache());
app.set('view engine','html');
app.set('views',__dirname+'/html');
app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res) {
res.render("index")
})

// app.get('/stuge', function(req, res) {
//   db.many("SELECT * FROM creatures WHERE planet = 'Stuge'").then(function(data){
//     json_data_students = data;
//     res.render('stuge.html',{
//       data: json_data_students
//   })
// })
// })

// app.get('/Plinth', function(req, res) {
//   db.many("SELECT * FROM creatures WHERE planet = 'Plinth'").then(function(data){
//     json_data_students = data;
//     res.render('stuge.html',{
//       data: json_data_students
//   })
// })
// })

// app.get('/create', function(req, res) {
// res.render('form.html')
// })

// app.post('/create', function(req, res){
//   var data = req.body;
//   db.none("INSERT INTO creatures (species, family, habitat, diet, planet) VALUES ($1, $2, $3, $4, $5)",[data.species, data.family, data.habitat, data.diet, data.planet])
// .then(function(){
//   res.send('user created!"')
// })
// console.log(data)
// })




