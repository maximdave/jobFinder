import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'https://group-e-jobfinder-api.herokuapp.com/api/v1';

export const getAllJobs = createAsyncThunk(
  'jobs/getAllJobs',
  async (data, { rejectWithValue }) => {
    try {
      const allJobs = await axios({
        method: 'get',
        url: `${baseUrl}/jobs`,
      });
      return allJobs.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postJob = createAsyncThunk(
  'jobs/postJob',
  async (data, { rejectWithValue }) => {
    try {
      const newJob = await axios({
        method: 'post',
        url: `${baseUrl}/jobs`,
        data: data.data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Done!',
        text: 'Job Added',
        confirmButtonColor: '#E94368',
        // cancelButtonColor: '#11365F',
      });
      return newJob.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getJobByCategory = createAsyncThunk(
  'jobs/category',
  async (data, { rejectWithValue }) => {
    try {
      const jobs = await axios({
        method: 'get',
        url: `${baseUrl}/jobs?category=${data}`,
      });
      return jobs.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getJobsByAuthor = createAsyncThunk(
  'jobs/author',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const authorJobs = await axios({
        method: 'get',
        url: `${baseUrl}/jobs/employers/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return authorJobs.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getJobById = createAsyncThunk(
  'jobs/getById',
  async (id, { rejectWithValue }) => {
    try {
      const job = await axios({
        method: 'get',
        url: `${baseUrl}/jobs/${id}`,
      });

      return job.data.data;
    } catch (error) {

      return rejectWithValue(error);
    }
  }
);

export const updateJob = createAsyncThunk(
  'jobs/update',
  async ({ id, data, token }, { rejectWithValue }) => {
    try {

      const job = await axios({
        method: 'put',
        url: `${baseUrl}/jobs/${id}`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return job.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteJob = createAsyncThunk(
  'jobs/delete',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const deleteJob = await axios({
        method: 'delete',
        url: `${baseUrl}/jobs/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { data: deleteJob.data, id };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  allJobs: null,
  isGettingJobs: false,
  getJobsError: null,
  newJob: null,
  isPostingJob: false,
  postJobErr: null,
  isGettingJobByCategory: false,
  jobCategory: null,
  jobCategoryErr: null,
  isGettingAuthorJobs: false,
  authorJobs: null,
  authorJobsError: null,
  isUpdatingJobs: false,
  updatedJob: null,
  updateJobErr: null,
  isDeletingJobs: false,
  deleteErr: null,
  oneJob: null,
  isGettingOneJob: false,
  getOneJobError: null,
};

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,

  extraReducers: {
    [getAllJobs.pending]: (state, action) => {
      state.isGettingJobs = true;
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.isGettingJobs = false;
      state.allJobs = payload;
    },
    [getAllJobs.rejected]: (state, { error }) => {
      state.isGettingJobs = false;
      state.getJobsError = error;
    },
    [postJob.pending]: (state, action) => {
      state.isPostingJob = true;
    },
    [postJob.fulfilled]: (state, { payload }) => {
      state.isPostingJob = false;
      state.newJob = payload;
      state.postJobErr = null;
    },
    [postJob.rejected]: (state, { error }) => {
      state.isPostingJob = false;
      state.newJob = null;
      state.postJobErr = error;
    },
    [getJobByCategory.pending]: (state, action) => {
      state.isGettingJobByCategory = true;
    },
    [getJobByCategory.fulfilled]: (state, { payload }) => {
      state.isGettingJobByCategory = false;
      state.jobCategory = payload;
      state.jobCategoryErr = null;
    },
    [getJobByCategory.rejected]: (state, { error }) => {
      state.isGettingJobByCategory = false;
      state.jobCategoryErr = error;
      state.jobCategory = null;
    },
    [getJobsByAuthor.pending]: (state, action) => {
      state.isGettingAuthorJobs = true;
    },
    [getJobsByAuthor.fulfilled]: (state, action) => {
      state.isGettingAuthorJobs = false;
      state.authorJobs = action.payload.data;
      state.authorJobsError = null;
    },
    [getJobsByAuthor.rejected]: (state, { error }) => {
      state.isGettingAuthorJobs = false;
      state.authorJob = null;
      state.authorJobsError = error;
    },
    [updateJob.pending]: (state, action) => {
      state.isUpdatingJobs = true;
    },
    [updateJob.fulfilled]: (state, { payload }) => {
      state.isUpdatingJobs = false;
      state.updatedJob = payload;
      state.updateJobErr = null;
      Swal.fire({
        icon: 'success',
        title: 'Done!',
        text: 'Job Updated!',
        confirmButtonColor: '#E94368',
      });
    },
    [updateJob.rejected]: (state, { error }) => {
      state.updateJobErr = error;
      state.updatedJob = null;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        confirmButtonColor: '#E94368',
      });
    },
    [deleteJob.pending]: (state) => {
      state.isDeletingJobs = true;
      state.deleteErr = null;
    },
    [deleteJob.fulfilled]: (state, { payload: { data, id } }) => {
      state.isDeletingJobs = false;
      state.deleteErr = null;
      const jobId = state.authorJobs.findIndex((job) => job._id === id);
      state.authorJobs.splice(jobId, 1);
    },
    [deleteJob.rejected]: (state, { error }) => {
      state.isDeletingJobs = false;
      state.deleteErr = error;
    },
    [getJobById.pending]: (state, action) => {
      state.isGettingOneJob = true;
      state.getOneJobError = null;
    },
    [getJobById.fulfilled]: (state, { payload }) => {
      state.isGettingOneJob = false;
      state.getOneJobError = null;
      state.oneJob = payload;
    },
    [getJobById.rejected]: (state, { error }) => {
      state.isGettingOneJob = false;
      state.getOneJobError = error;
    },
  },
});

export const selectAllJobsSlice = (state) => state.jobs.allJobs;
export const selectIsGettingJobsSlice = (state) => state.jobs.isGettingJobs;
export const selectJobsErrorSlice = (state) => state.jobs.getJobsError;
export const selectNewJob = (state) => state.jobs.newJob;
export const selectIsPostingJob = (state) => state.jobs.isPostingJob;
export const selectNewJobErr = (state) => state.jobs.postJobErr;
export const selectJobsByCategories = (state) => state.jobs.jobCategory;
export const selectIsGettingJobCategories = (state) =>
  state.jobs.isGettingJobByCategory;
export const jobCategoryError = (state) => state.jobs.jobCategoryErr;
export const selectAuthorJobs = (state) => state.jobs.authorJobs;
export const selectIsGettingAuthorJobs = (state) =>
  state.jobs.isGettingAuthorJobs;
export const selectAuthorJobsErr = (state) => state.jobs.authorJobsError;
export const selectIsUpdatingJobs = (state) => state.jobs.isUpdatingJobs;
export const selectUpdatedJob = (state) => state.jobs.updatedJob;
export const selectUpdateJobErr = (state) => state.jobs.updateJobErr;
export const selectOneJob = (state) => state.jobs.oneJob;
export const selectIsGettingOneJob = (state) => state.jobs.isGettingOneJob;
export const selectIsGettingOneError = (state) => state.jobs.getOneJobError;
export const selectIsDeletingJobs = (state) => state.jobs.isDeletingJobs

export default jobsSlice.reducer;
