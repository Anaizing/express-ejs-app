var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');


var app = express();

/* Middleware
var logger = function (req, res, next) {
    console.log('Logging...');
    next();
}

app.use(logger)
*/

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set static path
app.use(express.static(path.join(__dirname, 'public')));

// Global vars
app.use(function (req, res, next) {
    res.locals.errors = null;
    next();
})

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}))

var users = [
  {
    id: 1,
    firstName: "Anai",
    lastName: "Araya",
    email: "anai.yusary@gmail.com"
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Smith",
    email: "abob@gmail.com"
  },
  {
    id: 3,
    firstName: 'Jo',
    lastName: 'Andrews',
    email: 'andrew@gmail.com'
    }
];

app.get('/', function(req, res){
    res.render('index', {
        title: 'Customers',
        users: users
    })
})

app.post('/users/add', function (req, res) {

    req.checkBody('firstName', 'First Name is Required').notEmpty();
    req.checkBody('lastName', 'Last Name is Required').notEmpty();
    req.checkBody('email', 'Email is Required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('index', {
            title: 'Customers',
            users: users,
            errors: errors
    })
        
    } else {
            var newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }

        console.log('SUCCESS');
        
    }
})

app.listen(3000, function () {
    console.log('Server Started on Port 3000...');
    
})