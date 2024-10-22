"use client";

import { configureStore } from "@reduxjs/toolkit";

import Chats from "./Chats.js";
import Images from "./Images.js";
import User from "./User.js";

export default configureStore({
  reducer: {
    images: Images,
    chats: Chats,
    user: User,
  },
});
