/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-reporter',

  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/bugsnag/src/bugsnag.js');
  }
};
