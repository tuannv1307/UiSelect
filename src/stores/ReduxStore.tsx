import { createSlice } from "@reduxjs/toolkit";
import type { ActionTypes } from "./ActionTypes";
import _ from "lodash";

export type DATA_UI = {
  value: string;
  label: string;
  groupOptions: {}[];
};

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
    initDataUI: (state, action) => {
      const { data } = action.payload;
      state.data = [...data];
    },

    addSelectoptions: (state, action) => {
      const arrSelect = action.payload;

      state.data = arrSelect;
    },
    deleteOptionSelected: (state, action) => {
      const arrDelete = action.payload;

      state.data = arrDelete;
    },
  },
});

export const { initDataUI, addSelectoptions, deleteOptionSelected } =
  AppStore.actions;

export default AppStore.reducer;
