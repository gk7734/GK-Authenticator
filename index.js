/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {App} from './App';
import './shim.js';

AppRegistry.registerComponent(appName, () => App);
