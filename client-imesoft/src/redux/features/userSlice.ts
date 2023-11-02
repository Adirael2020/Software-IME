import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
  };


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logUser: (state, action) => {
            state.user = action.payload;
        },
        outUser: (state, action) => {
            state.user = {};
        },
        editUser: (state, action) => {
            state.user.data.fullname = action.payload.fullname,
            state.user.data.email = action.payload.email,
            state.user.data.birthday = action.payload.birthday 
        },
    }
});

export const { logUser,outUser,editUser } = userSlice.actions;
export default userSlice.reducer;