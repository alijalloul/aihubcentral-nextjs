'use client';

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: {},
        pending: false,
        error: false
    },
    reducers: {
        startAPI: (state) => {
            state.pending = true;
        },
        loginSuccess: (state, action) => {
            state.pending = false;
            if (typeof window !== 'undefined') {
                localStorage.setItem('profile', JSON.stringify({ ...action?.payload}))
            };
            state.userInfo = action?.payload.result;
        },
        logoutSuccess: (state) => {
            state.pending = false;
            state.userInfo = null;
            if (typeof window !== 'undefined') {
                localStorage.clear();
            }
        },
        errorAPI: (state) => {
            state.pending = null;
            state.error = true;
        }
    }
});

export const googleLogin = (userInfo, dispatch) => {
    dispatch(userSlice.actions.startAPI());

    try {
        dispatch(userSlice.actions.loginSuccess(userInfo));
    } catch (error) {
        dispatch(userSlice.actions.errorAPI());
        console.log("error: ", error);
    }
}
export const login = async (userInfo, Headerigate, dispatch) => {
    dispatch(userSlice.actions.startAPI());

    try {
        
        const res = await fetch(`/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        });

        const data = await res.json();
        
        dispatch(userSlice.actions.loginSuccess(data));

        Headerigate("/");
    } catch (error) {
        dispatch(userSlice.actions.errorAPI());
        console.log("error: ", error);
    }
}
export const signup = async (userInfo, Headerigate, dispatch) => {
    dispatch(userSlice.actions.startAPI());

    try {
        
        const res = await fetch(`/users/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        });

        const data = await res.json();

        if(data?.message === "Account already exists."){
            return data;
        }

        dispatch(userSlice.actions.loginSuccess(data));
        Headerigate("/");
    } catch (error) {
        dispatch(userSlice.actions.errorAPI());
        console.log("error: ", error);
    }
}
export const logout = (Headerigate, dispatch) => {
    dispatch(userSlice.actions.startAPI());

    try {
        dispatch(userSlice.actions.logoutSuccess());

        Headerigate("/");
    } catch (error) {
        dispatch(userSlice.actions.errorAPI());
        console.log("error: ", error);
    }
}

export default userSlice.reducer;