import _ from "lodash";

export const flatArrData = (arrData?: DATA_UI[]) => {
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

export const arrdataRecursive = (
  arr?: DATA_UI[],
  currentLevel = 1,
  path = ""
) => {
  const newArrData: DATA_UI[] | undefined = [];

  _.forEach(arr, (item) => {
    const currentPath: string = `${path} / ${item.label}`;
    item = { ...item };
    item["level"] = currentLevel;
    if (!_.isUndefined(item.label))
      item["path"] =
        currentLevel === 0
          ? ""
          : currentPath.substring(
              3,
              currentPath.length - item.label.length - 3
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
