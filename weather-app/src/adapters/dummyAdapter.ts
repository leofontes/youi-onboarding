import { Asset, AssetType } from './asset';

const fromApi = (fillSimilar = true): Asset => ({
  images: {
    Poster: 'https://via.placeholder.com/200x300',
    Backdrop: 'https://via.placeholder.com/1068x600',
  },
  thumbs: {
    Poster: 'https://via.placeholder.com/400x600',
    Backdrop: 'https://via.placeholder.com/534x300',
  },
  title: 'You.i TV',
  details:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  extra: 'Director: Alan Smithee | Starring: John Doe, Jane Doe',
  similar: fillSimilar ? Array(5).fill(fromApi(false)) : [],
  key: 'keystring',
  id: 1234567,
  youtubeId: 'nO_DIwuGBnA',
  type: AssetType.TV,
  genres: [28, 12],
});

export { fromApi };
