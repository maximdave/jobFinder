import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import Swal from 'sweetalert2';

const baseUrl = 'https://group-e-jobfinder-api.herokuapp.com/api/v1';

const initialState = {
  allUsers: null,
  isGettingAllUsers: false,
  getUsersError: null,
  isSuspendingUser: true,
  suspendedUser: null,
  suspendUserErrMsg: null,
};

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (token, { rejectWithValue, dispatch }) => {
    try {
      const allUsers = await axios({
        method: 'get',
        url: `${baseUrl}/admin/get-users`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return allUsers.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error);
    }
  }
  );

  export const suspendUser = createAsyncThunk(
    'users/suspendUsers',
    async ({ token, id }, { rejectWithValue, dispatch }) => {
    try {
      const suspendedUser = await axios({
        method: 'put',
        url: `${baseUrl}/admin/suspend-user/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(getAllUsers(token))
      return suspendedUser;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {
    setNewUsers: (state, {payload}) => {

    }
  },

  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.isGettingAllUsers = true;
    },
    [getAllUsers.fulfilled]: (state, { payload }) => {
      state.isGettingAllUsers = false;
      state.allUsers = payload;
      state.getUsersError = null;
    },
    [getAllUsers.rejected]: (state, { error }) => {
      state.isGettingAllUsers = false;
      state.allUsers = null;
      state.getUsersError = error;
    },
    [suspendUser.pending]: (state) => {
      state.isSuspendingUser = true;
      state.suspendUserErrMsg = null;
      state.suspendedUser = null
    },
    [suspendUser.fulfilled]: (state, { payload }) => {
      state.isSuspendingUser = false;
      state.suspendedUser = payload;
      // console.log(payload);
      // console.log(state.allUsers);
      state.suspendUserErrMsg = null;
    },
    [suspendUser.rejected]: (state, { error }) => {
      state.isSuspendingUser = true;
      state.suspendedUser = null;
      state.suspendUserErrMsg = error;
    }
  },
});

export const selectAllUsers = (state) => state.users.allUsers;
export const selectIsGettingAllUsers = (state) => state.users.isGettingAllUsers;
export const selectGetUserErrMsg = (state) => state.users.getUsersError;
export const selectIsSuspendingUser = (state) => state.users.isSuspendingUser;
export const selectSuspendedUser = (state) => state.users.suspendedUser;
export const selectSuspendUserErrMsg = (state) => state.users.suspendUserErrMsg;

export const { setNewUsers } = usersSlice.actions;
export default usersSlice.reducer;
