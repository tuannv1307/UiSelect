import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import OutSideClick from "react-outside-click-handler";
import axios from "axios";
import {
  UiSelect,
  deleteOptionSelected,
  initDataUI,
  initFlatData,
  changeElementFocused,
  DATA_UI,
  setIsLoading,
} from "../../stores/ReduxStore";
import { arrdataRecursive, dataUiSelect, platArrData } from "../../constants";
import FilterOptions from "../FilterOptions";
import Options from "../Options";
import { st, classes } from "./SelectOptions.st.css";

export type SelectOptionsProps = {
  typeRender?: "single" | "tree";
  typeSelect?: "single" | "multi";
  typeGroup?: "group_single" | "group_tree";
  showLevel?: number;
  options?: {}[];
  isSearchOnline?: boolean;
  url?: string;
  arrSelectedData?: string[];
};
const SelectOptions = ({
  typeRender,
  options,
  typeSelect,
  typeGroup,
  showLevel,
  isSearchOnline,
  url,
  arrSelectedData,
}: SelectOptionsProps) => {
  let data: UiSelect = useSelector(
    (state: { ui_select: UiSelect }) => state.ui_select
  );

  const dispatch = useDispatch();

  let optionsSelect: any = options;
  const [isShowOptions, setisShowOptions] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [isKeyDowning, setIsKeyDowning] = useState(false);

  const isClearable = true;
  const isSearchable = true;
  const isDisabled = false;
  const isLoadingInput = true;

  const handleShowOptions = () => {
    setisShowOptions(!isShowOptions);
  };

  const handleKeyDownCloseOptions = (e?: KeyboardEvent<HTMLDivElement>) => {
    if (e && e.code === "Escape") setisShowOptions(false);
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

  const getOptions = useCallback(async () => {
    try {
      if (url) {
        const response = await axios.get(url);

        dispatch(initFlatData({ flatData: response.data }));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, url]);

  useEffect(() => {
    if (!isSearchOnline) {
      dispatch(initFlatData({ flatData: platArrData(optionsSelect) }));
    } else {
      getOptions();
    }
  }, [dispatch, optionsSelect, isSearchOnline, getOptions]);

  let platArrDataSe: any = data.flatData;

  optionsSelect = arrdataRecursive(optionsSelect);
  platArrDataSe = !isSearchOnline ? platArrData(optionsSelect) : platArrDataSe;

  let selectedData: any = data.selectedData;

  console.log(arrSelectedData);

  const hanldeOnchangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const label = e.target.value;
    setInputSearch(label);
  };

  if (inputSearch !== "") {
    platArrDataSe = _.filter(platArrDataSe, (item: DATA_UI) =>
      _.includes(_.toLower(item.label), _.toLower(inputSearch))
    );
  }

  useEffect(() => {
    if (inputSearch !== "") {
      dispatch(setIsLoading(true));
      setTimeout(() => {
        dispatch(setIsLoading(false));
      }, 2000);
    }
  }, [dispatch, inputSearch]);

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

  useEffect(() => {
    if (data.elementFocused) {
      const currentElement = data.elementFocused;
      $(currentElement)[0]?.focus({ preventScroll: true });
      let listWapperOptions = $("#wapper-list-option");

      const ElStart = $(currentElement).offset()?.top || 0;
      const ElHeight = $(currentElement).outerHeight() || 40;
      const ElEnd = ElStart + ElHeight;
      const WapStart = listWapperOptions.offset()?.top || 0;
      const WapHeight = listWapperOptions.outerHeight() || 40;
      const WapEnd = WapStart + WapHeight;
      const currentScroll = listWapperOptions.scrollTop() || 0;

      if (ElStart < WapStart) {
        listWapperOptions.scrollTop(currentScroll - (WapStart - ElStart));
      } else if (ElEnd > WapEnd) {
        listWapperOptions.scrollTop(currentScroll + (ElEnd - WapEnd));
      }
    }
  }, [data.elementFocused]);

  const handleKeyDown = (e?: KeyboardEvent<HTMLDivElement>) => {
    if (e && e.code === "ArrowUp") {
      e.preventDefault();
      setIsKeyDowning(true);
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
      e.preventDefault();
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

  useEffect(() => {
    if (!isShowOptions || !inputSearch)
      dispatch(changeElementFocused(undefined));
  }, [dispatch, inputSearch, isShowOptions]);

  useEffect(() => {
    if (isShowOptions) {
      $("#ui_select")[0]?.focus();
    }
  }, [isShowOptions]);

  return (
    <div
      className={st(classes.root)}
      onKeyUp={handleKeyDownCloseOptions}
      id="ui_select"
      tabIndex={-1}
      data-hook="UiSelect"
    >
      <OutSideClick onOutsideClick={handleOutsideCick}>
        {typeSelect === "multi" && _.size(selectedData) > 0 && (
          <div className={st(classes.delete)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className={st(classes.iconDelete, { isClearable }, "bi bi-x-lg")}
              onClick={(e: MouseEvent<HTMLOrSVGElement>) =>
                deleteOptionAllSelected(e, "CLEAR_ALL", "All")
              }
              viewBox="0 0 16 16"
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
                            width="22"
                            height="22"
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

        <div
          className={st(classes.options, { isShowOptions })}
          onKeyDown={handleKeyDown}
          onKeyUp={() => setIsKeyDowning(false)}
          id="options-focus"
        >
          <FilterOptions
            typeRender={typeRender}
            platArrData={platArrDataSe}
            inputSearch={inputSearch}
            hanldeOnchangeSearch={hanldeOnchangeSearch}
            isClearable={isClearable}
            isSearchable={isSearchable}
            isDisabled={isDisabled}
            isLoadingInput={isLoadingInput}
            isSearchOnline={isSearchOnline}
          />

          <Options
            typeRender={typeRender}
            platArrData={platArrDataSe}
            data={isSearchOnline ? [] : optionsSelect}
            handleCloseOptions={handleCloseOptions}
            typeSelect={typeSelect}
            showLevel={showLevel}
            isShowOption={false}
            inputSearch={inputSearch}
            isKeyDowning={isKeyDowning}
            typeGroup={typeGroup}
            isLoadingInput={isLoadingInput}
            isSearchOnline={isSearchOnline}
          />
        </div>
      </OutSideClick>
    </div>
  );
};

export default memo(SelectOptions);
