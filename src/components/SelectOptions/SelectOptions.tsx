import React, { ChangeEvent, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  UiSelect,
  addSelectoptions,
  deleteOptionSelected,
  initDataUI,
} from "../../stores/ReduxStore";
import { arrdataRecursive, dataUiSelect, platArrData } from "../../constants";
import Options from "../Options/Options";
import FilterOptions from "../FilterOptions/FilterOptions";
//import OutSideClick from "react-outside-click-handler";

import { st, classes } from "./SelectOptions.st.css";

export type SelectOptionsProps = {
  typeRender?: "single" | "tree";
  typeSearch?: "online" | "offline";
  typeSelect?: "single" | "multi";
  options?: {}[];
};
const SelectOptions = ({
  typeRender,
  typeSearch,
  options,
  typeSelect,
}: SelectOptionsProps) => {
  let data: UiSelect = useSelector(
    (state: { ui_select: UiSelect }) => state.ui_select
  );

  const dispatch = useDispatch();

  let optionsSelect: any = options;

  const [isShowOptions, setisShowOptions] = useState(false);
  const [inputSearch, setInputSearch] = useState("");

  const handleShowOptions = () => {
    setisShowOptions(!isShowOptions);
  };

  const handleOutsideCick = () => {
    setisShowOptions(false);
  };
  const handleCloseOptions = () => {
    setisShowOptions(false);
  };
  optionsSelect = data.data;
  // console.log("🚀 ~ file: SelectOptions.tsx:56 ~ optionsSelect", optionsSelect);
  // recursiveCalculator(data.data);
  // console.log(
  //   "🚀 ~ file: SelectOptions.tsx:52 ~ abc",

  // );

  //  console.log(arrdataRecursive(dataUiSelect));
  useEffect(() => {
    dispatch(initDataUI({ data: dataUiSelect }));
  }, [dispatch]);

  let platArrDataSe = platArrData(optionsSelect);

  const hanldeOnchangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const label = e.target.value;
    setInputSearch(label);
  };

  if (inputSearch !== "") {
    platArrDataSe = _.filter(
      platArrData(optionsSelect),
      (item) =>
        _.indexOf(_.toLower(_.toString(item.label)), _.toLower(inputSearch)) >
        -1
    );
  }

  const haveItemSelected = _.some(platArrDataSe, ["isSelected", true]);

  const deleteOptionAllSelected = (type?: string, make?: string) => {
    let arr: any = [];
    if (type === "CLEAR_ALL" && make === "All") {
      arr = _.cloneDeep(platArrDataSe);
      arr = _.map(arr, (opt) => ({ ...opt, isSelected: false }));
      dispatch(deleteOptionSelected(arr));
    }
    if (type === "DELETE_ITEM") {
      arr = _.cloneDeep(platArrDataSe);
      arr = _.map(arr, (opt) =>
        opt.value === make ? { ...opt, isSelected: false } : opt
      );
    }

    dispatch(deleteOptionSelected(arr));
  };
  return (
    <div className={st(classes.root)}>
      {/* <OutSideClick onOutsideClick={handleOutsideCick}> */}
      {typeSelect === "multi" && haveItemSelected && (
        <div className={st(classes.delete)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className={st(classes.iconDelete, "bi bi-x-lg")}
            viewBox="0 0 16 16"
            onClick={() => deleteOptionAllSelected("CLEAR_ALL", "All")}
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </div>
      )}
      <div
        className={st(classes.showData, { isShowOptions })}
        onClick={handleShowOptions}
      >
        <div className={st(classes.listItemData)}>
          {typeSearch === "offline" && (
            <>
              {typeSelect === "single" && (
                <>
                  {_.map(optionsSelect, (opt) => (
                    <div key={opt?.value}>
                      {opt?.isSelected && (
                        <div
                          className={st(classes.itemData, {
                            isSingle: typeSelect === "single",
                          })}
                        >
                          {opt?.label}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}

              {typeSelect === "multi" && (
                <>
                  {_.map(optionsSelect, (opt) => (
                    <span key={opt?.value}>
                      {opt?.isSelected && (
                        <div
                          className={st(classes.itemData, {
                            isMulti: typeSelect === "multi",
                          })}
                        >
                          {opt?.label}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className={st(classes.closeItem, "bi bi-x-lg")}
                            viewBox="0 0 16 16"
                            onClick={() =>
                              deleteOptionAllSelected("DELETE_ITEM", opt.value)
                            }
                          >
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                          </svg>
                        </div>
                      )}
                    </span>
                  ))}
                </>
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
      {isShowOptions && (
        <div className={st(classes.options)}>
          <FilterOptions
            typeRender={typeRender}
            // optionsSelect={optionsSelect}
            platArrData={platArrDataSe}
            inputSearch={inputSearch}
            hanldeOnchangeSearch={hanldeOnchangeSearch}
          />

          <Options
            typeRender={typeRender}
            platArrData={platArrDataSe}
            data={arrdataRecursive(optionsSelect)}
            handleCloseOptions={handleCloseOptions}
            typeSelect={typeSelect}
            deleteOptionAllSelected={deleteOptionAllSelected}
          />
        </div>
      )}
    </div>
  );
};

export default SelectOptions;
