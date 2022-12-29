import type { PayloadAction } from "@reduxjs/toolkit";
import type { UiSelect } from "./ReduxStore";

export type ActionTypes = {
  initDataUI: (state: UiSelect, action: PayloadAction<{ data: any[] }>) => void;
  changeTitle: (
    state: UiSelect,
    action: PayloadAction<{ title?: string }>
  ) => void;
};
