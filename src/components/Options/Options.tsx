import React, { useEffect, useState } from "react";
import FilterOptions from "../FilterOptions/FilterOptions";
import _ from "lodash";
import { UiSelect, addSelectoptions } from "../../stores/ReduxStore";
import { useDispatch, useSelector } from "react-redux";

import { st, classes } from "./Options.st.css";

export type OptionsProps = {
  typeRender?: "single" | "tree";
  typeSelect?: "single" | "multi";
  options?: any;
  platArrData?: any;
  handleCloseOptions?: any;
  deleteOptionAllSelected?: any;
};
const Options = ({
  typeRender,
  options,
  platArrData,
  handleCloseOptions,
  typeSelect,
  deleteOptionAllSelected,
}: OptionsProps) => {
  let data: UiSelect = useSelector(
    (state: { ui_select: UiSelect }) => state.ui_select
  );

  const dispatch = useDispatch();

  let arrOptions = data.data;

  // arrOptions = platArrData;

  const handleAddselectOptions = (value?: string, selected?: boolean) => {
    if (typeSelect === "single") {
      platArrData = _.map(platArrData, (opt) =>
        opt.value === value
          ? { ...opt, isSelected: true }
          : { ...opt, isSelected: false }
      );

      setTimeout(() => {
        handleCloseOptions();
      }, 100);
    } else {
      platArrData = _.map(platArrData, (opt) =>
        opt.value === value ? { ...opt, isSelected: !selected } : { ...opt }
      );
    }

    dispatch(addSelectoptions(platArrData));
  };

  return (
    <div className={st(classes.root)}>
      <div className={st(classes.listItemOptions)}>
        {typeRender === "single" && (
          <>
            {_.map(platArrData, (opt) => (
              <div
                className={st(classes.itemOption, { active: opt?.isSelected })}
                onClick={() =>
                  handleAddselectOptions(opt.value, opt?.isSelected)
                }
                key={opt.value}
              >
                {opt.label}
              </div>
            ))}
          </>
        )}

        {/* {typeRender === "tree" && (
          <div className={st(classes.itemOption)}>2</div>
        )} */}
      </div>
    </div>
  );
};

export default Options;
