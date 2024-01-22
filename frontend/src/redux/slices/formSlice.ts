import { createSlice } from "@reduxjs/toolkit";
import { HotelType } from "../../../../backend/src/models/hotel.model";
import axios from "axios";

interface FormState {
  step: number;
  formData: HotelType; // Adjust the type as needed
}

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

const initialState: FormState = localStorage.getItem("form")
  ? JSON.parse(localStorage.getItem("form")!)
  : {
      step: 0,
      formData: {},
    };

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addDataToForm: (state, action) => {
      const currData = action.payload;
      state.formData = {...state.formData, ...currData};
      localStorage.setItem("form", JSON.stringify(state));
    },
    nextStep: (state) => {
      state.step += 1;
      localStorage.setItem("form", JSON.stringify(state));
    },
    prevStep: (state) => {
      state.step -= 1;
      localStorage.setItem("form", JSON.stringify(state));
    },
    submitForm: (state) => {
      const { formData } = state;
      axios
        .post(`${baseUrl}/api/hotels/createHotel`, formData, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
        localStorage.removeItem('form')
    },
  },
});

export const {addDataToForm, nextStep, prevStep, submitForm} = formSlice.actions;
export default formSlice.reducer;
