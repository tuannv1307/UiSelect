/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { header, demo } from "wix-storybook-utils/Sections";
import { CATEGORY } from "./storiesHierarchy";
import App from "../src/App";

const Demo1 = () => (
  <App
    typeRender="single"
    typeSelect="single"
    isSearchOnline={true}
    url="http://192.168.1.21:3005/options"
    arrSelectedData={["Default", "Group-1", "Gear", "Group-2"]}
  />
);

const Demo2 = () => (
  <App
    typeRender="single"
    typeSelect="multi"
    isSearchOnline={true}
    url="http://192.168.1.21:3005/options"
    arrSelectedData={["Default", "Group-1", "Gear", "Group-2"]}
  />
);

export default {
  category: CATEGORY.COMPONENTS,
  storyName: "UI select search online",

  sections: [
    header({ title: "show option  search online" }),

    demo({
      title: "Demo 1: search online select single",
      component: <Demo1 />,
    }),

    demo({
      title: "Demo 2: search online select multi",
      component: <Demo2 />,
    }),
  ],
};
