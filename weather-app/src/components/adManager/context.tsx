import React, { PureComponent, ContextType, Context } from 'react';

export enum AdState {
  shown = 'shown',
  hidden = 'hidden',
  closed = 'closed',
}

interface AdContextState {
  pauseAdEnabled: boolean;
  pauseAdState: AdState;

  lowerAdEnabled: boolean;
  lowerAdState: AdState;

  getIsAdCaptivated: () => boolean;

  setPauseAdEnabled: (pauseAdEnabled: boolean) => void;
  setPauseAdState: (pauseAdState: AdState) => void;
  takePauseAdState: () => AdState;

  setLowerAdEnabled: (lowerAdEnabled: boolean) => void;
  setLowerAdState: (lowerAdState: AdState) => void;
  takeLowerAdState: () => AdState;
}

export type AdContextType = ContextType<Context<AdContextState>>;

const initialState: AdContextState = {
  pauseAdEnabled: false,
  pauseAdState: AdState.hidden,

  lowerAdEnabled: false,
  lowerAdState: AdState.hidden,

  getIsAdCaptivated: () => false,

  setPauseAdEnabled: () => {},
  setPauseAdState: () => {},
  takePauseAdState: () => AdState.hidden,

  setLowerAdEnabled: () => {},
  setLowerAdState: () => {},
  takeLowerAdState: () => AdState.hidden,
};

const AdContext = React.createContext<AdContextState>(initialState);

type AdContextProviderProps = {};

class AdContextProvider extends PureComponent<AdContextProviderProps, AdContextState> {
  constructor(props: AdContextProviderProps) {
    super(props);

    this.state = {
      ...initialState,
      getIsAdCaptivated: this.getIsAdCaptivated,

      setPauseAdEnabled: this.setPauseAdEnabled,
      setPauseAdState: this.setPauseAdState,
      takePauseAdState: this.takePauseAdState,

      setLowerAdEnabled: this.setLowerAdEnabled,
      setLowerAdState: this.setLowerAdState,
      takeLowerAdState: this.takeLowerAdState,
    };
  }

  getIsAdCaptivated = () => this.takePauseAdState() === AdState.shown || this.takeLowerAdState() === AdState.shown;

  setPauseAdEnabled = (pauseAdEnabled: boolean) => this.setState({ pauseAdEnabled });
  setPauseAdState = (pauseAdState: AdState) => this.setState({ pauseAdState });

  takePauseAdState = () => {
    if (this.state.pauseAdState === AdState.closed) {
      this.setState({ pauseAdState: AdState.hidden });
    }

    return this.state.pauseAdState;
  };

  setLowerAdEnabled = (lowerAdEnabled: boolean) => this.setState({ lowerAdEnabled });
  setLowerAdState = (lowerAdState: AdState) => this.setState({ lowerAdState });

  takeLowerAdState = () => {
    if (this.state.lowerAdState === AdState.closed) {
      this.setState({ lowerAdState: AdState.hidden });
    }

    return this.state.lowerAdState;
  };

  render() {
    return <AdContext.Provider value={this.state}>{this.props.children}</AdContext.Provider>;
  }
}

const AdContextConsumer = AdContext.Consumer;

export { AdContext, AdContextProvider, AdContextConsumer };
