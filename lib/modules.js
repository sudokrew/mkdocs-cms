var partials = {
  get: function() {
    return new Promise(function(resolve, reject) {
      require('fs').readdir(process.env.MODULES_PATH, function(err, files) {
        err? reject(err) : resolve(files);
      });
    });
  },

  jsonify: function(files) {
    return new Promise(function(resolve) {
      var modules = [];

      files.forEach(function(file) {
        modules.push({ template: env.MODULES_DIR + _.removeExt(file) });
      });

      resolve(modules);
    });
  }

};


module.exports = partials;