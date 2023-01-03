import React, { memo, useEffect, useState } from "react";
import FilterOptions from "../FilterOptions/FilterOptions";
import _, { flatMap } from "lodash";
import { DATA_UI, UiSelect, addSelectoptions } from "../../stores/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ToggleUp } from "./svgIcon/ToggleUp.svg";
import { ReactComponent as ToggleDown } from "./svgIcon/ToggleDown.svg";
import { ReactComponent as Square } from "./svgIcon/Square.svg";
import { ReactComponent as SquareTick } from "./svgIcon/SquareTick.svg";
import { st, classes } from "./Options.st.css";

export type OptionsProps = {
  data: any;
  typeRender?: "single" | "tree";
  typeSelect?: "single" | "multi";
  options?: any;
  platArrData?: any;
  handleCloseOptions?: any;
  deleteOptionAllSelected?: any;
  showLevel?: number;
  isShowOption?: boolean;
};
const Options = ({
  typeRender,
  options,
  platArrData,
  handleCloseOptions,
  typeSelect,
  data,
  showLevel,
  isShowOption,
}: // isShowChild
// isShow
OptionsProps) => {
  const dataStore: UiSelect = useSelector(
    (state: { ui_select: UiSelect }) => state.ui_select
  );
  let selectedData: any = dataStore.selectedData;

  const dispatch = useDispatch();

  const handleAddselectOptions = (option?: any) => {
    const currentOption = _.cloneDeep(option);
    currentOption["groupOptions"] = [];

    let currentSelectedData = _.cloneDeep(selectedData);

    if (_.find(currentSelectedData, currentOption)) {
      const newSelectedData = [];
      _.each(currentSelectedData, (option) => {
        if (option.value !== currentOption.value) {
          newSelectedData.push(option);
        }
      });

      dispatch(addSelectoptions(newSelectedData));
    } else {
      currentSelectedData.push(currentOption);
      dispatch(addSelectoptions(currentSelectedData));
    }

    // selectedData = _.cloneDeep(selectedData);
    // if (typeSelect === "single" && typeRender === "single") {
    //   // platArrData = _.map(platArrData, (opt) =>
    //   //   opt.value === value
    //   //     ? { ...opt, isSelected: true }
    //   //     : { ...opt, isSelected: false }
    //   // );
    //   _.forEach(platArrData, (opt) => {
    //     if (opt.value === value) {
    //       selectedData?.push({ ...opt, isSelected: !selected });
    //     }
    //   });
    //   dispatch(addSelectoptions(selectedData));
    //   setTimeout(() => {
    //     handleCloseOptions();
    //   }, 100);
    // } else if (typeSelect === "multi" && typeRender === "single") {
    //   // platArrData = _.map(platArrData, (opt) =>
    //   //   opt.value === value ? { ...opt, isSelected: !selected } : { ...opt }
    //   // );

    //   let newSelecteData: any = _.cloneDeep(selectedData);

    //   newSelecteData = _.filter(newSelecteData, (opt) => opt.value !== value);

    //   _.forEach(platArrData, (opt) => {
    //     if (opt.value === value) {
    //       if (!_.find(newSelecteData, { value: value })) {
    //         newSelecteData?.push({
    //           ...opt,
    //           isSelected: !selected,
    //           groupOptions: null,
    //         });
    //       }
    //     }
    //   });

    //   // const a = _.find(newSelecteData, { value: value, isSelected: true });

    //   // newSelecteData = _.map(newSelecteData, (item) =>
    //   //   item.value === a.value ? { ...item, isSelected: !a.isSelected } : item
    //   // );
    //   dispatch(addSelectoptions(newSelecteData));
    // }

    // if (typeRender === "tree") {
    //   let newSelecteData: any = _.cloneDeep(selectedData);

    //   //  newSelecteData = _.filter(newSelecteData, (opt) => opt.value !== value);

    //   const handleAdd = (arr: any) => {
    //     _.forEach(arr, (opt) => {
    //       if (opt.value === value) {
    //         if (!_.find(newSelecteData, { value: value })) {
    //           newSelecteData?.push({
    //             ...opt,
    //             isSelected: !selected,
    //             groupOptions: null,
    //           });
    //         }
    //       }
    //       if (opt.groupOptions) {
    //         handleAdd(opt.groupOptions);
    //       }
    //     });
    //   };
    //   handleAdd(data);
    //   // data = _.map(_.cloneDeep(data), (opt) =>
    //   //   opt.value === value ? { ...opt, isSelected: !selected } : opt
    //   // );

    //   console.log(newSelecteData);
    //   dispatch(addSelectoptions(newSelecteData));
    // }
  };

  console.log(dataStore);

  const handleOnMouseEnter = (e: any, value?: string, selected?: boolean) => {
    console.log("a");
  };
  const handleOnMouseLeave = () => {
    console.log("bb");
  };

  const handleKeyDown = () => {
    console.log("abc");
  };

  return (
    <div className={st(classes.root)}>
      <>
        {typeRender === "single" && (
          <div className={st(classes.listItemOptions)}>
            {_.map(platArrData, (opt) => (
              <div
                className={st(classes.itemOption, { active: opt?.isSelected })}
                onClick={() => handleAddselectOptions(opt)}
                key={opt.value}
                onMouseEnter={(e) =>
                  handleOnMouseEnter(e, opt.value, opt?.isSelected)
                }
                onMouseLeave={handleOnMouseLeave}
                onKeyDown={handleKeyDown}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}

        {typeRender === "tree" && (
          <ul className={st(classes.listItemOptionsTree)}>
            {_.map(data, (opt) => (
              <OptionsTree
                data={opt}
                key={opt}
                typeRender={typeRender}
                options={options}
                platArrData={platArrData}
                handleCloseOptions={handleCloseOptions}
                typeSelect={typeSelect}
                handleAddselectOptions={handleAddselectOptions}
                showLevel={showLevel}
                selectedData={selectedData}
              />
            ))}
          </ul>
        )}
      </>
    </div>
  );
};

export type OptionsTreeProps = {
  data?: any;
  typeRender?: "single" | "tree";
  typeSelect?: "single" | "multi";
  options?: any;
  platArrData?: any;
  handleCloseOptions?: any;
  handleAddselectOptions?: any;
  showLevel?: any;
  selectedData?: any;
};

const OptionsTree = ({
  data,
  typeRender,
  options,
  platArrData,
  handleCloseOptions,
  typeSelect,
  handleAddselectOptions,
  showLevel,
  selectedData,
}: OptionsTreeProps) => {
  const hashChild = data.groupOptions ? true : false;
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (hashChild && showLevel > data.level) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }, [showLevel, data.level, hashChild]);

  const handleToglleOptions = () => {
    setIsShow(!isShow);
  };

  const isShowCheck = _.find(selectedData, { value: data.value });

  return (
    <li className={st(classes.optionsTree)}>
      <div className={st(classes.itemTrees)}>
        <span onClick={handleToglleOptions} className={st(classes.toggleItems)}>
          {isShow && (
            <>
              <ToggleUp />
            </>
          )}
          {!isShow && hashChild && <ToggleDown />}
        </span>

        <div
          className={st(classes.itemOptionTree)}
          onClick={() => handleAddselectOptions(data)}
          tabIndex={0}
        >
          {isShowCheck ? <SquareTick /> : <Square />}
          {data.label}
        </div>
      </div>

      {hashChild && isShow && (
        <ul className={st(classes.listItemTree)}>
          {_.map(data.groupOptions, (opt) => (
            <OptionsTree
              data={opt}
              key={opt.value}
              typeRender={typeRender}
              options={options}
              platArrData={platArrData}
              handleCloseOptions={handleCloseOptions}
              typeSelect={typeSelect}
              handleAddselectOptions={handleAddselectOptions}
              showLevel={showLevel}
              selectedData={selectedData}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default memo(Options);
