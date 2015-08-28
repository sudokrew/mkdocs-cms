var configs = {

  get: function() {
    return new Promise(function(resolve, reject) {
      var mkdocsYML = YAML.load(env.MKDOCS_CONFIG);

      _.isUndefined(mkdocsYML)?
        reject('.env path undefined for MKDOCS_CONFIG') :
        resolve(mkdocsYML);
    });
  },

  set: function(config) {
    return new Promise(function(resolve, reject) {

      require('fs').writeFile(env.MKDOCS_CONFIG, YAML.stringify(config), function(err) {
        err? reject(err) : resolve(config);
      });
    });
  },

  newSection: function(obj) {
    return new Promise(function(resolve, reject) {
      var config = _.onlyConfig(obj.all);
      var pages;

      if (_.isUndefined(obj.path)) {
        config.pages.push( _.objKey(obj.name, []) );

        resolve(config);
      } else {
        pages = _.forEach(config.pages, function(collection) {
          _.forIn(collection, function(section, name) {
            if ( _.isEqual(_.snakeify(name), obj.path) ) {
              section.push(_.objKey(obj.name, []));
            }
          });
        });

        config.pages = pages;

        resolve(config);
      }

    });
  },

  deletePage: function(obj) {
    return new Promise(function(resolve, reject) {
      var config = _.onlyConfig(obj.content);

      var pages = _.forEach(obj.content.pages, function(section) {
        _.forEach(section, function(_pages) {
          _.forEach(_pages, function(page) {

            if (_.isTertiary(obj.path)) {

              _.forEach(page, function(_page) {
                if (_.isArray(_page)) {

                  _.forEach(_page, function(tertiary) {
                    if (_.has(tertiary, obj.section)) {
                      _.remove(_page, tertiary);
                    }
                  });
                }
              });

            } else {
              if (_.has(page, obj.section)) {
                _.remove(_pages, page);
              }
            }

          });
        });
      });

      config.pages = pages;

      resolve(config);
    }); 
  },

  newPage: function(obj) {
    return new Promise(function(resolve, reject) {
      var tertiary = _.isTertiary(obj.path);
      var keyName  = tertiary? obj.path.split('/') : obj.path;

      var config = _.onlyConfig(obj.all);
      var file   = _.objKey(_.startCase(obj.name), _.formatPath(obj));

      var dir    = tertiary? keyName.shift() : null;
      var subDir = tertiary? keyName.pop() : null;

      var pages = _.forEach(config.pages, function(section) {
        if (tertiary) {
          _.forIn(section, function(val, key) {
            if ( _.isEqual(_.snakeify(key), dir) ) {
              _.forEach(val, function(test) {
                _.forIn(test, function(subSection, name) {
                  if ( _.isEqual(_.snakeify(name), _.snakeify(subDir)) ) {
                    subSection.push(file);
                  }
                });
              });
            }
          });
        } else {
          _.forIn(section, function(collection, name) {
            if ( _.isEqual(keyName, _.snakeify(name)) ) {
              collection.push(file);
            }
          });
        }
      });

      config.pages = pages;

      resolve(config);
    });
  }

};

module.exports = configs;