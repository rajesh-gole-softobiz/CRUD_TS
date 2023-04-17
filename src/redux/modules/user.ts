const { get } = require("superagent");
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
// const { createAsyncThunk } = require("@reduxjs/toolkit");
// const { axios } = require("axios");

// const { v4: uuidv4 } = require("uuid");
// const moment = require("moment");

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { get } from 'superagent'


export const fetchUsers = createAsyncThunk("all-users", async (data: any={}) => {
  const response:any = await get("http://localhost:3009/userDetails");
  return response.body;
});
export interface IState {
  user: any[],
  // loading: boolean,
  // error: string | null
}
const initialUsers:IState = {
    user: [],
    // loading: false,
    // error: null
};

export const usersSlice = createSlice({
  name: "user",
  initialState: initialUsers,
  reducers: {
    // showUsers: (state) => state,
    // addUser: (state, action) => {
    //   state.users.push(action.payload);
    // },
    // deleteUser: (state, action) => {
    //   const id = action.payload;
    //   state.users = state.users.filter((user) => user.id !== id);
    // },
  },
  extraReducers: (builder:any) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUsers.pending, (state:any, action:any) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state:any, action:any) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state:any, action:any) => {
      console.log("error");
      state.error = "Something went Wrong";
      state.loading = false;
    });
  },
});

// export const { showUsers, addUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
