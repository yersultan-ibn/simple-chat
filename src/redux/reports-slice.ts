import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { boolean, number, string } from "yup";

export interface ReportsList {
  identifier: string | boolean;
  identifierType: string;
  date: number | string;
  statusReports: string;
}

export interface ReportsState {
  status: string;
  list: (ReportsList | [])[];
}

const initialState: ReportsState = {
  status: "idle",
  list: [],
};

export const reportsSlice = createSlice({
  name: "@@reports",
  initialState,
  reducers: {
    reportsLoading: (state) => {
      state.status = "loading";
    },
    reportsReceived: (state, action) => {
      state.status = "received";
      state.list = action.payload;
    },
    reportsError: (state) => {
      state.status = "rejected";
    },
    createReport: (state, action: PayloadAction<ReportsList>) => {
      const newReport = action.payload;
      // Logic to create a report and add it to the list
      state.list.push(newReport);
    },
    deleteReport: (state, action: PayloadAction<string>) => {
      const reportId = action.payload;
      // Logic to delete a report from the list by its identifier
      state.list = state.list.filter(
        (report: any) => report.identifier !== reportId
      );
    },
  },
});

export const { createReport, deleteReport } = reportsSlice.actions;

export default reportsSlice.reducer;
