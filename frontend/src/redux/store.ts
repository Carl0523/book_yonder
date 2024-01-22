import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import formReducer from "./slices/formSlice"

export const store = configureStore({
  reducer: { user: userReducer, form: formReducer },
});



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>