import { createSlice } from "@reduxjs/toolkit";

export const defaultConfig = {
  nationality: "local",
  type: "personnel",
  data: [],
  preparer: "",
  reviewer1: "",
  reviewer2: "",
  approvedBy: "",
};

export const responseLetterSlice = createSlice({
  name: "responseLetterDoc",
  initialState: defaultConfig,
  reducers: {
    setConfig: (state, { payload }) => {
      return payload;
    },
    addCompany: (state, { payload }) => {
      state.data.push(payload);
    },
    updatePreparer: (state, { payload }) => {
      state.preparer = payload;
    },
    updateReviewer1: (state, { payload }) => {
      state.reviewer1 = payload;
    },
    updateReviewer2: (state, { payload }) => {
      state.reviewer2 = payload;
    },
    updateApprovedBy: (state, { payload }) => {
      state.approvedBy = payload;
    },
    updateNationality: (state, { payload }) => {
      state.nationality = payload;
    },
    removeCompany: (state, action) => {
      state.data.splice(action.payload, 1);
    },
    updateCompany: (state, { payload }) => {
      state.data[payload.index][payload.name] = payload.value;
    },
  },  
});

export const {
  setConfig,
  addCompany,
  updateCompany,
  updatePreparer,
  updateReviewer1,
  updateReviewer2,
  updateApprovedBy,
  updateNationality,
  removeCompany,
} = responseLetterSlice.actions;

export default responseLetterSlice.reducer;
