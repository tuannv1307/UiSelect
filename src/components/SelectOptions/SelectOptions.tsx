import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { UiSelect, initDataUI } from "../../stores/ReduxStore";
import { dataUiSelect } from "../../constants";
import Options from "../Options/Options";
import { st, classes } from "./SelectOptions.st.css";
//import OutSideClick from "react-outside-click-handler";

export type SelectOptionsProps = {
  typeRender?: "single" | "tree";
  typeSearch?: "online" | "offline";
  options?: {}[];
};
const SelectOptions = ({
  typeRender,
  typeSearch,
  options,
}: SelectOptionsProps) => {
  let data: UiSelect = useSelector(
    (state: { ui_select: UiSelect }) => state.ui_select
  );

  const dispatch = useDispatch();

  let optionsSelect: any = options;

  useEffect(() => {
    dispatch(initDataUI({ data: dataUiSelect }));
  }, [dispatch]);

  const [isShowOptions, setisShowOptions] = useState(false);

  const handleShowOptions = () => {
    setisShowOptions(!isShowOptions);
  };

  const handleOutsideCick = () => {
    setisShowOptions(false);
  };

  optionsSelect = data.data;

  return (
    <div className={st(classes.root)}>
      {/* <OutSideClick onOutsideClick={handleOutsideCick}> */}
      <div
        className={st(classes.showData, { isShowOptions })}
        onClick={handleShowOptions}
      >
        <div className={st(classes.listItemData)}>
          {typeSearch === "offline" && (
            <>
              {typeRender === "single" && (
                <div
                  className={st(classes.itemData, {
                    isSingle: typeRender === "single",
                  })}
                >
                  {_.size(optionsSelect) > 0 &&
                    _.map(optionsSelect, (opt) => <>{opt.label}</>)}
                </div>
              )}

              {typeRender === "tree" && (
                <div
                  className={st(classes.itemData, {
                    isTree: typeRender === "tree",
                  })}
                >
                  {_.size(optionsSelect) > 0 &&
                    _.map(optionsSelect, (opt) => <>{opt.label}</>)}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className={st(classes.closeItem, "bi bi-x-lg")}
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                  </svg>
                </div>
              )}
            </>
          )}
        </div>
        <button className={st(classes.toggleSelect, { isShowOptions })}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className={st(classes.svgToggleDown, "bi bi-caret-down-fill")}
            viewBox="0 0 16 16"
          >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
        </button>
      </div>
      {/* </OutSideClick> */}
      {isShowOptions && (
        <Options typeRender={typeRender} optionsSelect={optionsSelect} />
      )}
    </div>
  );
};

export default SelectOptions;
