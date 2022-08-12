import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'episodes',
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  reducers: {
    fetchEpisodes: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchEpisodesResolve: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }),
    fetchEpisodesReject: (state, action) => ({
      ...state,
      isLoading: false,
      data: [],
      error: action.payload,
    }),
  },
});

export const { fetchEpisodes, fetchEpisodesResolve, fetchEpisodesReject } =
  slice.actions;
export const selectEpisodesLoading = (state) => state.episodes.isLoading;
export const selectEpisodesData = (state) => state.episodes.data;

export const getEpisodesAsync = (data) => async (dispatch) => {
  dispatch(fetchEpisodes());
  dispatch(fetchEpisodesResolve(data));
};

export default slice.reducer;
