import React, { memo, useEffect, useState, KeyboardEvent, useRef } from "react";
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

    if (typeSelect === "single") {
      selectedData = _.cloneDeep(selectedData);
      selectedData = [currentOption];
      dispatch(addSelectoptions(selectedData));
      // setTimeout(() => {
      //   set
      // })
    } else {
      let currentSelectedData = _.cloneDeep(selectedData);

      if (_.find(currentSelectedData, currentOption)) {
        const newSelectedData: any = [];
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
    }
  };
  console.log(dataStore);

  const handleOnMouseEnter = (e: any, value?: string, selected?: boolean) => {
    // console.log("a");
  };
  const handleOnMouseLeave = () => {
    //   console.log("bb");
  };

  const handleKeyDown = (e: any, option: any) => {
    if (e.key === "Enter") {
      handleAddselectOptions(option);
    }
    console.log(e);
  };

  return (
    <div className={st(classes.root)}>
      <>
        {typeRender === "single" && (
          <div className={st(classes.listItemOptions)}>
            {_.map(platArrData, (opt, index) => (
              <div
                className={st(classes.itemOption, {
                  active: _.find(selectedData, { value: opt.value })
                    ? true
                    : false,
                })}
                onClick={() => handleAddselectOptions(opt)}
                key={opt.value}
                onMouseEnter={(e) =>
                  handleOnMouseEnter(e, opt.value, opt?.isSelected)
                }
                onMouseLeave={handleOnMouseLeave}
                onKeyDown={(e) => handleKeyDown(e, opt)}
                tabIndex={0}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}

        {typeRender === "tree" && (
          <ul className={st(classes.listItemOptionsTree)}>
            {_.map(data, (opt, index) => (
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
                //  index={index}
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
  index?: string;
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
  index,
}: OptionsTreeProps) => {
  const hashChild = data.groupOptions ? true : false;
  const [isShow, setIsShow] = useState(false);
  const currentRef = useRef<HTMLDivElement>(null);

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

  const isShowCheck = _.find(selectedData, { value: data.value })
    ? true
    : false;

  const handleKeyDownOption = (e: KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.key === "ArrowUp") {
      console.log("38", e);
      // e.currentTarget.previousSibling &&
      //   e.currentTarget.previousSibling.focus();
      //currentRef.current.focus();
    }

    if (e.key === "ArrowDown") {
      console.log("40", e);
      //  e.currentTarget.nextSibling && e.currentTarget.nextSibling.focus();
      // currentRef.current.focus();
    }

    if (e.key === "Enter" || e.keyCode === 32) {
      console.log("Enter");
      handleAddselectOptions(data);
    }
  };

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
          className={st(classes.itemOptionTree, { isShowCheck })}
          onClick={() => handleAddselectOptions(data)}
          onKeyDown={handleKeyDownOption}
          tabIndex={0}
        >
          {isShowCheck ? <SquareTick /> : <Square />}
          {data.label}
        </div>
      </div>

      {hashChild && isShow && (
        <ul className={st(classes.listItemTree)}>
          {_.map(data.groupOptions, (opt, indexs) => (
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
              // index={indexs}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default memo(Options);
