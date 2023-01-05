import { ChangeEvent, memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  DATA_UI,
  UiSelect,
  changeElementFocused,
} from "../../stores/ReduxStore";
import { ReactComponent as SearchIcon } from "./../svgIcon/SearchIcon.svg";
import { st, classes } from "./FilterOptions.st.css";

export type FilterOptionsProps = {
  typeRender?: "single" | "tree";
  platArrData?: DATA_UI[];
  inputSearch: string;
  hanldeOnchangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};

const FilterOptions = ({
  platArrData,
  inputSearch,
  hanldeOnchangeSearch,
}: FilterOptionsProps) => {
  const dataStore: UiSelect = useSelector(
    (state: { ui_select: UiSelect }) => state.ui_select
  );
  const refInputFilter = useRef<HTMLInputElement>(null);
  const refInput = dataStore.refInputSearch;
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
        <div className={st(classes.actionSearch)}>
          <input
            type="text"
            className={st(classes.inputFilter)}
            onChange={hanldeOnchangeSearch}
            value={inputSearch}
            tabIndex={0}
            ref={refInputFilter}
          />

          <SearchIcon />

          {inputSearch !== "" && (
            <div className={st(classes.itemsQuality)}>
              {_.size(platArrData)} options
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(FilterOptions);
