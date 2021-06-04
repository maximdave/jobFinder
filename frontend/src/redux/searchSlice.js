import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchJobs = createAsyncThunk(
  'search/searchJobs',
  async (data, { rejectWithValue }) => {
    try {
      const results = await axios({
        method: 'get',
        url: `https://group-e-jobfinder-api.herokuapp.com/api/v1/jobs?title=${data}`,
      });
      return results.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  isSearching: false,
  searchResults: null,
  error: null,
};

export const searchSlice = createSlice({
  name: 'search',

  initialState,

  extraReducers: {
    [searchJobs.pending]: (state, action) => {
      state.isSearching = true;
      state.searchResults = null;
    },
    [searchJobs.fulfilled]: (state, { payload }) => {
      state.isSearching = false;
      state.searchResults = payload;
      state.error = null;
    },
    [searchJobs.rejected]: (state, { error }) => {
      state.isSearching = false;
      state.searchResults = null;
      state.error = error;
    },
  },
});

export const selectSearchResults = (state) => state.search.searchResults;
export const selectIsSearching = (state) => state.search.isSearching;
export const selectSearchError = (state) => state.search.error;

export default searchSlice.reducer;
