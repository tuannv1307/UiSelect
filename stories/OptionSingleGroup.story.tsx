/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { header, demo } from "wix-storybook-utils/Sections";
import { CATEGORY } from "./storiesHierarchy";
import App from "../src/App";
import { dataUiSelect } from "../constants";

const data = dataUiSelect;

const Demo = () => (
  <App
    typeRender="single"
    typeSelect="single"
    typeGroup="group_single"
    options={data}
  />
);

const Demo1 = () => (
  <App
    typeRender="single"
    typeSelect="multi"
    typeGroup="group_single"
    options={data}
  />
);

export default {
  category: CATEGORY.COMPONENTS,
  storyName: "UI select render options single group",

  sections: [
    header({ title: "show options single group" }),

    demo({
      title: "Demo 1: select single",
      component: <Demo />,
    }),

    demo({
      title: "Demo 1: select multi",
      component: <Demo1 />,
    }),
  ],
};
