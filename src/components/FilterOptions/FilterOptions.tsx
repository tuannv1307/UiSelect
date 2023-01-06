import { ChangeEvent, memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  DATA_UI,
  UiSelect,
  changeElementFocused,
} from "../../stores/ReduxStore";
import { st, classes } from "./FilterOptions.st.css";

export type FilterOptionsProps = {
  typeRender?: "single" | "tree";
  typeSearch?: "online" | "offline";
  isSearchOnline?: boolean;
  platArrData?: DATA_UI[];
  inputSearch?: string;
  hanldeOnchangeSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  isClearable?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  isLoadingInput?: boolean;
};

const FilterOptions = ({
  platArrData,
  inputSearch,
  hanldeOnchangeSearch,
  isSearchable,
  isDisabled,
  isLoadingInput,
  isSearchOnline,
}: FilterOptionsProps) => {
  const dataStore: UiSelect = useSelector(
    (state: { ui_select: UiSelect }) => state.ui_select
  );
  const refInputFilter = useRef<HTMLInputElement>(null);
  const refInput = dataStore.refInputSearch;
  const isLoading = dataStore.isLoading;

  const dispatch = useDispatch();

  useEffect(() => {
    if (refInputFilter && refInputFilter.current) {
      refInputFilter.current.focus();
    }
  }, [refInput]);

  useEffect(() => {
    if (refInputFilter && refInputFilter.current)
      dispatch(changeElementFocused(undefined));
  }, [dispatch]);

  return (
    <div className={st(classes.root)}>
      <div className={st(classes.contentFilter)}>
        <div className={st(classes.actionSearch, { isDisabled })}>
          {isLoadingInput && (
            <span
              className={st(classes.iconLoading, {
                isLoading: isLoading && isSearchOnline,
              })}
            >
              <div className={st(classes.loadingSelect)}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </span>
          )}

          <input
            type="text"
            className={st(classes.inputFilter, { isSearchable, isDisabled })}
            onChange={hanldeOnchangeSearch}
            value={inputSearch}
            tabIndex={0}
            ref={refInputFilter}
            disabled={isDisabled}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>

          {inputSearch !== "" && (
            <>
              {!isLoading && (
                <div className={st(classes.itemsQuality)}>
                  {_.size(platArrData)} options
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(FilterOptions);
