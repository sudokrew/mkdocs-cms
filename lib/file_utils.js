var utils = {

  find: function(page) {
    return new Promise(function(resolve, reject) {
      var html = _.isUndefined(page.html)? page.all : page.html;

      _.forEach(page.all.pages || page.all, function(_page) {
        _.forIn(_page, function(path, name) {
          if ( _.isEqual(name.toLowerCase(), _.rmSnake(page.url)) ) {
            resolve({ path: path, section: name, content: html });
          }
        });
      });

      reject('Could not associate path');
    });
  },

  rm: function(obj) {
    return new Promise(function(resolve, reject) {
      require('remove')(_.formatPath(obj.section, true), function(err) {
        err? reject(err) : resolve(obj);
      });
    });
  },

  read: function(file) {
    return new Promise(function(resolve, reject) {
      require('read-file')(env.MKDOCS+ file.path, 'utf8', function(err, buffer) {
        err? reject(err) : resolve(buffer);
      });
    });
  },

  write: function(obj) {
    return new Promise(function(resolve, reject) {
      require('fs').writeFile(_.formatPath(obj.name, true), _.hasContent(obj), function(err) {
        err? reject(err) : resolve(obj);
      });
    });
  },

  validate: function(obj) {
    return new Promise(function(resolve, reject) {
      _.forEach(_.onlyConfig(obj.all).pages, function(page) {
        _.forIn(page, function(file, name) {
          if ( _.isEqual(_.startCase(obj.name), _.startCase(name)) ) {
            reject('That page already exists');
          }
        });
      });

      resolve(obj);
    });
  },

  build: function(cmd) {
    return new Promise(function(resolve, reject) {
      require('child_process').exec(cmd, function(err, out, code) {
        resolve(code);
      });
    });
  },

  zip: function() {
    return new Promise(function(resolve, reject) {
      require('zip-dir')(env.MKDOCS_SITE, function(err, buffer) {
        err? reject(err) : resolve(buffer);
      });
    });
  }

};


module.exports = utils;
