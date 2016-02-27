'use strict';

// Imports
var React = require('react-native');
var {
  AsyncStorage,
  NetInfo,
} = React;

// Represents the last time the configuration file was downloaded and updated
const LAST_REQUEST_FULFILL_TIME = 'config_last_req';
const TIME_TO_REFRESH_CONFIG = 'config_time_to_refresh';
const LAST_VALID_CONFIGURATION = 'config_last_valid';

// Cached config of the app
var app_config = null;

async function _requestConfig() {
  let lastRequestTime = await AsyncStorage.getItem(LAST_REQUEST_FULFILL_TIME);
  if (lastRequestTime == null) {
    lastRequestTime = 0;
  }

  let timeToRefresh = await AsyncStorage.getItem(TIME_TO_REFRESH_CONFIG);
  if (timeToRefresh == null) {
    timeToRefresh = 0;
  }

  let currentTime = Math.floor(new Date().getTime() / 1000);
  if (parseInt(lastRequestTime) + parseInt(timeToRefresh) > currentTime) {
    // Not enough time has passed to refresh the config, so just load the one in AsyncStorage
    console.log('Retrieving cached config:', lastRequestTime, '+', timeToRefresh, '<=', currentTime);
    app_config = await AsyncStorage.getItem(LAST_VALID_CONFIGURATION);

    if (app_config !== null) {
      return JSON.parse(app_config);
    } else {
      console.log('Cached config was null, retrieving config from web.');
    }
  }

  // Make sure the user is connected to the internet, then download the configuration
  let isConnected = await NetInfo.isConnected.fetch();

  // TODO: download the configuration file
  // For now, return a local file
  let configuration = require('../../assets/web_defaults/json/config.json');

  // Update time that config was refreshed at and when to next refresh it
  lastRequestTime = currentTime;
  AsyncStorage.setItem(LAST_REQUEST_FULFILL_TIME, lastRequestTime.toString());
  AsyncStorage.setItem(TIME_TO_REFRESH_CONFIG, '0');
  // TODO: uncomment below and comment above to disable getting config every time
  // AsyncStorage.setItem(TIME_TO_REFRESH_CONFIG, configuration.Meta.TimeToRefresh.toString());

  // Store the configuration, then return it
  app_config = configuration.Config;
  AsyncStorage.setItem(LAST_VALID_CONFIGURATION, configuration.Config.toString())
  return app_config;
}

module.exports = {

  /*
   * Retrieves the app's configuration data and returns it in a promise
   */
  getConfiguration() {
    return _requestConfig();
  }
};
