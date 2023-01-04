import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  UiSelect,
  deleteOptionSelected,
  initDataUI,
  initFlatData,
  changeElementFocused,
  DATA_UI,
} from "../../stores/ReduxStore";
import { arrdataRecursive, dataUiSelect, platArrData } from "../../constants";
import Options from "../Options/Options";
import FilterOptions from "../FilterOptions/FilterOptions";
import OutSideClick from "react-outside-click-handler";

import { st, classes } from "./SelectOptions.st.css";

export type SelectOptionsProps = {
  typeRender?: "single" | "tree";
  typeSearch?: "online" | "offline";
  typeSelect?: "single" | "multi";
  showLevel?: number;
  options?: {}[];
};
const SelectOptions = ({
  typeRender,
  typeSearch,
  options,
  typeSelect,
  showLevel,
}: SelectOptionsProps) => {
  let data: UiSelect = useSelector(
    (state: { ui_select: UiSelect }) => state.ui_select
  );

  const dispatch = useDispatch();

  let optionsSelect: any = options;

  const [isShowOptions, setisShowOptions] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [isKeyDowning, setIsKeyDowning] = useState(false);

  const handleShowOptions = () => {
    setisShowOptions(!isShowOptions);
  };

  const handleKeyDownCloseOptions = (e?: KeyboardEvent<HTMLDivElement>) => {
    if (e && e.key === "Escape") setisShowOptions(!isShowOptions);
  };

  const handleOutsideCick = () => {
    setisShowOptions(false);
  };

  const handleCloseOptions = () => {
    setisShowOptions(false);
  };

  optionsSelect = data.data;

  useEffect(() => {
    dispatch(initDataUI({ data: dataUiSelect }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(initFlatData({ flatData: platArrData(optionsSelect) }));
  }, [dispatch, optionsSelect]);

  let platArrDataSe = data.flatData;

  optionsSelect = arrdataRecursive(optionsSelect);
  platArrDataSe = platArrData(optionsSelect);

  let selectedData: any = data.selectedData;

  const hanldeOnchangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const label = e.target.value;
    setInputSearch(label);
  };

  if (inputSearch !== "") {
    platArrDataSe = _.filter(
      platArrDataSe,
      (item: DATA_UI) =>
        _.indexOf(_.toLower(_.toString(item.label)), _.toLower(inputSearch)) >
        -1
    );
  }

  const deleteOptionAllSelected = (
    e?: MouseEvent<HTMLOrSVGElement>,
    type?: string,
    make?: string
  ) => {
    let arr: DATA_UI[] = [];
    if (type === "CLEAR_ALL" && make === "All") {
      dispatch(deleteOptionSelected(arr));
    }
    if (type === "DELETE_ITEM") {
      arr = _.cloneDeep(selectedData);
      arr = _.filter(arr, (opt) => opt.value !== make);
    }
    e && e.stopPropagation();
    dispatch(deleteOptionSelected(arr));
  };

  const scrollViewOption = ({ direction = "up" }) => {
    if (data?.elementFocused) {
      const currentElementRect = data.elementFocused.getBoundingClientRect();
      const wapperRect = $("#wapper-list-option")[0].getBoundingClientRect();
      // console.log(currentElementRect, wapperRect);
      if (direction === "up") {
        // console.log(
        //   currentElementRect.top - currentElementRect.height,
        //   wapperRect.top
        // );

        console.log($("#wapper-list-option").scrollTop(50));
        if (currentElementRect && currentElementRect.top - 5 < wapperRect.top) {
          // console.log(
          //   "Scroll",
          //   currentElementRect.top + currentElementRect.height,
          //   wapperRect.top
          // );
          // if (
          //   $(data.elementFocused)[0] !== undefined &&
          //   $(data.elementFocused)[0] !== null
          // )
          // $(data.elementFocused)[0]?.scrollIntoView({ block: "start" });
          // $(data.elementFocused)[0]?.scrollIntoView({});
          // console.log();
          // $(data.elementFocused).scrollIntoView({ block: "start" });
        }
      }
    }
  };

  const handleKeyDown = (e?: KeyboardEvent<HTMLDivElement>) => {
    if (e && e.code === "ArrowUp") {
      setIsKeyDowning(true);
      // scrollViewOption({ direction: "up" });
      if (data.elementFocused === undefined) {
        const listElement = $('[data-type="option"]');
        dispatch(changeElementFocused(listElement[_.size(listElement) - 1]));
      } else {
        const currentFocused: any = data.elementFocused;
        const listElement = $('[data-type="option"]');
        const currentIndex = _.findIndex(listElement, currentFocused);

        if (currentIndex === 0) {
          dispatch(changeElementFocused(listElement[_.size(listElement) - 1]));
        } else {
          dispatch(changeElementFocused(listElement[currentIndex - 1]));
        }
      }
    }

    if (e && e.code === "ArrowDown") {
      setIsKeyDowning(true);
      if (data.elementFocused === undefined) {
        const listElement = $('[data-type="option"]');
        dispatch(changeElementFocused(listElement[0]));
      } else {
        const currentFocused: any = data.elementFocused;
        const listElement = $('[data-type="option"]');
        const currentIndex = _.findIndex(listElement, currentFocused);
        if (currentIndex === _.size(listElement) - 1) {
          dispatch(changeElementFocused(listElement[0]));
        } else {
          dispatch(changeElementFocused(listElement[currentIndex + 1]));
        }
      }
    }
  };

  return (
    <div className={st(classes.root)} onKeyDown={handleKeyDownCloseOptions}>
      <OutSideClick onOutsideClick={handleOutsideCick}>
        {typeSelect === "multi" && _.size(selectedData) > 0 && (
          <div className={st(classes.delete)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className={st(classes.iconDelete, "bi bi-x-lg")}
              viewBox="0 0 16 16"
              onClick={(e: MouseEvent<HTMLOrSVGElement>) =>
                deleteOptionAllSelected(e, "CLEAR_ALL", "All")
              }
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </div>
        )}
        <div
          className={st(classes.showData, { isShowOptions })}
          onClick={handleShowOptions}
        >
          {_.size(selectedData) > 0 ? (
            <>
              {typeSearch === "offline" && (
                <div className={st(classes.listItemData)}>
                  {typeSelect === "single" && (
                    <>
                      {_.map(selectedData, (opt: DATA_UI) => (
                        <div key={opt?.value}>
                          <div
                            className={st(classes.itemData, {
                              isSingle: typeSelect === "single",
                            })}
                          >
                            {opt?.label}
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  {typeSelect === "multi" && (
                    <div>
                      {_.map(data.selectedData, (opt: DATA_UI) => (
                        <span key={opt?.value}>
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
                              onClick={(e) =>
                                deleteOptionAllSelected(
                                  e,
                                  "DELETE_ITEM",
                                  opt.value
                                )
                              }
                            >
                              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                            </svg>
                          </div>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className={st(classes.text)}>Select...</div>
          )}

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
          <div
            className={st(classes.options, { isShowOptions })}
            onKeyDown={handleKeyDown}
            onKeyUp={() => setIsKeyDowning(false)}
          >
            <FilterOptions
              typeRender={typeRender}
              platArrData={platArrDataSe}
              inputSearch={inputSearch}
              hanldeOnchangeSearch={hanldeOnchangeSearch}
            />

            <Options
              typeRender={typeRender}
              platArrData={platArrDataSe}
              data={optionsSelect}
              handleCloseOptions={handleCloseOptions}
              typeSelect={typeSelect}
              showLevel={showLevel}
              isShowOption={false}
              inputSearch={inputSearch}
              setisShowOptions={setisShowOptions}
              isKeyDowning={isKeyDowning}
            />
          </div>
        )}
      </OutSideClick>
    </div>
  );
};

export default SelectOptions;
