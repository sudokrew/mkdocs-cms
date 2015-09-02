var router = require('express').Router();
var file   = require(cwd+env.FILE_UTILS);
var config = require(cwd+env.CONFIG_UTILS);

router.use(require(cwd+env.MIDDLEWARE).configs);
router.use(require(cwd+env.MIDDLEWARE).icons);

router.route('/')
 .get(function(req, res) {
    res.redirect('/dashboard');
  });


router.route('/dashboard')
  .get(function(req, res) {
    res.render('index');
  })
  .post(function(req, res) {
    var configs       = _.onlyConfig(res.locals);
    configs.site_name = req.body.siteName;

    config.set(configs)
    .then(function() {
      res.redirect('/dashboard');
    })
    .catch(function(err) {
      res.render('error', { err: err });
    });
  });


router.route('/version')
  .post(function(req, res) {
    var configs = _.onlyConfig(res.locals);
    configs.extra.version = req.body.version;

    config.set(configs)
    .then(function() {
      res.redirect('/dashboard');
    })
    .catch(function(err) {
      res.render('error', { err: err });
    });
  });


router.route('/static-site')
  .get(function(req, res) {
    file.build(env.MKDOCS_BUILD)
    .then(file.zip)
    .then(function(buffer) {
      res.writeHead(200, { 'Content-Type': 'application/zip' });
      res.end(buffer);
    })
    .catch(function(err) {
      res.render('error', { err: err });
    });
  });


router.route('/page')
  .get(function(req, res) {
    res.render('page');
  })
  .post(function(req, res) {
    req.body.all = res.locals;

    file.validate(req.body)
    .then(file.write)
    .then(config.newPage)
    .then(config.set)
    .then(function() {
      res.redirect('/edit/'+ _.snakeify(req.body.name));
    })
    .catch(function(err) {
      res.render('error', { err: err })
    });
  });


router.route('/edit/:page')
  .get(function(req, res) {
    var page = {
      url: req.params.page,
      all: res.locals.pages
    };

    file.find(page)
    .then(file.read)
    .then(function(html) {
      res.render('edit', { html: html, page: page.url });
    })
    .catch(function(err) {
      res.render('error', { err: err, TITLE: 'Error', ICON: 'fa-exclamation-triangle' });
    });
  })
  .post(function(req, res) {
    var page = {
      url: req.params.page,
      all: res.locals.pages,
      html: req.body[req.params.page]
    };

    file.find(page)
    .then(file.write)
    .then(function() {
      res.redirect('/');
    })
    .catch(function(err) {
      res.render('error', { err: err })
    });
  });


router.route('/delete/:page')
  .post(function(req, res) {
    var page = {
      url: req.params.page,
      all: res.locals
    };

    file.find(page)
    .then(file.rm)
    .then(config.deletePage)
    .then(config.set)
    .then(function(response) {
      res.redirect('/dashboard');
    })
    .catch(function(err) {
      res.render('error', { err: err });
    });
  });


router.route('/order')
  .get(function(req, res) {
    res.render('order');
  })
  .post(function(req, res) {
    var configs   = _.onlyConfig(res.locals);
    configs.pages = req.body.pages;

    config.set(configs)
    .then(function() {
      res.send('Arrangement Saved!');
    })
    .catch(function(err) {
      res.render('error', { err: err });
    });
  });


module.exports = router;
