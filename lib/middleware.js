var middleware = {

  configs: function(req, res, next) {
    require('./config_utils')
    .get().then(function(config) {
      res.locals = config;
      next();
    })
    .catch(function(err) {
      res.render('error', { err: err });
    });
  },

  icons: function(req, res, next) {
    var locals = res.locals;

    switch (_.basename(req.path)) {
      case 'dashboard':
        locals.ICON  = 'fa-dashboard';
        locals.TITLE = 'Dashboard';
        break;
      case 'section':
        locals.ICON = 'fa-plus';
        locals.TITLE = 'Create A Section'
        break;
      case 'page':
        locals.ICON  = 'fa-pencil';
        locals.TITLE = 'Create A Page';
        break;
      case 'edit':
        locals.ICON  = 'fa-wrench';
        locals.TITLE = false;
        break;
      case 'modules':
        locals.ICON  = 'fa-codepen';
        locals.TITLE = 'Modules';
        break;
      case 'order':
        locals.ICON  = 'fa-sitemap';
        locals.TITLE = 'Arange Order';
        break;
      default:
        locals.ICON  = 'fa-exclamation-triangle';
        locals.TITLE = 'Error';
    };

    next();
  },

  err400: function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('error', { err: err.message });
  },

  err500: function(req, res) {
    res.status(500);
    res.render('error', { err: err.message });
  }


};

module.exports = middleware;
