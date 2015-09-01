_.mixin({

  formatUrl: function(name) {
    return _.snakeCase( name.toLowerCase(name.substr(0, name.lastIndexOf('.')) || name)  );
  },

  rmSnake: function(name) {
    return name.toLowerCase().split('_').join('');
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

  formatPath: function(name, created) {
    return (created? env.MKDOCS : '')+ this.snakeify(name) +'.md';
  }

});
