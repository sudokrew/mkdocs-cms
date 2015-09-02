var handlebars = require('express-hbs');
var express    = require('express');
var app        = express();

require('dotenv').load();
require(process.env.HELPERS);


/**
 * View Engine
 */
app.engine('hbs', handlebars.express4({
  defaultLayout: __dirname + env.TEMPLATES +'/layout/default.hbs',
  partialsDir: __dirname + env.TEMPLATES +'/partials',
  layoutDir: __dirname + env.TEMPLATES +'/layout',
  extname: '.hbs'
}));


// Configure views path
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + env.TEMPLATES);
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
app.use('/', require(env.API));
app.use('*', require(cwd+env.MIDDLEWARE).err400);
app.use(require(cwd+env.MIDDLEWARE).err500);


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
