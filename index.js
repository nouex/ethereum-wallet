import 'react-native-gesture-handler';
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Navigator from './screens';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Navigator);
