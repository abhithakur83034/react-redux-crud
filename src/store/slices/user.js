import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: []
};

const auth = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        createAuth: (state, action) => {
            console.log(state);
            console.log(action.payload);
            // state.user = [...state.user,action.payload];
            state.user.push(action.payload)
        },
        updateAuth: (state, action) => {
            const {index, ...updatedUserData } = action.payload;
            console.log(updatedUserData);
            state.user[index]=updatedUserData;
        },
        removeAuth: (state, action) => {
            console.log(action.payload);
            const index = action.payload;
            state.user.splice(index,1)
        }
    }
});

export const { createAuth, updateAuth, removeAuth } = auth.actions;
export const getAuth = (state) => state.user.user;
export default auth.reducer;