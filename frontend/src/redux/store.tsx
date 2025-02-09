import { combineReducers, configureStore } from "@reduxjs/toolkit";
import useSlice from "./userSlice"




export const store = configureStore({
    reducer: {
        user: useSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;