/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { header, demo } from "wix-storybook-utils/Sections";
import { CATEGORY } from "./storiesHierarchy";
import App from "../src/App";
import SelectOptions from "../src/components/SelectOptions/SelectOptions";
import { Provider } from "react-redux";
import { initStore } from "../src/stores/store";
import { dataUiSelect } from "../src/constants";

const data: any = dataUiSelect;

const Demo = () => (
  <App typeRender="single" typeSearch="offline" options={data} />
);

const Demo1 = () => (
  <App typeRender="tree" typeSearch="offline" options={data} />
);
export default {
  category: CATEGORY.COMPONENTS,
  storyName: "UI select render with data",

  sections: [
    header({ title: "select" }),

    // demo({
    //   title: "Demo 1",
    //   component: <App />,
    // }),

    demo({
      title: "Demo 1: single",
      component: <Demo />,
    }),

    demo({
      title: "Demo 2: tree",
      component: <Demo1 />,
    }),
  ],
};
