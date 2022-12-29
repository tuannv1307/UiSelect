import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./ReduxStore";

export const initStore = () => {
  return configureStore({
    reducer: { ui_select: mainReducer },
  });
};

const store = initStore();

export type RootState = ReturnType<typeof store.getState>;

export default store;
