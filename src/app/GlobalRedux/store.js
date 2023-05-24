'use client';

import { configureStore } from "@reduxjs/toolkit";

import Images from "./Images.js";
import User from "./User.js";
import Chats from "./Chats.js";

export default configureStore({
    reducer: {
        images: Images,
        chats: Chats,
        user: User
    }
});