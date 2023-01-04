import { createSlice } from "@reduxjs/toolkit";
import type { ActionTypes } from "./ActionTypes";

export type DATA_UI = {
  value?: string;
  label?: string;
  groupOptions?: [];
  level?: number;
  path?: string;
};

export type UiSelect = {
  data?: {}[];
  flatData?: {}[];

  selectedData?: DATA_UI[];
  refInputSearch?: boolean;
  elementFocused?: [] | undefined;
};

const initState: UiSelect = {
  data: [],
  flatData: [],
  selectedData: [],
  refInputSearch: false,
  elementFocused: undefined,
};

const AppStore = createSlice<UiSelect, ActionTypes>({
  name: "ui_select",
  initialState: initState as UiSelect,
  reducers: {
    initDataUI: (state, action) => {
      const { data } = action.payload;
      state.data = [...data];
    },

    initFlatData: (state, action) => {
      const { flatData } = action.payload;
      state.flatData = [...flatData];
    },

    addSelectoptions: (state, action) => {
      let arrSelect = action.payload;

      state.selectedData = arrSelect;
    },

    deleteOptionSelected: (state, action) => {
      const arrDelete = action.payload;

      state.selectedData = arrDelete;
    },

    setRefInputSearch: (state, action) => {
      const refInput = action.payload;

      state.refInputSearch = refInput;
    },

    changeElementFocused: (state, action) => {
      state.elementFocused = action.payload;
    },
  },
});

export const {
  initDataUI,
  initFlatData,
  addSelectoptions,
  deleteOptionSelected,
  setRefInputSearch,
  changeElementFocused,
} = AppStore.actions;

export default AppStore.reducer;
