import { configureStore } from '@reduxjs/toolkit';
import episodesReducer from './episodes';

export default configureStore({
  reducer: {
    episodes: episodesReducer,
  },
});
