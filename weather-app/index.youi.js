import { AppRegistry } from 'react-native';
import { FormFactor } from '@youi/react-native-youi';
import YiReactApp from './src/App';

import { withOrientation } from './src/components';
import { RotationMode } from './src/components/withOrientation';

const rotationMode = !FormFactor.isHandset ? RotationMode.Landscape : RotationMode.Portrait;

AppRegistry.registerComponent('YiReactApp', () => withOrientation(YiReactApp, rotationMode));
