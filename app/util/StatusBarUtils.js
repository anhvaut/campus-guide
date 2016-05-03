/**
 *
 * @license
 * Copyright (C) 2016 Joseph Roque
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author Joseph Roque
 * @file StatusBarUtils.js
 * @description Offers utilities for adjusting the status bar.
 * @flow
 *
 */
'use strict';

module.exports = {

  /**
   * Changes the status bar text colors on iOS to be either light or dark.
   * True for light, false for dark.
   *
   * @param {{OS: string}} Platform an instance of the React Native Platform class.
   * @param {ReactClass} StatusBar an instance of the React Native StatusBar class.
   * @param {boolean} light true or false to set the color of the status bar.
   */
  setLightStatusBarIOS(Platform: {OS: string}, StatusBar: ReactClass, light: boolean): void {
    if (Platform.OS === 'ios') {
      if (light) {
        StatusBar.setBarStyle('light-content');
      } else {
        StatusBar.setBarStyle('default');
      }
    }
  },

  /**
   * Returns an additional padding for the status bar on iOS.
   *
   * @param {{OS: string}} Platform an instance of the React Native Platform class.
   * @return {number} the padding to use for the status bar.
   */
  getStatusBarPadding(Platform: {OS: string}): number {
    if (Platform.OS === 'ios') {
      return 20;
    } else {
      return 0;
    }
  }
}
