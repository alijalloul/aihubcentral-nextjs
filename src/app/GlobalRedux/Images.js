'use client';

import { createSlice } from "@reduxjs/toolkit";



const imagesSlice = createSlice({
    name: "images",
    initialState: {
        imagesInfo: [],
        pending: {},
        error: false
    },
    reducers: {
        startAPI: (state, action) => {
            state.pending = {...state.pending, [action.payload]: true};
        },
        fetchSuccess: (state, action) => {
            state.pending = {...state.pending, fetchImages: false};
            state.imagesInfo = action.payload;
        },
        errorAPI: (state, action) => {
            state.pending = {...state.pending, [action.payload]: null};
            state.error = true;
        },
    }
});

export const fetchImages = async (dispatch) => {
    dispatch(imagesSlice.actions.startAPI("fetchImages"));

    try {    
        const res = await fetch(`/imageShowcase`);
        const data = await res.json();

        dispatch(imagesSlice.actions.fetchSuccess(data))
    } catch (error) {
        dispatch(imagesSlice.actions.errorAPI());
        console.log("error: ", error);
    }
}

export default imagesSlice.reducer;