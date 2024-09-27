'use client';

import { createSlice } from "@reduxjs/toolkit";



const chatsSlice = createSlice({
    name: "chats",
    initialState: {
        chatsInfo: [[]],
        chatsNames: ["Chat 1"],
        pending: false,
        error: false
    },
    reducers: {
        startAPI: (state) => {
            state.pending = true;
        },
        setChatsStateSuccess: (state, action) => {
            state.pending = false;
            state.chatsInfo = action.payload;
            console.log("payload: ", action.payload)
        },
        setChatsNamesSuccess: (state, action) => {
            state.pending = false;
            state.chatsNames = action.payload;
        },
        errorAPI: (state) => {
            state.pending = null;
            state.error = true;
        },
    }
});

export const setChatsState = (chats, dispatch) => {
    dispatch(chatsSlice.actions.startAPI());

    try {    
        dispatch(chatsSlice.actions.setChatsStateSuccess(chats))
    } catch (error) {
        dispatch(chatsSlice.actions.errorAPI());
        console.log("error: ", error);
    }
}

export const setChatsNamesState = (chatsNames, dispatch) => {
    dispatch(chatsSlice.actions.startAPI());

    try {    
        dispatch(chatsSlice.actions.setChatsNamesSuccess(chatsNames))
    } catch (error) {
        dispatch(chatsSlice.actions.errorAPI());
        console.log("error: ", error);
    }
}

export default chatsSlice.reducer;