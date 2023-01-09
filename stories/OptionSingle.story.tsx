/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { header, demo } from "wix-storybook-utils/Sections";
import { CATEGORY } from "./storiesHierarchy";
import App from "../src/App";

import { dataUiSelect } from "../src/constants";

const data: any = dataUiSelect;

const Demo = () => (
  <App typeRender="single" typeSelect="single" options={data} />
);

const Demo1 = () => (
  <App typeRender="single" typeSelect="multi" options={data} />
);

export default {
  category: CATEGORY.COMPONENTS,
  storyName: "UI select render options single",

  sections: [
    header({ title: "show option single" }),

    demo({
      title: "Demo: select single",
      component: <Demo />,
    }),

    demo({
      title: "Demo 1: select multi",
      component: <Demo1 />,
    }),
  ],
};
