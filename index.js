import express from 'express';
var exphbs = require('express-handlebars');
import webpack from 'webpack';


let config = require('config')

// use process.env variables to keep a private variables
require('dotenv').config()

//Express Middleware

const helmet = require('helmet')// Create headers that protects from attacks
const cors = require('cors')// allows or disallows cross communication
const morgan = require('morgan') // log requests
const bodyParser = require('body-parser') // turns response into usable format

// db connection w/ localhost


  var db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user:'postgres',
        password:'password',
        database:'simpleapp'

    }
  });



// db queries
const main = require('./controllers/main')

//App
const app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('client'));

// loc environment webpack settings

const webpackLocConfig = require('./webpack.loc').default
const webpackObj = {
  devMiddleware: require('webpack-dev-middleware'),
  config: webpackLocConfig,
  hotMiddleware: require('webpack-hot-middleware')
};

const compiler = webpack(webpackObj.config)
app.use(webpackObj.devMiddleware(compiler, {
  noInfo: true,
  stats: 'errors-only',
  publicPath: webpackLocConfig.output.publicPath
}));
app.use(webpackObj.hotMiddleware(compiler));





// App middleware
const whitelist = ['http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined'))


// App Routes
app.get('/', function(req, res) {
  res.render('home')
});
app.get('/crud', (req, res) => main.getTableData(req, res, db))
app.post('/crud', (req,res) => main.postTableData(req, res, db))
app.put('/crud', (req, res) => main.updateTableData(req, res, db))
app.delete('/crud', (req,res) => main.deleteTableData(req, res, db))

// App server Connection

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT || 3000}`)
})

