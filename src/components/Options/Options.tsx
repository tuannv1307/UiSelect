import { memo, KeyboardEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import $ from "jquery";
import {
  DATA_UI,
  UiSelect,
  addSelectoptions,
  changeElementFocused,
  setRefInputSearch,
} from "../../stores/ReduxStore";
import { ReactComponent as ToggleUpIcon } from "./../svgIcon/ToggleUpIcon.svg";
import { ReactComponent as ToggleDownIcon } from "./../svgIcon/ToggleDownIcon.svg";
import { ReactComponent as SquareIcon } from "./../svgIcon/SquareIcon.svg";
import { ReactComponent as SquareCheckIcon } from "./../svgIcon/SquareCheckIcon.svg";
import { st, classes } from "./Options.st.css";

export type OptionsProps = {
  data: DATA_UI[];
  typeRender?: "single" | "tree";
  typeSelect?: "single" | "multi";
  platArrData?: DATA_UI[];
  handleCloseOptions?: () => void;
  deleteOptionAllSelected?: () => void;
  showLevel?: number;
  isShowOption?: boolean;
  isKeyDowning?: boolean;
  inputSearch?: string;
  typeGroup?: "group_single" | "group_tree";
};

const Options = ({
  typeRender,
  platArrData,
  handleCloseOptions,
  typeSelect,
  data,
  showLevel,
  isKeyDowning,
  inputSearch,
  typeGroup,
}: OptionsProps) => {
  const dataStore: UiSelect = useSelector(
    (state: { ui_select: UiSelect }) => state.ui_select
  );
  let selectedData: any = dataStore.selectedData;
  const ulWapperRef = useRef<any>(null);

  const dispatch = useDispatch();

  const handleAddselectOptions = (option?: DATA_UI) => {
    const currentOption = _.cloneDeep(option);
    if (currentOption) {
      currentOption["groupOptions"] = [];
      if (typeSelect === "single") {
        selectedData = _.cloneDeep(selectedData);
        selectedData = [currentOption];
        dispatch(addSelectoptions(selectedData));
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
    }
  };

  return (
    <div className={st(classes.root)}>
      {typeRender === "single" && (
        <>
          {typeGroup !== "group_single" && typeGroup !== "group_tree" ? (
            <div
              className={st(classes.listItemOptions)}
              id="wapper-list-option"
            >
              {_.map(platArrData, (opt) => (
                <ItemOption
                  opt={opt}
                  handleAddselectOptions={handleAddselectOptions}
                  typeRender={typeRender}
                  typeSelect={typeSelect}
                  key={opt.value}
                />
              ))}
            </div>
          ) : (
            ""
          )}

          {typeGroup === "group_single" ? (
            <div
              className={st(classes.listItemOptions)}
              id="wapper-list-option"
            >
              {_.map(platArrData, (opt) => (
                <ItemOption
                  opt={opt}
                  handleAddselectOptions={handleAddselectOptions}
                  typeRender={typeRender}
                  typeSelect={typeSelect}
                  typeGroup={typeGroup}
                  key={opt.value}
                />
              ))}
            </div>
          ) : (
            ""
          )}
        </>
      )}

      {typeRender === "tree" &&
        typeGroup !== "group_single" &&
        typeGroup !== "group_tree" && (
          <>
            {inputSearch !== "" ? (
              <div
                className={st(classes.listItemOptions)}
                id="wapper-list-option"
              >
                {_.map(platArrData, (opt) => (
                  <ItemOption
                    opt={opt}
                    handleAddselectOptions={handleAddselectOptions}
                    typeRender={typeRender}
                    typeSelect={typeSelect}
                    key={opt.value}
                  />
                ))}
              </div>
            ) : (
              <ul
                className={st(classes.listItemOptionsTree)}
                ref={ulWapperRef}
                id="wapper-list-option"
              >
                {_.map(data, (opt) => (
                  <OptionsTree
                    isKeyDowning={isKeyDowning}
                    data={opt}
                    key={opt.value}
                    typeRender={typeRender}
                    platArrData={platArrData}
                    typeSelect={typeSelect}
                    handleAddselectOptions={handleAddselectOptions}
                    showLevel={showLevel}
                    selectedData={selectedData}
                  />
                ))}
              </ul>
            )}
          </>
        )}

      {typeRender === "tree" && typeGroup === "group_tree" && (
        <>
          {inputSearch !== "" ? (
            <div className={st(classes.listItemOptions)}>
              {_.map(platArrData, (opt) => (
                <ItemOption
                  opt={opt}
                  handleAddselectOptions={handleAddselectOptions}
                  typeRender={typeRender}
                  typeSelect={typeSelect}
                  key={opt.value}
                />
              ))}
            </div>
          ) : (
            <ul
              className={st(classes.listItemOptionsTree)}
              ref={ulWapperRef}
              id="wapper-list-option"
            >
              {_.map(data, (opt) => (
                <OptionsTree
                  isKeyDowning={isKeyDowning}
                  data={opt}
                  key={opt.value}
                  typeRender={typeRender}
                  platArrData={platArrData}
                  typeSelect={typeSelect}
                  handleAddselectOptions={handleAddselectOptions}
                  showLevel={showLevel}
                  selectedData={selectedData}
                  typeGroup={typeGroup}
                />
              ))}
            </ul>
          )}
        </>
      )}

      <div className={st(classes.done)}>
        <button onClick={handleCloseOptions}>Done</button>
      </div>
    </div>
  );
};

export type ItemOptionProps = {
  opt: DATA_UI;
  handleAddselectOptions?: (e: DATA_UI) => void;
  typeRender?: "single" | "tree";
  typeSelect?: "single" | "multi";
  typeGroup?: "group_single" | "group_tree";
};

const ItemOption = ({
  opt,
  handleAddselectOptions,
  typeRender,
  typeGroup,
}: ItemOptionProps) => {
  const dataStore: UiSelect = useSelector(
    (state: { ui_select: UiSelect }) => state.ui_select
  );
  let selectedData: any = dataStore.selectedData;
  const currentRef = useRef<HTMLDivElement>(null);
  let refInputSearch = dataStore.refInputSearch;

  const dispatch = useDispatch();

  const hashChild = opt.groupOptions ? true : false;

  const handleKeyDown = (e?: KeyboardEvent<HTMLDivElement>) => {
    if ((e && e.key === "Enter") || e?.code === "Space") {
      e.preventDefault();
      if (typeGroup === "group_single") {
        !hashChild && handleAddselectOptions && handleAddselectOptions(opt);
      } else {
        handleAddselectOptions && handleAddselectOptions(opt);
      }
    }

    if (e && e.code === "Tab") {
      e.preventDefault();
      dispatch(setRefInputSearch(!refInputSearch));
    }
  };

  let element: any = $(currentRef)[0].current;
  let isHover = currentRef && element === dataStore.elementFocused;

  const handleOnMouseMove = () => {
    if (currentRef && currentRef.current) {
      dispatch(changeElementFocused(element));
    }
  };

  return (
    <div
      className={st(classes.itemOption, {
        active: _.find(selectedData, { value: opt.value }) ? true : false,
        isHover,
        isDisable: _.size(opt.groupOptions) > 0 && typeGroup === "group_single",
      })}
      onClick={() => {
        if (typeGroup === "group_single") {
          return (
            handleAddselectOptions && !hashChild && handleAddselectOptions(opt)
          );
        } else {
          return handleAddselectOptions && handleAddselectOptions(opt);
        }
      }}
      key={opt.value}
      onMouseMove={handleOnMouseMove}
      onKeyDown={handleKeyDown}
      ref={currentRef}
      tabIndex={0}
      data-type={`${typeGroup === "group_single" && hashChild ? "" : "option"}`}
    >
      {typeRender === "single" ? (
        ""
      ) : (
        <>
          {_.find(selectedData, { value: opt.value }) ? (
            <SquareCheckIcon />
          ) : (
            <SquareIcon />
          )}
        </>
      )}

      <p>{opt.label} </p>

      {typeRender === "single" ? (
        ""
      ) : (
        <span className={st(classes.itemPath)}>
          <>{opt.path !== " / " && opt.path}</>
        </span>
      )}

      {typeGroup === "group_single" ? (
        <span className={st(classes.numberGroup)}>
          {opt?.groupOptions && _.size(opt?.groupOptions)}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export type OptionsTreeProps = {
  data?: any;
  typeRender?: "single" | "tree";
  typeSelect?: "single" | "multi";
  platArrData?: DATA_UI[];
  handleCloseOptions?: () => void;
  handleAddselectOptions?: (e: any) => void;
  showLevel?: number;
  selectedData?: DATA_UI[];
  isKeyDowning?: boolean;
  typeGroup?: "group_single" | "group_tree";
};

const OptionsTree = ({
  data,
  typeRender,
  platArrData,
  typeSelect,
  handleAddselectOptions,
  showLevel,
  selectedData,
  isKeyDowning,
  typeGroup,
}: OptionsTreeProps) => {
  const dataStore: UiSelect = useSelector(
    (state: { ui_select: UiSelect }) => state.ui_select
  );
  const hashChild = data.groupOptions ? true : false;
  const currentRef = useRef<HTMLDivElement>(null);
  let refInputSearch = dataStore.refInputSearch;
  const dispatch = useDispatch();

  const getInitShowGroup = () => {
    if (showLevel) {
      if (data.level && data.level < showLevel && data.groupOptions) {
        return true;
      } else return false;
    }
    return;
  };

  const [isShowGroup, setIsShowGroup] = useState(getInitShowGroup());

  // let platArrDatas: any = dataStore.flatData;

  const handleToglleOptions = () => {
    setIsShowGroup(!isShowGroup);
    // let newPlatData = _.cloneDeep(platArrDatas);

    // newPlatData = _.map(newPlatData, (opt: any) =>
    //   opt.value === data.value
    //     ? { ...opt, isShowOption: !opt.isShowOption }
    //     : opt
    // );

    // dispatch(setShowOptions(newPlatData));
  };

  const isShowCheck = _.find(selectedData, { value: data.value })
    ? true
    : false;

  // const optionShow = _.find(platArrDatas, (opt) => opt.value === data.value);

  // const isShowOptionData = optionShow.isShowOption ? true : false;

  const handleKeyDownOption = (e?: KeyboardEvent<HTMLDivElement>) => {
    if (e) {
      e.preventDefault();
      if (e.key === "Enter" || e.code === "Space") {
        handleAddselectOptions && handleAddselectOptions(data);
      }

      if (e.code === "Tab") {
        dispatch(setRefInputSearch(!refInputSearch));
      }
    }
  };

  let element: any = $(currentRef)[0].current;
  let isHover = currentRef && element === dataStore.elementFocused;

  const handleMouseMove = () => {
    if (currentRef && currentRef.current) {
      if (isKeyDowning !== undefined && !isKeyDowning) {
        dispatch(changeElementFocused(element));
      }
    }
  };

  return (
    <li className={st(classes.optionsTree)}>
      <div className={st(classes.itemTrees)}>
        <span onClick={handleToglleOptions} className={st(classes.toggleItems)}>
          {isShowGroup && hashChild && <ToggleUpIcon />}
          {!isShowGroup && hashChild && <ToggleDownIcon />}
        </span>

        <div
          className={st(classes.itemOptionTree, {
            isShowCheck,
            isHover: isHover,
          })}
          onClick={() => handleAddselectOptions && handleAddselectOptions(data)}
          onKeyDown={handleKeyDownOption}
          tabIndex={0}
          onMouseMove={handleMouseMove}
          data-type="option"
          ref={currentRef}
        >
          {isShowCheck ? <SquareCheckIcon /> : <SquareIcon />}
          {data.label}

          {typeGroup === "group_tree" && (
            <span
              className={st(classes.numberGroupTree, {
                isShowNumber: _.size(data?.groupOptions) > 0,
              })}
            >
              {data?.groupOptions &&
                _.size(data?.groupOptions) > 0 &&
                _.size(data?.groupOptions)}
            </span>
          )}
        </div>
      </div>

      {isShowGroup && (
        <ul className={st(classes.listItemTree)}>
          {_.map(data.groupOptions, (opt) => (
            <OptionsTree
              data={opt}
              key={opt.value}
              typeRender={typeRender}
              platArrData={platArrData}
              typeSelect={typeSelect}
              handleAddselectOptions={handleAddselectOptions}
              showLevel={showLevel}
              selectedData={selectedData}
              isKeyDowning={isKeyDowning}
              typeGroup={typeGroup}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default memo(Options);
