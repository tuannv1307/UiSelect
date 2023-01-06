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
  elementFocused?: undefined;
  isLoading?: boolean;
};

const initState: UiSelect = {
  data: [],
  flatData: [],
  selectedData: [],
  refInputSearch: false,
  elementFocused: undefined,
  isLoading: false,
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

    setShowOptions: (state, action) => {
      state.flatData = action.payload;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
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
  setShowOptions,
  setIsLoading,
} = AppStore.actions;

export default AppStore.reducer;
