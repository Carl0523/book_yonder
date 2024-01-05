import { createSlice } from "@reduxjs/toolkit";
import {UserType} from "../../../../backend/src/models/user.model";


interface UserState {
  userInfo: UserType | null;
}

const initialState : UserState = localStorage.getItem("userInfo")
  ? { userInfo: JSON.parse(localStorage.getItem("userInfo")!) }
  : { userInfo: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredential: (state, action) => {
      const userInfo = action.payload;
      state.userInfo = userInfo;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    userLogout: (state) => {
        state.userInfo = null;
        localStorage.removeItem("userInfo");
    }
  },
});


export const {setCredential, userLogout} = userSlice.actions;
export default userSlice.reducer;
