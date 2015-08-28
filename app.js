var handlebars = require('express-hbs');
var express    = require('express');
var app        = express();

require('dotenv').load();
require('./helpers/init');

/**
 * View Engine
 */
app.engine('hbs', handlebars.express4({
  defaultLayout: __dirname + '/templates/layout/default.hbs',
  partialsDir: __dirname + '/templates/partials',
  layoutDir: __dirname + '/templates/layout',
  extname: '.hbs'
}));


// Configure views path
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'hbs');


/**
 * Middleware
 */
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
app.use(require('morgan')('dev'));


/**
 * Routes
 */
app.use('/', require('./api'));
app.use('*', require('./lib/middleware').err400);
app.use(require('./lib/middleware').err500);


/**
 * MkDocs Process (port: 8000)
 */
require('child_process').exec(env.MKDOCS_SERVE, function(err, out) {
  console.log(err? err : out);
});


/**
 * Runs Node Server
 */
app.listen(Number(env.SERVER_PORT), function() {
  console.log('Listening on port %d', this.address().port);
});
