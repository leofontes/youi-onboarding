import { combineReducers } from 'redux';

import { tmdbReducer } from './tmdbReducer';
import { youtubeReducer } from './youtubeReducer';
import { TmdbReducerState } from './../typings/tmdbReduxTypes';
import { YoutubeReducerState } from './../reducers/youtubeReducer';

export const rootReducer = combineReducers({
  tmdbReducer,
  youtubeReducer,
});

export type StoreState = {
  tmdbReducer: TmdbReducerState;
  youtubeReducer: YoutubeReducerState;
};

export type AurynAppState = ReturnType<typeof rootReducer>;
