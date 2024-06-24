import { combineReducers } from "@reduxjs/toolkit";
import siteEmailReducer from "../slices/siteEmailSlice";
import familyEmailReducer from "../slices/familyEmailSlice";
import relocationEmailReducer from "../slices/relocationEmailSlice";
import threeMonthsEmailReducer from "../slices/threeMonthsEmailSlice";
import mainSliceReducer from "../slices/mainSlice";
import responseLetterReducer from "../slices/responseLetterSlice";

const rootReducer = combineReducers({
  siteEmail: siteEmailReducer,
  familyEmail: familyEmailReducer,
  threeMonthsEmail: threeMonthsEmailReducer,
  relocationEmail: relocationEmailReducer,
  mainSlice: mainSliceReducer,
  responseLetterDoc: responseLetterReducer,
});

export default rootReducer;
