import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import movieReducer from "../features/movies/moviesSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer
  },
});
