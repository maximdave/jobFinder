import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'https://group-e-jobfinder-api.herokuapp.com/api/v1';

export const signUp = createAsyncThunk(
  'user/signup',
  async ({ data, auth }) => {
    // console.log(data);
    let url;
    auth === 'signup'
      ? (url = `${baseUrl}/auth/signup`)
      : (url = `${baseUrl}/auth/login`);

    let msg;
    auth === 'signup'
      ? (msg = 'Something went wrong!')
      : (msg = 'Invalid email or password');

    try {
      const user = await axios({
        method: 'post',
        url,
        data,
      });

      return user;
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${msg}`,
        confirmButtonColor: '#11365F',
        cancelButtonColor: '#11365F',
      });
    }
  }
);

export const uploadResume = createAsyncThunk(
  'user/resume',
  async ({ token, formData }, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      await axios({
        method: 'post',
        url: `${baseUrl}/users/resume`,
        data: formData,
        config
      })

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `could not upload cv`,
        confirmButtonColor: '#11365F',
        cancelButtonColor: '#11365F',
      });
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async ({ token, data, id }, { rejectWithValue }) => {

    try {
      const newUser = await axios({
        method: 'put',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: `${baseUrl}/users/update/${id}`,
        data,
      });

      Swal.fire({
        icon: 'success',
        title: 'Done!',
        text: 'Profile Updated',
        confirmButtonColor: '#E94368',
      });


      return newUser.data;
    } catch (error) {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `could not update profile`,
        confirmButtonColor: '#11365F',
        cancelButtonColor: '#11365F',
      });
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoggingIn: false,
  user: JSON.parse(localStorage.getItem('user')) || null,
  error: null,
  isUploading: false,
  newUser: null,
  uploadError: null,
  isUpdatingUser: false,
  updateUserError: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = null;
    },
    setNewUser: (state, { payload }) => {
      let formerUser = JSON.parse(localStorage.getItem('user'));
      console.log(formerUser);
      formerUser.user = payload.data;
      state.user = formerUser;
      localStorage.setItem('user', JSON.stringify(formerUser));
    },
  },

  extraReducers: {
    [signUp.pending]: (state, action) => {
      state.isLoggingIn = true;
    },
    [signUp.fulfilled]: (state, { payload }) => {
      state.isLoggingIn = false;
      if (payload) {
        // console.log(payload);
        localStorage.setItem('user', JSON.stringify(payload.data.data));
      }
      state.user = JSON.parse(localStorage.getItem('user'));
      state.error = null;
    },
    [signUp.rejected]: (state, { error }) => {
      state.isLoggingIn = false;
      state.error = error;
    },
    [uploadResume.pending]: (state, action) => {
      state.isUploading = true;
    },
    [uploadResume.fulfilled]: (state, { payload }) => {
      state.isUploading = false;
      state.newUser = payload;
      state.uploadError = null;
    },
    [uploadResume.rejected]: (state, { error }) => {
      state.isUploading = false;
      state.uploadError = error;
    },
    [updateUser.pending]: (state, action) => {
      state.isUpdatingUser = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.isUpdatingUser = false;
      let formerUser = JSON.parse(localStorage.getItem('user'));
      // console.log(formerUser);
      formerUser.user = payload.data;
      state.user = formerUser;
      localStorage.setItem('user', JSON.stringify(formerUser));
    },
    [updateUser.rejected]: (state, { error }) => {
      state.updateUserError = error;
    },
  },
});

export const selectUser = (state) => state.user.user;
export const selectIsLoggingIn = (state) => state.user.isLoggingIn;
export const selectNewUser = (state) => state.user.newUser;
export const selectIsUploading = (state) => state.user.isUploading;
export const selectIsUpdatingUser = (state) => state.user.isUpdatingUser;
export const { logout, setNewUser } = userSlice.actions;

export default userSlice.reducer;
