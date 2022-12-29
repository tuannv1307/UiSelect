import { createSlice } from "@reduxjs/toolkit";
import type { ActionTypes } from "./ActionTypes";

export type UiSelect = {
  data?: {}[];
};

const initState: UiSelect = {
  data: [],
};

const AppStore = createSlice<UiSelect, ActionTypes>({
  name: "ui_select",
  initialState: initState as UiSelect,
  reducers: {
    changeTitle: (state, action) => {
      // state.data = action.payload;
    },
    initDataUI: (state, action) => {
      const { data } = action.payload;
      state.data = [...data];
    },
  },
});

export const { changeTitle, initDataUI } = AppStore.actions;

export default AppStore.reducer;
