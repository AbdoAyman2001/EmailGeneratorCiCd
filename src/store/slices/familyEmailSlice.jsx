import { createSlice } from "@reduxjs/toolkit";

export const defaultConfig = {
  letterNumber: "",
  guestNumber: "one",
  cc: {
    local: [],
    foreign: [],
  },
  recipientName: {
    local: [],
    foreign: [],
  },
  docType: "foreign",
  hostGender: "M",
  guestGender: "M",
  companies: ["ASE"],
  peopleCount: 1,
  sender: { name: "", phone: "" },
  shiftNumber: "",
  officePersonnel: [],
  relationship: "",
  attachments: {
    ids: true,
    dataList: true,
    hostPassport: true,
    marriageCert: true,
    birthCert: true,
  },
};

export const familyEmailSlice = createSlice({
  name: "familyEmail",
  initialState: defaultConfig,
  reducers: {
    setRelationShip: (state, { payload }) => {
      console.log("payload : ", payload.relationship);
      state.relationship = payload.relationship;
    },
    // COMPANIES
    setPeopleCount: (state, { payload }) => {
      if (isNaN(+payload.peopleCount)) return;
      state.peopleCount = +payload.peopleCount;
    },
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
    // reset the initial state
    setConfig: (state, { payload }) => {
      return payload;
    },

    setDocType: (state, action) => {
      state.docType = action.payload;
    },

    updateGuestNumber: (state, { payload }) => {
      state.guestNumber = payload;
    },

    updateHostGender: (state, { payload }) => {
      console.log("host : ", payload);
      state.hostGender = payload;
    },
    updateGuestGender: (state, { payload }) => {
      console.log("guest : ", payload);
      state.guestGender = payload;
    },

    toggleAttachment: (state, action) => {
      const { attachmentName } = action.payload;
      state.attachments[attachmentName] = !state.attachments[attachmentName];
    },

    // // RECIPIENTS
    // addRecipient: (state, action) => {
    //   state.recipientName.push(action.payload);
    // },
    // removeRecipient: (state, action) => {
    //   state.recipientName.splice(action.payload, 1);
    // },
    // updateRecipientName: (state, action) => {
    //   const { index, name } = action.payload;
    //   state.recipientName[index] = name;
    // },
  },
});

export const {
  setRelationShip,
  setConfig,
  addCompany,
  setDocType,
  updateGuestGender,
  updateHostGender,
  setPeopleCount,
  removeCompany,
  updateCompanyName,
  toggleAttachment,
  updateGuestNumber,
} = familyEmailSlice.actions;

export default familyEmailSlice.reducer;
