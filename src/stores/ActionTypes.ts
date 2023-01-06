import type { PayloadAction } from "@reduxjs/toolkit";
import type { DATA_UI, UiSelect } from "./ReduxStore";

export type ActionTypes = {
  initDataUI: (state: UiSelect, action: PayloadAction<{ data: any[] }>) => void;
  initFlatData: (
    state: UiSelect,
    action: PayloadAction<{ flatData: DATA_UI[] }>
  ) => void;
  addSelectoptions: (state: UiSelect, action: PayloadAction<DATA_UI[]>) => void;
  deleteOptionSelected: (
    state: UiSelect,
    action: PayloadAction<DATA_UI[]>
  ) => void;
  setRefInputSearch: (state: UiSelect, action: PayloadAction<boolean>) => void;
  changeElementFocused: (state: UiSelect, action: PayloadAction<any>) => void;
  setShowOptions: (state: UiSelect, action: PayloadAction<any>) => void;
  setIsLoading: (state: UiSelect, action: PayloadAction<boolean>) => void;
};
