import { createSlice } from "@reduxjs/toolkit";
import type { ActionTypes } from "./ActionTypes";

export type DATA_UI = {
  value?: string;
  label?: string;
  groupOptions?: [];
  level?: number;
  path?: string;
  isGroup?: boolean;
};

export type UiSelect = {
  dataOptions?: {}[];
  flatDataOptions?: {}[];
  selectedData?: DATA_UI[];
  isInputSearchRef?: boolean;
  elementFocused?: undefined;
  isLoading?: boolean;
};

const initState: UiSelect = {
  dataOptions: [],
  flatDataOptions: [],
  selectedData: [],
  isInputSearchRef: false,
  elementFocused: undefined,
  isLoading: false,
};

const AppStore = createSlice<UiSelect, ActionTypes>({
  name: "ui_select",
  initialState: initState as UiSelect,
  reducers: {
    initDataUI: (state, action) => {
      const { dataOptions } = action.payload;
      state.dataOptions = [...dataOptions];
    },

    initFlatData: (state, action) => {
      const { flatData } = action.payload;
      state.flatDataOptions = [...flatData];
    },

    addSelectoptions: (state, action) => {
      const arrSelect = action.payload;
      state.selectedData = arrSelect;
    },

    deleteOptionSelected: (state, action) => {
      const arrDelete = action.payload;
      state.selectedData = arrDelete;
    },

    setIsInputSearchRef: (state, action) => {
      const isInputRef = action.payload;
      state.isInputSearchRef = isInputRef;
    },

    changeElementFocused: (state, action) => {
      state.elementFocused = action.payload;
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
  setIsInputSearchRef,
  changeElementFocused,
  setIsLoading,
} = AppStore.actions;

export default AppStore.reducer;
