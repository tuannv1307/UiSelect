import {
  memo,
  useEffect,
  useState,
  KeyboardEvent,
  useRef,
  MouseEvent,
} from "react";
import _ from "lodash";
import $ from "jquery";
import {
  DATA_UI,
  UiSelect,
  addSelectoptions,
  changeElementFocused,
  setRefInputSearch,
} from "../../stores/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ToggleUp } from "./svgIcon/ToggleUp.svg";
import { ReactComponent as ToggleDown } from "./svgIcon/ToggleDown.svg";
import { ReactComponent as Square } from "./svgIcon/Square.svg";
import { ReactComponent as SquareTick } from "./svgIcon/SquareTick.svg";
import { st, classes } from "./Options.st.css";

export type OptionsProps = {
  data: DATA_UI[];
  typeRender?: "single" | "tree";
  typeSelect?: "single" | "multi";
  options?: DATA_UI[];
  platArrData?: DATA_UI[];
  handleCloseOptions?: () => void;
  deleteOptionAllSelected?: () => void;
  showLevel?: number;
  isShowOption?: boolean;
  isKeyDowning?: boolean;
  inputSearch?: string;
  setisShowOptions: (a: boolean) => void;
  typeGroup?: "group_single" | "group_tree";
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
  isKeyDowning,
  inputSearch,
  setisShowOptions,
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

  // useEffect(() => {
  //   if (ulWapperRef && dataStore.elementFocused) {
  //     const currentElementRect =
  //       dataStore.elementFocused.getBoundingClientRect();
  //     const wapperRect = ulWapperRef.current.getBoundingClientRect();

  //     if () {

  //     }
  //     // const abc = $(dataStore.elementFocused).getBoundingClientRect();
  //     // // abc.get;
  //     console.log(currentElementRect, wapperRect);
  //   }

  //   // currentRef.current?.scrollIntoView({ block: "center" });
  //   // if (isHover && currentRef && currentRef.current) {
  //   // }
  // }, [dataStore.elementFocused]);

  return (
    <div className={st(classes.root)}>
      <>
        {typeRender === "single" && (
          <>
            {typeGroup !== "group_single" && typeGroup !== "group_tree" ? (
              <div className={st(classes.listItemOptions)}>
                {_.map(platArrData, (opt) => (
                  <ItemOption
                    opt={opt}
                    handleAddselectOptions={handleAddselectOptions}
                    typeRender={typeRender}
                    typeSelect={typeSelect}
                  />
                ))}
              </div>
            ) : (
              ""
            )}

            {typeGroup === "group_single" ? (
              <div className={st(classes.listItemOptions)}>
                {_.map(platArrData, (opt) => (
                  <ItemOption
                    opt={opt}
                    handleAddselectOptions={handleAddselectOptions}
                    typeRender={typeRender}
                    typeSelect={typeSelect}
                    typeGroup={typeGroup}
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
                <div className={st(classes.listItemOptions)}>
                  {_.map(platArrData, (opt) => (
                    <ItemOption
                      opt={opt}
                      handleAddselectOptions={handleAddselectOptions}
                      typeRender={typeRender}
                      typeSelect={typeSelect}
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
          )}

        {typeRender === "tree" && typeGroup === "group_single" && (
          <>
            {inputSearch !== "" ? (
              <div className={st(classes.listItemOptions)}>
                {_.map(platArrData, (opt) => (
                  <ItemOption
                    opt={opt}
                    handleAddselectOptions={handleAddselectOptions}
                    typeRender={typeRender}
                    typeSelect={typeSelect}
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
        )}
      </>
      <div className={st(classes.done)}>
        <button onClick={() => setisShowOptions(false)}>Done</button>
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
  typeSelect,
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
    if (e && e.key === "Enter") {
      if (typeGroup === "group_single") {
        !hashChild && handleAddselectOptions && handleAddselectOptions(opt);
      } else {
        handleAddselectOptions && handleAddselectOptions(opt);
      }
    }

    if (e && e.key === "Tab") {
      dispatch(setRefInputSearch(!refInputSearch));
    }
  };

  const handleOnMouseEnter = (
    e?: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement> | any
  ) => {
    e.preventDefault();
    if (currentRef && currentRef.current) {
      // currentRef.current.focus();
      e && handleKeyDown(e);
      dispatch(changeElementFocused(abc));
    }
  };

  const handleOnMouseLeave = (e?: MouseEvent<HTMLDivElement>) => {
    e && e.preventDefault();
    dispatch(changeElementFocused([]));
  };

  let abc: any = $(currentRef)[0].current;
  let isHover = currentRef && abc === dataStore.elementFocused;

  // useEffect(() => {
  //   if (isHover && currentRef && currentRef.current) {
  //     currentRef.current.focus();
  //   }
  // }, [isHover]);

  const isTypeGroup = typeGroup === "group_single" ? true : false;

  return (
    <>
      {typeGroup !== "group_single" && typeGroup !== "group_tree" && (
        <div
          className={st(classes.itemOption, {
            active: _.find(selectedData, { value: opt.value }) ? true : false,
            isHover,
          })}
          onClick={() => handleAddselectOptions && handleAddselectOptions(opt)}
          key={opt.value}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onKeyDown={handleKeyDown}
          ref={currentRef}
          tabIndex={0}
          data-type="option"
        >
          <>
            {typeRender === "single" ? (
              ""
            ) : (
              <>
                {_.find(selectedData, { value: opt.value }) ? (
                  <SquareTick />
                ) : (
                  <Square />
                )}
              </>
            )}

            {opt.label}
            <span className={st(classes.itemPath)}>
              {typeRender === "single" ? (
                ""
              ) : (
                <>{opt.path !== " / " && opt.path}</>
              )}
            </span>
          </>
        </div>
      )}

      {typeGroup === "group_single" && (
        <div
          className={st(classes.itemOption, {
            active: _.find(selectedData, { value: opt.value }) ? true : false,
            isHover,
            isDisable: _.size(opt.groupOptions) > 0,
          })}
          onClick={() =>
            !hashChild && handleAddselectOptions && handleAddselectOptions(opt)
          }
          key={opt.value}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onKeyDown={handleKeyDown}
          ref={currentRef}
          tabIndex={0}
          data-type={`${hashChild ? "" : "option"}`}
        >
          <>
            {typeRender === "single" ? (
              ""
            ) : (
              <>
                {_.find(selectedData, { value: opt.value }) ? (
                  <SquareTick />
                ) : (
                  <Square />
                )}
              </>
            )}
            <p>{opt.label} </p>

            <span className={st(classes.numberGroup)}>
              {opt?.groupOptions && _.size(opt?.groupOptions)}
            </span>
          </>
        </div>
      )}
    </>
  );
};

export type OptionsTreeProps = {
  data?: any;
  typeRender?: "single" | "tree";
  typeSelect?: "single" | "multi";
  options?: any;
  platArrData?: DATA_UI[];
  handleCloseOptions?: () => void;
  handleAddselectOptions?: (e: any) => void;
  showLevel?: number;
  selectedData?: DATA_UI[];
  index?: string;
  isKeyDowning?: boolean;
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
  isKeyDowning,
}: OptionsTreeProps) => {
  const dataStore: UiSelect = useSelector(
    (state: { ui_select: UiSelect }) => state.ui_select
  );

  const hashChild = data.groupOptions ? true : false;
  const [isShow, setIsShow] = useState(false);
  const currentRef = useRef<HTMLDivElement>(null);

  let refInputSearch = dataStore.refInputSearch;

  const dispatch = useDispatch();

  useEffect(() => {
    if (hashChild && showLevel && showLevel > data.level) {
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

  const handleKeyDownOption = (e?: KeyboardEvent<HTMLDivElement>) => {
    if (e) {
      if (e.key === "Enter" || e.key === "Space") {
        e.preventDefault();
        handleAddselectOptions && handleAddselectOptions(data);
      }

      if (e.key === "Tab") {
        e.preventDefault();
        dispatch(setRefInputSearch(!refInputSearch));
      }
    }
  };

  let abc: any = $(currentRef)[0].current;
  let isHover = currentRef && abc === dataStore.elementFocused;

  const handleMouseEnter = (
    e?: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement> | any
  ) => {
    if (e && currentRef && currentRef.current) {
      if (isKeyDowning !== undefined && !isKeyDowning) {
        handleKeyDownOption(e);
        dispatch(changeElementFocused(abc));
        // currentRef.current.focus();
      }

      // e.preventDefault();
      // e.stopPropagation();
      //
    }
  };

  const handleMouseLeave = (e?: MouseEvent<HTMLDivElement>) => {
    if (e) {
      // e.preventDefault();
      // e.stopPropagation();
      // dispatch(changeElementFocused([]));
    }
  };

  // useEffect(() => {
  //   console.log();

  //   // currentRef.current?.scrollIntoView({ block: "center" });
  //   // if (isHover && currentRef && currentRef.current) {
  //   // }
  // }, [isHover]);

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
          className={st(classes.itemOptionTree, {
            isShowCheck,
            isHover: isHover,
          })}
          onClick={() => handleAddselectOptions && handleAddselectOptions(data)}
          onKeyDown={handleKeyDownOption}
          tabIndex={0}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-type="option"
          ref={currentRef}
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
              isKeyDowning={isKeyDowning}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default memo(Options);
