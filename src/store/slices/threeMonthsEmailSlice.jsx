import { createSlice } from "@reduxjs/toolkit";

export const defaultConfig = {
  letterNumber: "",
  letterCode: "",
  recipientName: [],
  cc: [],
  carCount: "",
  companies: ["ASE"],
  authorizedAreas: "",
  docType: "local",
  attachments: {
    entranceList: true,
    drivingLicense: true,
    carLicense: true,
  },
};

export const threeMonthsEmailSlice = createSlice({
  name: "threeMonthsEmail",
  initialState: defaultConfig,
  reducers: {
    // reset the initial state
    setConfig: (state, { payload }) => {
      return payload;
    },

    // update letter number
    updateLetterNumber: (state, { payload }) => {
      state.letterNumber = +payload;
    },

    updateCarCount: (state, { payload }) => {
      state.carCount = +payload;
    },

    updateLetterCode: (state, { payload }) => {
      state.letterCode = payload;
    },

    updateAuthorizedAreas: (state, { payload }) => {
      state.authorizedAreas = payload;
    },
    setDocType: (state, action) => {
      state.docType = action.payload;
    },

    //Attachments reducers :
    toggleAttachment: (state, action) => {
      const { attachmentName } = action.payload;
      state.attachments[attachmentName] = !state.attachments[attachmentName];
    },

    // COMPANIES
    addCompany: (state, action) => {
      state.companies.push(action.payload);
    },
    removeCompany: (state, action) => {
      state.companies.splice(action.payload, 1);
    },
    updateCompanyName: (state, { payload }) => {
      const { index, name } = payload;
      state.companies[index] = name;
    },
  },
});

export const {
  setConfig,
  updateLetterCode,
  updateLetterNumber,
  toggleAttachment,
  updateCarCount,
  addCompany,
  setDocType,

  updateCompanyName,
  removeCompany,
  updateAuthorizedAreas,
} = threeMonthsEmailSlice.actions;

export default threeMonthsEmailSlice.reducer;
