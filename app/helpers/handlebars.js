module.exports = (function () {
    var Handlebars = require('express-hbs');

    var formatUrl = Handlebars.registerHelper('formatUrl', function(name) {
      return _.isUndefined(name)? 'undefined' : _.formatUrl(name);
    });

    var isArray = Handlebars.registerHelper('isArray', function(array, options) {
      return _.isArray(array)? options.fn(this) : options.inverse(this);
    });

    var removeFileExt = Handlebars.registerHelper('removeFileExt', function(name) {
      return _.isUndefined(name)? 'undefined' : _.removeExt(name);
    });

    var startCase = Handlebars.registerHelper('startCase', function(name) {
      return _.isUndefined(name)? 'undefined' : _.startCase(name);
    });


    return {
      removeFileExt: removeFileExt,
      formatUrl: formatUrl,
      startCase: startCase,
      isArray: isArray
    };

})();
