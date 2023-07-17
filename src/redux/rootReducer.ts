import { combineReducers } from "@reduxjs/toolkit";
import { reportsSlice } from "./reports-slice";

export const rootReducer = combineReducers({
  reports: reportsSlice.reducer,
});
