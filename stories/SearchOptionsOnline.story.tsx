/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { header, demo } from "wix-storybook-utils/Sections";
import { CATEGORY } from "./storiesHierarchy";
import App from "../src/App";

const Demo1 = () => (
  <App
    typeRender="single"
    typeSelect="single"
    typeSearch="online"
    isSearchOnline={true}
    url="http://localhost:3005/options"
    arrSelectedData={["Bags", "Watches", "Collections"]}
  />
);

const Demo2 = () => (
  <App
    typeRender="tree"
    typeSelect="multi"
    typeSearch="online"
    isSearchOnline={true}
    url="http://localhost:3005/options"
    arrSelectedData={["Bags", "Watches"]}
  />
);

// const Demo3 = () => (
//   <App
//     // cleaable={true}
//     typeRender="single"
//     typeSelect="multi"
//     typeSearch="online"
//     isSearchOnline={true}
//     url="http://localhost:3005/options"
//     // selectedData=["Bags", "Watches"]
//   />
// );
// const Demo4 = () => (
//   <App
//     typeSelect="multi"
//     typeSearch="online"
//     isSearchOnline={true}
//     url="http://localhost:3005/options"
//   />
// );

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
