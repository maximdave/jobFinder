import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'https://group-e-jobfinder-api.herokuapp.com/api/v1';

const initialState = {
  application: null,
  isApplying: false,
  applicationError: null,
  isGettingApplications: false,
  getApplicationErr: null,
  allApplications: null,
};

export const apply = createAsyncThunk(
  'application/apply',
  async ({ data, jobId, token }, { rejectWithValue }) => {
    try {
      const application = await axios({
        method: 'post',
        url: `${baseUrl}/applications/${jobId}`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Done!',
        text: 'Application Sent',
        confirmButtonColor: '#E94368',
      });

      return application;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        confirmButtonColor: '#E94368',
      });
      return rejectWithValue(error);
    }
  }
);

export const getApplicationById = createAsyncThunk(
  'application/getApplication',
  async ({ id, token, type }, { rejectWithValue }) => {
    try {
      let url;
      type === 'job'
        ? (url = `${baseUrl}/applications/${id}`)
        : (url = `${baseUrl}/applications/applicant/${id}`);
      const applications = await axios({
        method: 'get',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return applications.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const applicationSlice = createSlice({
  name: 'application',
  initialState,

  extraReducers: {
    [apply.pending]: (state) => {
      state.isApplying = true;
    },
    [apply.fulfilled]: (state, { payload }) => {
      state.isApplying = false;
      state.application = payload;
      state.applicationError = null;
    },
    [apply.rejected]: (state, { error }) => {
      state.isApplying = false;
      state.applicationError = error;
    },
    [getApplicationById.pending]: (state) => {
      state.isGettingApplications = true;
      state.allApplications = null;
      state.getApplicationErr = null;
    },
    [getApplicationById.fulfilled]: (state, { payload }) => {
      state.isGettingApplications = false;
      state.allApplications = payload;
      state.getApplicationErr = null;
    },
    [getApplicationById.rejected]: (state, { error }) => {
      state.isGettingApplications = false;
      state.getApplicationErr = error;
    },
  },
});

export const selectApplication = (state) => state.application.application;
export const selectIsApplying = (state) => state.application.isApplying;
export const selectApplicationErr = (state) =>
  state.application.applicationError;

export const selectAllApplications = (state) =>
  state.application.allApplications;
export const selectIsGettingAllApplications = (state) =>
  state.application.isGettingApplications;
export const selectAllApplicationsErr = (state) =>
  state.application.getApplicationErr;

export default applicationSlice.reducer;
