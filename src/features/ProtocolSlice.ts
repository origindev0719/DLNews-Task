import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "task",
  initialState: {
    isLoading: false,
    data: [],
    showData: [],
    error: null,
    setting: {
      filterData: {},
      filterItems: { chain: null, category: null },
      currentPage: 1,
      pagePer: 5,
      totalPage: 1,
      sortKeyword: "id",
      sortDir: "asc",
    },
    pending: true,
    started: true,
    completed: true,
  },
  reducers: {
    fetchDataStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchDataFailure(state, action) {
      state.isLoading = false;
      state.data = null;
      state.error = action.payload;
    },
    setSetting(state, action) {
      state.setting = action.payload;
    },
    showData(state, action) {
      state.showData = action.payload;
    },
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  setSetting,
  showData,
} = dataSlice.actions;

export default dataSlice.reducer;
