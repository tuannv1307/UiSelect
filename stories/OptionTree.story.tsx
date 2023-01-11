/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { header, demo } from "wix-storybook-utils/Sections";
import { CATEGORY } from "./storiesHierarchy";
import App from "../src/App";
import { dataUiSelect } from "../constants";

const data = dataUiSelect;

const Demo1 = () => (
  <App
    typeRender="tree"
    typeSelect="single"
    options={data}
    showLevel={2}
    arrSelectedData={["Default", "Group-1", "Gear", "Group-2"]}
  />
);

const Demo2 = () => (
  <App
    typeRender="tree"
    typeSelect="multi"
    options={data}
    showLevel={2}
    arrSelectedData={["Default", "Group-1", "Gear", "Group-2"]}
  />
);

export default {
  category: CATEGORY.COMPONENTS,
  storyName: "UI select render options tree",

  sections: [
    header({ title: "show option tree" }),

    demo({
      title: "Demo 1: select single",
      component: <Demo1 />,
    }),

    demo({
      title: "Demo 2:select multi",
      component: <Demo2 />,
    }),
  ],
};
