import React from 'react';
import { View, BackHandler } from 'react-native';
import { VideoUriSource, FormFactor } from '@youi/react-native-youi';
import { connect, DispatchProp } from 'react-redux';
import { withNavigationFocus, NavigationEventSubscription, NavigationFocusInjectedProps } from 'react-navigation';

import { withOrientation } from './../components';
import { Asset } from './../adapters/asset';
import { AurynAppState } from './../reducers/index';
import { RotationMode, OrientationLock } from './../components/withOrientation';
import { VideoPlayer, VideoContextProvider, VideoContext } from './../components/videoPlayer';
import { VideoContextType } from '../components/videoPlayer/context';
import AdManager from './../components/adManager';
import { AdContextProvider } from './../components/adManager/context';
import { AurynHelper } from '../aurynHelper';

interface VideoProps extends NavigationFocusInjectedProps, OrientationLock, DispatchProp {
  asset: Asset;
  fetched: boolean;
  videoId: string;
  videoSource: VideoUriSource;
  isLive: boolean;
}

class VideoScreenComponent extends React.Component<VideoProps> {
  declare context: VideoContextType;

  static contextType = VideoContext;

  private focusListener!: NavigationEventSubscription;

  private blurListener!: NavigationEventSubscription;

  private videoContext = React.createRef<VideoContextProvider>();

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      BackHandler.addEventListener('hardwareBackPress', this.navigateBack);
    });

    this.blurListener = this.props.navigation.addListener('didBlur', () => {
      BackHandler.removeEventListener('hardwareBackPress', this.navigateBack);
    });

    this.videoContext.current?.setVideoSource(this.props.videoSource);

    this.videoContext.current?.setIsLive(this.props.isLive);
  }

  componentWillUnmount() {
    this.focusListener.remove();
    this.blurListener.remove();

    BackHandler.removeEventListener('hardwareBackPress', this.navigateBack);
  }

  componentDidUpdate(prevProps: VideoProps) {
    // eslint-disable-line max-statements
    if (this.props.videoId !== prevProps.videoId) {
      this.videoContext.current?.setVideoSource(this.props.videoSource);
    }
    if (!prevProps.fetched && this.props.fetched) this.videoContext.current?.setVideoSource(this.props.videoSource);
  }

  shouldComponentUpdate(nextProps: VideoProps) {
    if (nextProps.videoId !== this.props.videoId) {
      return true;
    }

    if (nextProps.fetched !== this.props.fetched) {
      return true;
    }

    return false;
  }

  navigateBack = () => {
    if (this.videoContext.current?.state.miniGuideOpen) return true;

    if (AurynHelper.isRoku) this.props.navigation.navigate({ routeName: 'PDP' });
    else this.props.navigation.goBack(null);

    if (FormFactor.isHandset) this.props.setRotationMode(RotationMode.Portrait);

    return true;
  };

  render() {
    const { fetched, asset, isFocused, isLive } = this.props;

    if (!fetched && !isLive) return <View />;

    return (
      <View style={styles.container}>
        <VideoContextProvider ref={this.videoContext}>
          <AdContextProvider>
            <AdManager pauseAdCompositionName={'Example-PlayerPauseAd_Ad-VAWAA-EndSqueeze'}>
              <VideoPlayer
                asset={asset}
                isFocused={isFocused}
                related={asset.similar}
                enablePauseScreen={true}
                onBackButton={this.navigateBack}
              />
            </AdManager>
          </AdContextProvider>
        </VideoContextProvider>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
};

const mapStateToProps = (store: AurynAppState, ownProps: VideoProps) => {
  const asset: Asset = ownProps.navigation.getParam('asset');
  return {
    videoSource: asset?.live?.streams?.[0] ?? (store.youtubeReducer.videoSource || { uri: '', type: '' }),
    videoId: store.youtubeReducer.videoId || '',
    asset: store.tmdbReducer.details.data || {},
    fetched: store.youtubeReducer.fetched || false,
    isLive: Boolean(asset?.live),
  };
};

const mapDispatchToProps = {};

const withNavigationAndRedux = withNavigationFocus(
  connect(mapStateToProps, mapDispatchToProps)(VideoScreenComponent as any),
);
export const VideoScreen = withOrientation(withNavigationAndRedux, RotationMode.Landscape);
