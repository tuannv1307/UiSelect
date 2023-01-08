import { KeyboardEvent, memo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import $ from "jquery";
import {
  DATA_UI,
  UiSelect,
  changeElementFocused,
  setIsInputSearchRef,
} from "../../../stores/ReduxStore";
import { st, classes } from "./ItemOption.st.css";

export type ItemOptionProps = {
  opt: DATA_UI;
  handleAddselectOptions?: (e: DATA_UI) => void;
  typeRender?: "single" | "tree";
  typeSelect?: "single" | "multi";
  typeGroup?: "group_single" | "group_tree";
  isSearchOnline?: boolean;
};

const ItemOption = ({
  opt,
  handleAddselectOptions,
  typeRender,
  typeGroup,
  isSearchOnline,
  typeSelect,
}: ItemOptionProps) => {
  const dataStore: UiSelect = useSelector(
    (state: { ui_select: UiSelect }) => state.ui_select
  );
  const selectedData: any = dataStore.selectedData;
  const currentRef = useRef<HTMLDivElement>(null);
  const isInputSearchRef = dataStore.isInputSearchRef;
  const hashChild = opt.groupOptions ? true : false;

  const dispatch = useDispatch();

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
      dispatch(setIsInputSearchRef(!isInputSearchRef));
    }
  };

  const element: HTMLDivElement | null = $(currentRef)[0].current;
  const isHover = currentRef && element === dataStore.elementFocused;

  const handleOnMouseMove = () => {
    if (currentRef && currentRef.current) {
      dispatch(changeElementFocused(element));
    }
  };

  return (
    <div
      className={st(classes.root, {
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
      data-type={
        typeGroup === "group_single" && hashChild ? "" : `option-${typeSelect}`
      }
    >
      {typeRender === "single" && ""}

      {isSearchOnline && typeRender === "single" && (
        <>
          {_.find(selectedData, { value: opt.value }) ? (
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
          ) : (
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
          )}
        </>
      )}

      {typeRender === "tree" && (
        <>
          {_.find(selectedData, { value: opt.value }) ? (
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
          ) : (
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

export default memo(ItemOption);
