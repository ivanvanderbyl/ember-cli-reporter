/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-reporter',

  included: function(app) {
    this._super.included.apply(this, arguments);

    app.import(app.bowerDirectory + '/bugsnag/src/bugsnag.js');
    app.import('vendor/shims/bugsnag.js');
  }
};
