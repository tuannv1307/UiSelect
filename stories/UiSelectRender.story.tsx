/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { header, demo } from "wix-storybook-utils/Sections";
import { CATEGORY } from "./storiesHierarchy";
import App from "../src/App";

import { dataUiSelect } from "../src/constants";

const data: any = dataUiSelect;

const Demo = () => (
  <App
    typeRender="single"
    typeSelect="single"
    typeSearch="offline"
    typeGroup="group_single"
    options={data}
  />
);

const Demo1 = () => (
  <App
    typeRender="single"
    typeSelect="multi"
    typeSearch="offline"
    typeGroup="group_single"
    options={data}
    showLevel={2}
  />
);

const Demo2 = () => (
  <App
    typeRender="tree"
    typeSelect="multi"
    typeSearch="offline"
    options={data}
    showLevel={4}
  />
);
export default {
  category: CATEGORY.COMPONENTS,
  storyName: "UI select render with data",

  sections: [
    header({ title: "select" }),

    demo({
      title: "Demo",
      component: <Demo />,
    }),

    // demo({
    //   title: "Demo 1: single",
    //   component: <Demo1 />,
    // }),

    demo({
      title: "Demo 2: multi",
      component: <Demo2 />,
    }),
  ],
};
