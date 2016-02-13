import Bugsnag from 'bugsnag';
import Ember from 'ember';
import config from '../config/environment';

// This code intentionally runs at module scope so that we can
// catch and report errors that occur early in Ember's boot process.

let enabled = !!config.reporter;

function notify(error) {
  Bugsnag.notifyException(error);
}

if (enabled) {
  // TODO(mmun): For simplicity of this spike we are assuming the reporter is always bugsnag.
  let bugsnagConfig = config.reporter.config;

  // Initialize Bugsnag configuration
  if (bugsnagConfig) {
    Object.keys(bugsnagConfig).forEach(function(key) {
      Bugsnag[key] = bugsnagConfig[key];
    });
  } else {
    console.warn(`[ember-cli-reporter] Missing 'bugsnag.reporter' key is config/environment.js`);
  }

  // Register global handlers
  if (Ember.onerror) {
    console.warn(`[ember-cli-reporter] Another library has already defined an error handler for 'Ember.onerror'`);
  }

  Ember.onerror = (error) => {
    notify(error);
  };

  // TODO(mmun): Bugsnag registers itself onto window.onerror. It does a
  // good job supporting older browsers so we just let it do its thing.
  // In the future we could take the best ideas from each reporter
  // and combine them here.

  // if (window.onerror) {
  //   console.warn(`[ember-cli-reporter] Another library has already defined an error handler for 'window.onerror'`);
  // }

  // window.onerror = (message, fileName, lineNumber, columnNumber, error) => {
  //   notify(error || { message, fileName, lineNumber, columnNumber });
  // };
}

export default {
  name: 'ember-cli-airbrake',

  initialize(app) {
    if (enabled) {
      let router = app.lookup('router:main');

      router.on('didTransition', () => {
        // See https://bugsnag.com/docs/notifiers/js#rate-limiting.
        Bugsnag.refresh();
      });
    }
  }
};
