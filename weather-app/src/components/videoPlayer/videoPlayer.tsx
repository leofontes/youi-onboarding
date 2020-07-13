import React, { Component } from 'react';
import { Composition, VideoRef, VideoUriSource, MediaState, ViewRef } from '@youi/react-native-youi';
import { View, NativeSyntheticEvent } from 'react-native';

import LowerThirdManager from './lowerThirdManager';
import { AurynHelper } from '../../aurynHelper';
import { Timeline } from '..';
import { VideoControls } from './videoControls';
import { Asset } from '../../adapters/asset';
import { VideoContext, VideoContextType } from './context';
import PauseScreenManager from './pauseScreenManager';

interface Props {
  asset: Asset;
  isFocused: boolean;
  enablePauseScreen: boolean;
  related: Asset[];
  onBackButton: () => void;
}

interface State {
  hasStartedPlaying: boolean;
}

export class VideoPlayer extends Component<Props, State> {
  declare context: VideoContextType;

  static contextType = VideoContext;
  static defaultProps: Pick<Props, 'onBackButton'> = {
    onBackButton: () => {},
  };

  private fallbackVideo: VideoUriSource = {
    uri: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
    type: 'HLS',
  };

  private inTimeline = React.createRef<Timeline>();
  private outTimeline = React.createRef<Timeline>();

  private videoPlayer = React.createRef<VideoRef>();
  private videoViewRef = React.createRef<ViewRef>();

  constructor(props: Props) {
    super(props);

    this.state = {
      hasStartedPlaying: false,
    };
  }

  componentDidUpdate() {
    if (this.videoViewRef.current) {
      AurynHelper.togglePointerEvents(this.videoViewRef.current, false);
    }
  }

  play = () => this.videoPlayer.current?.play();

  onPlayerReady = () => {
    this.play();
    this.inTimeline.current?.play();
  };

  onBackButton = async () => {
    if (this.context.mediaState === 'preparing') return true;

    await this.outTimeline.current?.play();

    this.videoPlayer.current?.stop();

    this.props.onBackButton();
  };

  onPlayerError = () => this.context.setVideoSource(this.fallbackVideo);

  onPaused = () => this.context.setPaused();
  onPlaying = () => this.context.setPlaying();
  onDurationChanged = (value: number) => this.context.setDurationChanged(value);
  onCurrentTimeUpdated = (currentTime: number) => this.context.setCurrentTimeUpdated(currentTime);

  onStateChanged = (playerState: NativeSyntheticEvent<MediaState>) => {
    const { mediaState, playbackState } = playerState.nativeEvent;

    if (!this.state.hasStartedPlaying && mediaState === 'ready' && playbackState === 'playing') {
      this.setState({ hasStartedPlaying: true });
      this.context.setPlayerState(mediaState, playbackState);
    } else if (!this.state.hasStartedPlaying) {
      this.context.setPlayerState(mediaState, 'playing');
    } else {
      this.context.setPlayerState(mediaState, playbackState);
    }
  };

  render() {
    const { asset, isFocused, enablePauseScreen, related, onBackButton } = this.props;

    if (!this.context.videoSource) return <View />;

    return (
      <Composition source="Auryn_VideoContainer">
        <Timeline name="In" ref={this.inTimeline} />
        <Timeline name="Out" ref={this.outTimeline} />

        {enablePauseScreen ? <PauseScreenManager related={related} onClosed={this.play} /> : null}
        <LowerThirdManager />

        <ViewRef name="Video" ref={this.videoViewRef} />
        <VideoControls
          isFocused={isFocused}
          asset={asset}
          videoPlayerRef={this.videoPlayer}
          onBackButton={onBackButton}
        >
          <VideoRef
            name="VideoSurface"
            ref={this.videoPlayer}
            source={this.context.videoSource}
            onPlaybackComplete={onBackButton}
            onReady={this.onPlayerReady}
            onErrorOccurred={this.onPlayerError}
            onPaused={this.onPaused}
            onPlaying={this.onPlaying}
            onDurationChanged={this.onDurationChanged}
            onCurrentTimeUpdated={this.onCurrentTimeUpdated}
            onStateChanged={this.onStateChanged}
            muted
            metadata={{mute: true}}
          />
        </VideoControls>
      </Composition>
    );
  }
}

export default VideoPlayer;
