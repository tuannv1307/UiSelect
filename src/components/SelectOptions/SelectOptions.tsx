import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  memo,
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
} from "../../stores/ReduxStore";
import { arrdataRecursive, dataUiSelect, platArrData } from "../../constants";
import FilterOptions from "../FilterOptions/FilterOptions";
import Options from "../Options/Options";
import { ReactComponent as DeleteIcon } from "./../svgIcon/DeleteIcon.svg";
import { ReactComponent as ToggleSelectIcon } from "./../svgIcon/ToggleSelectIcon.svg";
import { st, classes } from "./SelectOptions.st.css";

export type SelectOptionsProps = {
  typeRender?: "single" | "tree";
  typeSearch?: "online" | "offline";
  typeSelect?: "single" | "multi";
  typeGroup?: "group_single" | "group_tree";
  showLevel?: number;
  options?: {}[];
  isSearchOnline?: boolean;
  url?: string;
};
const SelectOptions = ({
  typeRender,
  typeSearch,
  options,
  typeSelect,
  typeGroup,
  showLevel,
  isSearchOnline,
  url,
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
    if (e && e.code === "Escape") setisShowOptions(false);
  };

  useEffect(() => {
    if (isShowOptions) {
      $("#ui_select")[0]?.focus();
    }
  }, [isShowOptions]);

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

  const getOptions = async () => {
    try {
      if (url) {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  getOptions();

  useEffect(() => {
    if (!isShowOptions || !inputSearch)
      dispatch(changeElementFocused(undefined));
  }, [dispatch, inputSearch, isShowOptions]);

  return (
    <div
      className={st(classes.root)}
      onKeyUp={handleKeyDownCloseOptions}
      id="ui_select"
      tabIndex={-1}
    >
      <OutSideClick onOutsideClick={handleOutsideCick}>
        {typeSelect === "multi" && _.size(selectedData) > 0 && (
          <div className={st(classes.delete)}>
            <DeleteIcon
              className={st(classes.iconDelete)}
              onClick={(e: MouseEvent<HTMLOrSVGElement>) =>
                deleteOptionAllSelected(e, "CLEAR_ALL", "All")
              }
            />
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

                          <DeleteIcon
                            className={st(classes.closeItem)}
                            onClick={(e) =>
                              deleteOptionAllSelected(
                                e,
                                "DELETE_ITEM",
                                opt.value
                              )
                            }
                          />
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
            <ToggleSelectIcon className={st(classes.svgToggleDown)} />
          </button>
        </div>

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
            isKeyDowning={isKeyDowning}
            typeGroup={typeGroup}
          />
        </div>
      </OutSideClick>
    </div>
  );
};

export default memo(SelectOptions);
