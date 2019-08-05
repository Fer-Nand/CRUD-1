const express = require('express');
const path = require('path');
const morgan = require('morgan');
var mongoose = require('mongoose'); 


const { format } = require('timeago.js');


//Initializations
const app = express();
var database = require('./database');  
mongoose.connect(process.env.CUSTOMCONNSTR_MyConnectionString || database.localUrl, {
  useNewUrlParser: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));

mongoose.set('useFindAndModify', false);

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended : false}));

//Global variables
app.use((req, res, next) => {
   app.locals.format = format;
   next();
});

//Routes
app.use(require('./routes/index'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//start server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
