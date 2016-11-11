process.env.NODE_ENV = 'testing'
var server = require('../../build/dev-server.js')

require('babel-register');
var config = require('../../config');
var seleniumServer = require('selenium-server');
var phantomjs = require('phantomjs-prebuilt');

require('nightwatch-cucumber')({
  nightwatchClientAsParameter: true,
  featureFiles: ['test/e2e/features'],
  //supportFiles:['build/dev-server.js'],
  stepDefinitions: ['test/e2e/features/step_definitions'],
  jsonReport: 'test/e2e/reports/cucumber.json',
  htmlReport: 'test/e2e/reports/cucumber.html',
  openReport: false
});

// http://nightwatchjs.org/guide#settings-file
module.exports = {
  "src_folders": ["test/e2e/specs"],
  "output_folder": "test/e2e/reports",
  "custom_assertions_path": ["test/e2e/custom-assertions"],
  "page_objects_path": "test/e2e/page-objects",
  "selenium": {
    "start_process": true,
    "server_path": seleniumServer.path,
    "host": "127.0.0.1",
    "port": 4444,
    "cli_args": {
      "webdriver.chrome.driver": require('chromedriver').path
    }
  },
  //
  // "test_runner": {
  //   "type":"mocha",
  //   "option":{
  //
  //   }
  // },
  //
  "test_settings": {
    "default": {
      "selenium_port": 4444,
      "selenium_host": "localhost",
      "silent": true,
      "screenshots": {
        enabled: true,
        on_failure: true,
        path: 'test/e2e/screenshots/default'
      },
      "globals": {
        "devServerURL": "http://localhost:" + (process.env.PORT || config.dev.port)
      }
    },

    "phantom": {
      "desiredCapabilities": {
        "browserName": "phantomjs",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "phantomjs.binary.path": phantomjs.path,
        "phantomjs.cli.args": ["--ignore-ssl-errors=true"],
        "phantomjs.page.settings.userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36"
      }
    },

    // "chrome": {
    //   "desiredCapabilities": {
    //     "browserName": "chrome",
    //     "javascriptEnabled": true,
    //     "acceptSslCerts": true
    //   }
    // },
    //
    // "firefox": {
    //   "desiredCapabilities": {
    //     "browserName": "firefox",
    //     "javascriptEnabled": true,
    //     "acceptSslCerts": true
    //   }
    // }
  }
}
