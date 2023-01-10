import _ from "lodash";
import type { DATA_UI } from "../stores/ReduxStore";

export const dataUiSelect = [
  {
    value: "Default",
    label: "Default Category",
    groupOptions: [
      {
        value: "Group-1",
        label: "Gear",
        groupOptions: [
          { value: "Group-11", label: "Bags" },
          { value: "Group-12", label: "Fitness Equipment" },
          { value: "Group-13", label: "Watches" },
        ],
      },
      {
        value: "Group-2",
        label: "Collections",
        groupOptions: [
          { value: "Group-22", label: "New Luma Yoga Collection" },
          { value: "Group-23", label: "Erin Recommends" },
          { value: "Group-24", label: "Performance Fabrics" },
          { value: "Group-25", label: "Eco Friendly" },
          { value: "Group-26", label: "Performance Sportswear New" },
          { value: "Group-27", label: "Eco Collection New" },
        ],
      },
      {
        value: "Group-3",
        label: "Training",
        groupOptions: [{ value: "Group-33", label: "Video Download" }],
      },
      {
        value: "Group-4",
        label: "Men",
        groupOptions: [
          {
            value: "Group-44",
            label: "Tops",

            groupOptions: [
              {
                value: "Group-444",
                label: "Jackets",
              },
              {
                value: "Group-445",
                label: "Hoodies & Sweatshirts",
              },
              {
                value: "Group-446",
                label: "Tees",
              },
              {
                value: "Group-447",
                label: "Tanks",
              },
            ],
          },
          {
            value: "Group-45",
            label: "Bottoms",
            groupOptions: [
              {
                value: "Group-455",
                label: "Pants",
              },
              {
                value: "Group-456",
                label: "Shorts",
              },
            ],
          },
        ],
      },
      {
        value: "Group-5",
        label: "Women",
        groupOptions: [
          {
            value: "Group-55",
            label: "Tops",

            groupOptions: [
              {
                value: "Group-555",
                label: "Jackets",
              },
              {
                value: "Group-556",
                label: "Hoodies & Sweatshirts",
              },
              {
                value: "Group-557",
                label: "Tees",
              },
              {
                value: "Group-558",
                label: "Tanks",
              },
            ],
          },
          {
            value: "Group-56",
            label: "Bottoms",
            groupOptions: [
              {
                value: "Group-566",
                label: "Pants",
              },
              {
                value: "Group-567",
                label: "Shorts",
              },
            ],
          },
        ],
      },
      {
        value: "Group-6",
        label: "Promotions",
        groupOptions: [
          { value: "Group-66", label: "Women Sale" },
          { value: "Group-67", label: "Men Sale" },
          { value: "Group-68", label: "Pants" },
          { value: "Group-69", label: "Tees" },
        ],
      },
      { value: "Group-7", label: "Sale" },
      { value: "Group-8", label: "What's New" },
    ],
  },
];

export const flatArrData = (arrData?: []) => {
  const newArr: DATA_UI[] = [];
  const handleArr = (arrData?: DATA_UI[] | undefined) => {
    _.forEach(arrData, (item) => {
      if (item.groupOptions) {
        newArr.push({
          ...item,
          value: item.value,
          label: item.label,
        });
        handleArr(item.groupOptions);
      } else
        newArr.push({
          ...item,
          value: item.value,
          label: item.label,
        });
    });
  };
  handleArr(arrData);
  return newArr;
};

export const arrdataRecursive = (arr?: any, currentLevel = 1, path = "") => {
  const newArrData: DATA_UI[] | undefined = [];

  _.forEach(arr, (item) => {
    const currentPath: string = `${path} / ${item.label}`;
    item = { ...item };
    item["level"] = currentLevel;
    item["path"] =
      currentLevel === 0
        ? ""
        : currentPath.substring(
            3,
            currentPath.length - item?.label?.length - 3
          );
    if (
      item.value === "Group-7" ||
      item.value === "Group-27" ||
      item.value === "Group-445"
    ) {
      item["isGroup"] = true;
    }

    if (item.groupOptions) {
      item.groupOptions = arrdataRecursive(
        item.groupOptions,
        currentLevel + 1,
        currentPath
      );
    }

    newArrData.push(item);
  });
  return newArrData;
};
