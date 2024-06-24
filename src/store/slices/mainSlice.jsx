import { createSlice } from "@reduxjs/toolkit";

export const defaultConfig = {
  sender: { name: "", phone: "" },
  shiftNumber: undefined,
  officePersonnel: [],
};

export const familyEmailSlice = createSlice({
  name: "mainSlice",
  initialState: defaultConfig,
  reducers: {
    setSender: (state, { payload }) => {
      const foundSender = state.officePersonnel.find(
        (personnel) => personnel.name === payload.name
      );
      if (foundSender) {
        state.sender = { ...state.sender, ...foundSender };
      }
    },
    setShiftNumber: (state, { payload }) => {
      if (+payload.shiftNumber === 1 || +payload.shiftNumber === 2)
        state.shiftNumber = +payload.shiftNumber;
    },
    // reset the initial state
    setConfig: (state, { payload }) => {
      return payload;
    },
  },
});

export const { setSender, setShiftNumber, setConfig } =
  familyEmailSlice.actions;

export default familyEmailSlice.reducer;
