import * as React from 'react';
import { Composition, ViewRef } from '@youi/react-native-youi';
import { View, StyleSheet } from 'react-native';
import { Timeline, Error } from '../components';
import { NavigationActions, NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { AurynHelper } from '../aurynHelper';
import { AurynAppState } from '../reducers';
import { tmdbApiKey } from '../secrets';
import { getDiscover, getMovies, getTv } from '../actions/tmdbActions';

type SplashDispatchProps = typeof mapDispatchToProps;

interface SplashProps extends NavigationScreenProps, SplashDispatchProps {
  fetched: boolean;
  error: string;
}

class SplashScreen extends React.Component<SplashProps> {
  outTimeline = React.createRef<Timeline>();

  inTimeline = React.createRef<Timeline>();

  async componentDidMount() {
    this.props.getDiscover();
    this.props.getMovies();
    this.props.getTv();
    await this.inTimeline.current?.play();
  }

  async componentDidUpdate() {
    if (this.props.fetched) {
      if (!AurynHelper.isRoku) await this.outTimeline.current?.play();
      const landerNavigationAction = NavigationActions.navigate({
        routeName: 'Lander',
      });
      this.props.navigation.dispatch(landerNavigationAction);
    }
  }

  render() {
    if (!tmdbApiKey)
      return <Error message="Missing TMDB API key. Please add a key to secrets.ts. See the README.md." />;

    if (this.props.error) return <Error message={this.props.error} />;

    return (
      <View style={styles.container}>
        <Composition source="Auryn_Splash">
          <Timeline name="SplashIn" ref={this.inTimeline} />
          <Timeline name="SplashOut" ref={this.outTimeline} />
          <ViewRef name="Loader">
            <Timeline name="Loop" autoplay />
          </ViewRef>
        </Composition>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2F',
  },
});

const mapStateToProps = (store: AurynAppState, ownProps: SplashProps) => ({
  fetched:
    (store.tmdbReducer.discover.fetched && store.tmdbReducer.movies.fetched && store.tmdbReducer.tv.fetched) || false,
  error:
    store.tmdbReducer.discover.error ||
    store.tmdbReducer.movies.error ||
    store.tmdbReducer.tv.error ||
    ownProps.error ||
    '',
});

const mapDispatchToProps = {
  getDiscover,
  getMovies,
  getTv,
};

export const Splash = connect(mapStateToProps, mapDispatchToProps)(SplashScreen as any);
