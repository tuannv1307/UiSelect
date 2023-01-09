import { memo, KeyboardEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import $ from "jquery";
import { st, classes } from "./OptionsTree.st.css";
import {
  DATA_UI,
  UiSelect,
  changeElementFocused,
  setIsInputSearchRef,
} from "../../../stores/ReduxStore";

export type OptionsTreeProps = {
  data?: any;
  typeRender?: "single" | "tree";
  typeSelect?: "single" | "multi";
  isSearchOnline?: boolean;
  handleCloseOptions?: () => void;
  handleAddselectOptions?: (option?: DATA_UI) => void;
  showLevel?: number;
  selectedData?: DATA_UI[];
  isKeyDowning?: boolean;
  typeGroup?: "group_single" | "group_tree";
};

const OptionsTree = ({
  data,
  typeRender,
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
  const isInputSearchRef = dataStore.isInputSearchRef;
  const dispatch = useDispatch();

  const getInitShowGroup = () => {
    if (showLevel) {
      if (data.level && data.level < showLevel && data.groupOptions) {
        return true;
      } else return false;
    }
    return;
  };

  const [isShowOption, setIsShowGroup] = useState(getInitShowGroup());

  const handleToglleOptions = () => {
    setIsShowGroup(!isShowOption);
  };

  const isShowCheck = _.find(selectedData, { value: data.value })
    ? true
    : false;

  const handleKeyDownOption = (e?: KeyboardEvent<HTMLDivElement>) => {
    if (e) {
      e.preventDefault();
      if ((e.key === "Enter" && !e.shiftKey) || e.code === "Space") {
        if (typeGroup === "group_tree") {
          !hashChild &&
            _.isFunction(handleAddselectOptions) &&
            handleAddselectOptions(data);
        } else {
          _.isFunction(handleAddselectOptions) && handleAddselectOptions(data);
        }
      }

      if (e.code === "Tab") {
        dispatch(setIsInputSearchRef(!isInputSearchRef));
      }

      if (e.shiftKey && e.key === "Enter") {
        setIsShowGroup(!isShowOption);
      }
    }
  };

  const element: HTMLElement | undefined =
    $(currentRef)[0].current || undefined;
  const isHover = currentRef && element === dataStore.elementFocused;

  const handleMouseMove = () => {
    if (currentRef && currentRef.current) {
      if (isKeyDowning !== undefined && !isKeyDowning) {
        dispatch(changeElementFocused(element));
      }
    }
  };

  const Square = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-square"
      viewBox="0 0 16 16"
    >
      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
    </svg>
  );

  const SquareCheck = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="currentColor"
      className="bi bi-check-square"
      viewBox="0 0 16 16"
    >
      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
      <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
    </svg>
  );

  return (
    <li className={st(classes.root)} data-hook="options-tree">
      <div
        className={st(classes.itemTrees, {
          isBorder: hashChild && isShowOption,
        })}
      >
        <span
          onClick={handleToglleOptions}
          className={st(classes.toggleItems)}
          data-hook="toggle-item-tree"
        >
          {isShowOption && hashChild && (
            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
              <path d="M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 Z M12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 Z M14.8496784,12.149704 C15.0449406,12.3449661 15.0449406,12.6615486 14.8496784,12.8568108 C14.6544163,13.0520729 14.3378338,13.0520729 14.1425716,12.8568108 L11.9963306,10.7102951 L9.85355339,12.8568108 C9.65829124,13.0520729 9.34170876,13.0520729 9.14644661,12.8568108 C8.95118446,12.6615486 8.95118446,12.3449661 9.14644661,12.149704 L11.9963306,9.29608154 L14.8496784,12.149704 Z"></path>
            </svg>
          )}
          {!isShowOption && hashChild && (
            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
              <path d="M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 Z M12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 Z M14.8496784,11.8563252 L11.9963306,14.7099476 L9.14644661,11.8563252 C8.95118446,11.661063 8.95118446,11.3444805 9.14644661,11.1492184 C9.34170876,10.9539562 9.65829124,10.9539562 9.85355339,11.1492184 L11.9963306,13.295734 L14.1425716,11.1492184 C14.3378338,10.9539562 14.6544163,10.9539562 14.8496784,11.1492184 C15.0449406,11.3444805 15.0449406,11.661063 14.8496784,11.8563252 Z"></path>
            </svg>
          )}
        </span>

        <div
          className={st(classes.itemOptionTree, {
            isShowCheck,
            isHover: isHover,
            isShowOption,
            isDisable: hashChild && typeGroup === "group_tree",
          })}
          onClick={() => {
            if (typeGroup === "group_tree") {
              return (
                !hashChild &&
                _.isFunction(handleAddselectOptions) &&
                handleAddselectOptions(data)
              );
            } else {
              return (
                _.isFunction(handleAddselectOptions) &&
                handleAddselectOptions(data)
              );
            }
          }}
          onKeyDown={handleKeyDownOption}
          tabIndex={0}
          onMouseMove={handleMouseMove}
          data-type={`option-${typeSelect}`}
          ref={currentRef}
          data-hook="item-options-tree"
        >
          {typeSelect === "single" && ""}

          {typeSelect === "multi" &&
            typeGroup === "group_tree" &&
            !hashChild && <>{isShowCheck ? <SquareCheck /> : <Square />}</>}

          {typeSelect === "multi" && !typeGroup && (
            <>{isShowCheck ? <SquareCheck /> : <Square />}</>
          )}

          <p>{data.label}</p>

          {typeGroup === "group_tree" && (
            <span
              className={st(classes.numberGroupTree, {
                isShowNumber: _.size(data?.groupOptions) > 0,
              })}
              data-hook="number-group-tree"
            >
              {data?.groupOptions &&
                _.size(data?.groupOptions) > 0 &&
                _.size(data?.groupOptions)}
            </span>
          )}
        </div>
      </div>
      {isShowOption && (
        <ul className={st(classes.listItemTree, { isShowOption })}>
          {_.map(data.groupOptions, (opt) => (
            <OptionsTree
              data={opt}
              key={opt.value}
              typeRender={typeRender}
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

export default memo(OptionsTree);
