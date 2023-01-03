import { createSlice } from "@reduxjs/toolkit";
import type { ActionTypes } from "./ActionTypes";
import _ from "lodash";

export type DATA_UI = {
  value?: string;
  label?: string;
  groupOptions?: {}[];
};

export type UiSelect = {
  data?: {}[];
  flatData?: {}[];

  selectedData?: [];
};

const initState: UiSelect = {
  data: [],
  flatData: [],
  selectedData: [],
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

      // let arrSelected = _.cloneDeep(state.selectedData);
      // arrSelected = arrSelect;

      // let arrFlatData = _.cloneDeep(state.flatData);
      // arrFlatData = arrSelect;

      state.selectedData = arrSelect;
      //  state.flatData = _.cloneDeep(arrFlatData);
    },

    deleteOptionSelected: (state, action) => {
      const arrDelete = action.payload;

      state.selectedData = arrDelete;
    },
  },
});

export const {
  initDataUI,
  initFlatData,
  addSelectoptions,
  deleteOptionSelected,
} = AppStore.actions;

export default AppStore.reducer;
