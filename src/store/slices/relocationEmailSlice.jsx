import { createSlice } from "@reduxjs/toolkit";

export const defaultConfig = {
  letterNumber: "",
  letterSubject: "",
  cc: [],
  recipientName: [],
  companies: ["ASE"],
  letterDate: "",
  attachments: {
    letterAttachments: true,
    letterSituation: true,
  },
  peopleCount: "",
};

export const relocationEmailSlice = createSlice({
  name: "relocationEmail",
  initialState: defaultConfig,
  reducers: {
    // update letter number
    updateLetterNumber: (state, { payload }) => {
      state.letterNumber = +payload;
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

    setConfig: (state, { payload }) => {
      return payload;
    },
    toggleAttachment: (state, action) => {
      const { attachmentName } = action.payload;
      state.attachments[attachmentName] = !state.attachments[attachmentName];
    },
    updateLetterDate: (state, action) => {
      state.letterDate = action.payload;
    },
    setPeopleCount: (state, action) => {
      state.peopleCount = +action.payload.peopleCount;
    },
    updateLetterSubject: (state, { payload }) => {
      state.letterSubject = payload;
    },
  },
});

export const {
  setConfig,
  updateLetterNumber,
  setPeopleCount,
  addCompany,
  updateLetterSubject,
  updateCompanyName,
  removeCompany,
  toggleAttachment,
  updateLetterDate,
} = relocationEmailSlice.actions;

export default relocationEmailSlice.reducer;
