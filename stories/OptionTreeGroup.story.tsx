/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { header, demo } from "wix-storybook-utils/Sections";
import { CATEGORY } from "./storiesHierarchy";
import App from "../src/App";

import { dataUiSelect } from "../src/constants";

const data: any = dataUiSelect;

const Demo1 = () => (
  <App
    typeRender="tree"
    typeSelect="single"
    options={data}
    typeGroup="group_tree"
    showLevel={2}
  />
);

const Demo2 = () => (
  <App
    typeRender="tree"
    typeSelect="multi"
    options={data}
    typeGroup="group_tree"
    showLevel={2}
  />
);

export default {
  category: CATEGORY.COMPONENTS,
  storyName: "UI select render with options tree group",

  sections: [
    header({ title: "show options tree group" }),

    demo({
      title: "Demo 1: select single",
      component: <Demo1 />,
    }),

    demo({
      title: "Demo 2: select multi",
      component: <Demo2 />,
    }),
  ],
};
