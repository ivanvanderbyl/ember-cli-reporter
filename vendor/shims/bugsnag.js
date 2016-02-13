(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['Bugsnag'] };
  }

  define('bugsnag', [], vendorModule);
})();
