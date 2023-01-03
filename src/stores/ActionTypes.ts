import type { PayloadAction } from "@reduxjs/toolkit";
import type { UiSelect } from "./ReduxStore";

export type ActionTypes = {
  initDataUI: (state: UiSelect, action: PayloadAction<{ data: any[] }>) => void;
  initFlatData: (
    state: UiSelect,
    action: PayloadAction<{ flatData: any[] }>
  ) => void;
  addSelectoptions: (state: UiSelect, action: PayloadAction<any>) => void;
  deleteOptionSelected: (state: UiSelect, action: PayloadAction<any>) => void;
};
