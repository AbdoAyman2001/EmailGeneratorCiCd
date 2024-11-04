import { createSlice } from "@reduxjs/toolkit";

export const defaultConfig = {
  letterNumber: "",
  cc: {
    local: [],
    foreign: [],
  },

  recipientName: {
    local: [],
    foreign: [],
  },
  peopleCount: 0,
  carCount: 0,
  gender: "M",
  companies: ["ASE"],
  authorizedAreas: "",
  attachments: {
    ids: true,
    checklist: true,
    entranceList: true,
    drivingLicense: true,
    carLicense: true,
    commercialSheet: false,
    taxId: false,
    managerId: false,
    companyDataList: false,
  },
  companyExists: true,
  docType: "local",
  highPriority: false,
};

export const siteEmailSlice = createSlice({
  name: "siteEmail",
  initialState: defaultConfig,
  reducers: {
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

    // RECIPIENTS
    addRecipient: (state, action) => {
      state.recipientName.push(action.payload);
    },
    removeRecipient: (state, action) => {
      state.recipientName.splice(action.payload, 1);
    },
    updateRecipientName: (state, action) => {
      const { index, name } = action.payload;
      state.recipientName[index] = name;
    },

    //Attachments reducers :
    toggleAttachment: (state, action) => {
      const { attachmentName } = action.payload;
      state.attachments[attachmentName] = !state.attachments[attachmentName];
    },

    setDocType: (state, action) => {
      state.docType = action.payload;
    },

    updatePeopleCount: (state, { payload }) => {
      state.peopleCount = payload;
    },
    updateCarCount: (state, { payload }) => {
      state.carCount = +payload;
    },
    updateGender: (state, { payload }) => {
      state.gender = payload;
    },
    updateCompanies: (state, { payload }) => {
      state.companies = [...payload.companies];
    },
    updateAuthorizedAreas: (state, { payload }) => {
      state.authorizedAreas = payload;
    },
    updateAttachmentsIDs: (state, { payload }) => {
      state.attachments.IDs = payload.IDs;
    },
    updatePeopleDataList: (state, { payload }) => {
      state.attachments.peopleDataList = payload.peopleDataList;
    },
    updateDriverDataList: (state, { payload }) => {
      state.attachments.driverDataList = payload.driverDataList;
    },
    updateLicenseList: (state, { payload }) => {
      state.attachments.licenseList = payload.licenseList;
    },

    //  for cc
    addCC: (state, { payload }) => {
      state.cc.push(payload);
    },
    removeCC: (state, { payload }) => {
      state.cc.splice(+payload, 1);
    },

    // update letter number
    updateLetterNumber: (state, { payload }) => {
      state.letterNumber = +payload;
    },

    // reset the initial state
    setConfig: (state, { payload }) => {
      return payload;
    },

    setCompanyExists: (state, { payload }) => {
      state.companyExists = payload.companyExists;
    },

    setHighPriority: (state, { payload }) => {
      state.highPriority = payload.highPriority;
    },
  },
});

export const {
  updateLetterNumber,
  setCompanyExists,
  setDocType,
  addCompany,
  updateCompanyName,
  removeCompany,
  addRecipient,
  updateRecipientName,
  removeRecipient,
  toggleAttachment,
  updatePeopleCount,
  updateGender,
  updateCompanies,
  updateAuthorizedAreas,
  updateAttachmentsIDs,
  updatePeopleDataList,
  updateDriverDataList,
  updateLicenseList,
  updateCarCount,
  addCC,
  resetState,
  removeCC,
  setConfig,
  setShiftNumber,
  setHighPriority,
} = siteEmailSlice.actions;

export default siteEmailSlice.reducer;
