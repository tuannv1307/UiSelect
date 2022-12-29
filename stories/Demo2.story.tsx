/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { header, demo } from "wix-storybook-utils/Sections";
import { CATEGORY } from "./storiesHierarchy";
import App from "../src/App";
import SelectOptions from "../src/components/SelectOptions/SelectOptions";

export default {
  category: CATEGORY.COMPONENTS,
  storyName: "Demo Storybook 2",

  sections: [
    header({ title: "Demo showMore" }),

    demo({
      title: "Demo 1",
      component: <App />,
    }),
  ],
};
