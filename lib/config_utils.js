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
      var pages  = _.filter(config.pages, function(page) {
        return !_.has(page, obj.section);
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
