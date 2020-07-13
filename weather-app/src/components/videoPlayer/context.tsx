import React, { PureComponent, ContextType, Context } from 'react';
import { MediaStateOptions, PlaybackStateOptions, VideoUriSource } from '@youi/react-native-youi';
import URLSearchParams from '@ungap/url-search-params';
import { Asset } from '../../adapters/asset';

interface VideoContextState {
  asset?: Asset;
  duration?: number;
  currentTime?: number;
  formattedTime?: string;
  mediaState?: MediaStateOptions;
  playbackState?: PlaybackStateOptions;
  paused: boolean;
  scrubbingEngaged: boolean;
  videoSource?: VideoUriSource;
  error?: boolean;
  metadata?: { BookmarkInterval: number };
  miniGuideOpen: boolean;
  isLive: boolean;
  isEnding: boolean;
  isCompressed: boolean;

  setVideoSource: (videoSource: VideoUriSource) => void;
  setPaused: () => void;
  setPlaying: () => void;
  setDurationChanged: (value: number) => void;
  setCurrentTimeUpdated: (currentTime: number) => void;
  setPlayerState: (mediaState: MediaStateOptions, playbackState: PlaybackStateOptions) => void;
  setScrubbingEngaged: (scrubbingEngaged: boolean) => void;
  setMiniGuideOpen: (miniGuideOpen: boolean) => void;
  setIsLive: (isLive: boolean) => void;
  setIsEnding: (isEnding: boolean) => void;
  setAsset: (asset: Asset) => void;
  setIsCompressed: (isCompressed: boolean) => void;
}

export type VideoContextType = ContextType<Context<VideoContextState>>;

const initialState: VideoContextState = {
  asset: undefined,
  paused: false,
  scrubbingEngaged: false,
  error: false,
  mediaState: 'unloaded',
  metadata: { BookmarkInterval: 1 },
  playbackState: 'paused',
  miniGuideOpen: false,
  isLive: false,
  isEnding: false,
  isCompressed: false,

  setVideoSource: () => {},
  setPaused: () => {},
  setPlaying: () => {},
  setDurationChanged: () => {},
  setCurrentTimeUpdated: () => {},
  setPlayerState: () => {},
  setScrubbingEngaged: () => {},
  setMiniGuideOpen: () => {},
  setIsLive: () => {},
  setIsEnding: () => {},
  setAsset: () => {},
  setIsCompressed: () => {},
};

const VideoContext = React.createContext<VideoContextState>(initialState);

type VideoContextProviderProps = {};

class VideoContextProvider extends PureComponent<VideoContextProviderProps, VideoContextState> {
  private MIN_DURATION = 3000;

  constructor(props: VideoContextProviderProps) {
    super(props);

    this.state = {
      ...initialState,
      setVideoSource: this.setVideoSource,
      setPaused: this.setPaused,
      setPlaying: this.setPlaying,
      setDurationChanged: this.setDurationChanged,
      setCurrentTimeUpdated: this.setCurrentTimeUpdated,
      setPlayerState: this.setPlayerState,
      setScrubbingEngaged: this.setScrubbingEngaged,
      setMiniGuideOpen: this.setMiniGuideOpen,
      setIsLive: this.setIsLive,
      setIsEnding: this.setIsEnding,
      setAsset: this.setAsset,
      setIsCompressed: this.setIsCompressed,
    };
  }

  getDurationFromVideoUri = (): number => {
    const sourceParams = new URLSearchParams(this.state.videoSource?.uri);

    return Math.round(Number(sourceParams.get('dur')) * 1000);
  };

  setVideoSource = (videoSource: VideoUriSource) => this.setState({ videoSource });
  setPaused = () => this.setState({ paused: true });
  setPlaying = () => this.setState({ paused: false });
  setPlayerState = (mediaState: MediaStateOptions, playbackState: PlaybackStateOptions) =>
    this.setState({ mediaState, playbackState });

  setDurationChanged = (value: number) => {
    const duration = value > this.MIN_DURATION ? value : this.getDurationFromVideoUri();
    this.setState({ duration });
  };

  setAsset = (asset: Asset) => {
    this.setState({ asset });
  };

  setCurrentTimeUpdated = (currentTime: number) => {
    // eslint-disable-line max-statements
    if (isNaN(currentTime)) return;

    let sec = Math.floor(currentTime / 1000);
    let min = Math.floor(sec / 60);
    const hour = Math.floor(sec / 3600);
    sec %= 60;
    min %= 60;
    const hourString = hour < 1 ? '' : `${hour}:`;
    const minSting = min < 10 ? `0${min}` : min;
    const secString = sec < 10 ? `0${sec}` : sec;

    this.setState({
      currentTime,
      formattedTime: `${hourString}${minSting}:${secString}`,
    });
  };

  setScrubbingEngaged = (scrubbingEngaged: boolean) => this.setState({ scrubbingEngaged });

  setMiniGuideOpen = (miniGuideOpen: boolean) => this.setState({ miniGuideOpen });

  setIsLive = (isLive: boolean) => this.setState({ isLive });

  setIsEnding = (isEnding: boolean) => this.setState({ isEnding });

  setIsCompressed = (isCompressed: boolean) => this.setState({ isCompressed });

  render() {
    return <VideoContext.Provider value={this.state}>{this.props.children}</VideoContext.Provider>;
  }
}

const VideoContextConsumer = VideoContext.Consumer;

export { VideoContext, VideoContextProvider, VideoContextConsumer };
