_.mixin({

  formatUrl: function(name) {
    return _.snakeCase( name.toLowerCase(name.substr(0, name.lastIndexOf('.')) || name)  );
  },

  removeExt: function(name) {
    return name.replace(/\.[^/.]+$/, "");
  },

  snakeify: function(name) {
    return _.snakeCase(name.toLowerCase());
  },

  objKey: function(key, value) {
    var tmp  = {};
    tmp[key] = value;

    return tmp;
  },

  onlyConfig: function(obj) {
    return _.omit(obj, 'ICON', 'TITLE');
  },

  basename: function(string, startCase) {
    var path = string.split('/')[1];
    return startCase? _.startCase(path) : path.toLowerCase();
  },

  hasContent: function(obj) {
    return _.isUndefined(obj.content)? _.startCase(obj.name) : _.isArray(obj.content)? obj.content.join('\n') : obj.content;
  },

  formatPath: function(obj, isNew) {
    var base = isNew? env.MKDOCS + obj.path : obj.path;
    return _.endsWith(obj.path, '.md')? base : base+'/' + this.snakeify(obj.name) +'.md';
  },

  isTertiary: function(path) {
    path = _.remove(path.split('/'), function(str) {
      return !_.endsWith(str, '.md');
    });
    return path.length > 1;
  }


});
