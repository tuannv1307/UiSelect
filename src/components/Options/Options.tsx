import React, { memo, useEffect, useState } from "react";
import FilterOptions from "../FilterOptions/FilterOptions";
import _ from "lodash";
import { UiSelect, addSelectoptions } from "../../stores/ReduxStore";
import { useDispatch, useSelector } from "react-redux";

import { st, classes } from "./Options.st.css";

export type OptionsProps = {
  data: any;
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
  data,
  deleteOptionAllSelected,
}: OptionsProps) => {
  const dispatch = useDispatch();

  const handleAddselectOptions = (value?: string, selected?: boolean) => {
    if (typeSelect === "single" && typeRender === "single") {
      platArrData = _.map(platArrData, (opt) =>
        opt.value === value
          ? { ...opt, isSelected: true }
          : { ...opt, isSelected: false }
      );

      setTimeout(() => {
        handleCloseOptions();
      }, 100);
    } else if (typeSelect === "multi" && typeRender === "single") {
      platArrData = _.map(platArrData, (opt) =>
        opt.value === value ? { ...opt, isSelected: !selected } : { ...opt }
      );
    }
    dispatch(addSelectoptions(platArrData));
  };

  return (
    <div className={st(classes.root)}>
      <>
        {typeRender === "single" && (
          <div className={st(classes.listItemOptions)}>
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
          </div>
        )}

        {typeRender === "tree" && (
          <ul className={st(classes.listItemOptionsTree)}>
            {_.map(data, (opt) => (
              <OptionsTree
                data={opt}
                typeRender={typeRender}
                options={options}
                platArrData={platArrData}
                handleCloseOptions={handleCloseOptions}
                typeSelect={typeSelect}
              />
            ))}
          </ul>
        )}
      </>
    </div>
  );
};

export type OptionsTreeProps = {
  data?: any;
  typeRender?: "single" | "tree";
  typeSelect?: "single" | "multi";
  options?: any;
  platArrData?: any;
  handleCloseOptions?: any;
  deleteOptionAllSelected?: any;
};

const OptionsTree = ({
  data,
  typeRender,
  options,
  platArrData,
  handleCloseOptions,
  typeSelect,
  deleteOptionAllSelected,
}: OptionsTreeProps) => {
  const hashChild = data.groupOptions ? true : false;
  console.log(data);

  return (
    <li className={st(classes.optionsTree)}>
      <p className={st(classes.itemOptionTree)}>
        <input type="checkbox" /> {data.label}
      </p>

      {hashChild && (
        <Options
          typeRender={typeRender}
          options={options}
          platArrData={platArrData}
          handleCloseOptions={handleCloseOptions}
          typeSelect={typeSelect}
          data={data.groupOptions}
          deleteOptionAllSelected={deleteOptionAllSelected}
        />
      )}
    </li>
  );
};

export default memo(Options);
