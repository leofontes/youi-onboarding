import * as Screens from './screens';
import { createStackNavigator, createSwitchNavigator, StackNavigatorConfig } from 'react-navigation';
import { AurynHelper } from './aurynHelper';

const stackOptions: StackNavigatorConfig = {
  headerMode: 'none',
  cardStyle: {
    backgroundColor: 'transparent',
    opacity: 1,
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,
    },
    containerStyle: {
      backgroundColor: 'transparent',
    },
    screenInterpolator: () => {},
  }),
};

const createNavigator = AurynHelper.isRoku ? createSwitchNavigator : createStackNavigator;
const AppStack = createNavigator(
  {
    Lander: { screen: Screens.Lander },
    PDP: { screen: Screens.Pdp },
    Search: { screen: Screens.Search },
    Profile: { screen: Screens.Profile },
    Video: { screen: Screens.Video },
    AdOverlay: { screen: Screens.AdOverlay },
  },
  {
    ...stackOptions,
    initialRouteName: 'Lander',
  },
);

const SplashStack = createStackNavigator(
  { Splash: { screen: Screens.Splash } },
  {
    ...stackOptions,
    initialRouteName: 'Splash',
  },
);

const rootNavigationStack = createSwitchNavigator({
  Splash: SplashStack,
  App: AppStack,
});

export default rootNavigationStack;
