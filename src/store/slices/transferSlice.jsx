import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  letterNumber: "",
  letterCode: "",
  recipientName: {
    local: [
      {
        name: "إسلام عادل",
        email: "i.adel@dnpp.gov.eg",
      },
      {
        name: "محمد حسين",
        email: "m.hussien@dnpp.gov.eg",
      },
      {
        name: "أحمد عبدالعزيز",
        email: "Ahmedabdelaziz@nppa.gov.eg",
      },
      { email: "eldabaapermits@dnpp.gov.eg" },
    ],
    foreign: [
      {
        name: "إسلام عادل",
        email: "i.adel@dnpp.gov.eg",
      },
      {
        name: "محمد حسين",
        email: "m.hussien@dnpp.gov.eg",
      },
    ],
  },
  cc: [],
  companyName: "",
  docType: "local",
  attachments: {
    ids: true,
    dataList: true,
    transferDataList: true,
  },
};

export const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    setConfig: (state, { payload }) => {
      return payload;
    },
    setDocType: (state, action) => {
      state.docType = action.payload;
    },
    toggleAttachment: (state, action) => {
      const { attachmentName } = action.payload;
      state.attachments[attachmentName] = !state.attachments[attachmentName];
    },
    updateCompanyName: (state, action) => {
      const { companyName } = action.payload;
      console.log(companyName);
      state.companyName = companyName;
    },
    updateLetterNumber: (state, action) => {
      const { letterNumber } = action.payload;
      state.letterNumber = letterNumber;
    },
  },
});

export const {
  setConfig,
  setDocType,
  toggleAttachment,
  updateCompanyName,
  updateLetterNumber,
} = transferSlice.actions;

export default transferSlice.reducer;
