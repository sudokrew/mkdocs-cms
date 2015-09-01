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
      var config = _.onlyConfig(obj.all);
      var file   = _.objKey(_.startCase(obj.name), _.formatPath(obj.name));

      config.pages.push(file);

      resolve(config);
    });
  }

};

module.exports = configs;
