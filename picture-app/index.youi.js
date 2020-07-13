/**
 * Basic You.i RN app
 */
import React, { Component } from "react"
import { AppRegistry } from "react-native"
import { createStackNavigator } from 'react-navigation'
import SearchScreen from './components/screens/Search/index.youi'
import ResultsScreen from './components/screens/Results/index.youi'
import PlaybackScreen from './components/screens/Playback/index.youi'

const RootStack = createStackNavigator({
  Search: {
    screen: SearchScreen
  },
  Results: {
    screen: ResultsScreen
  },
  Playback: {
    screen: PlaybackScreen
  }
}, {
  headerMode: 'none',
});

export default class YiReactApp extends Component {
  render() {
    return (
      <RootStack />
    );
  }
}

AppRegistry.registerComponent("YiReactApp", () => YiReactApp);
