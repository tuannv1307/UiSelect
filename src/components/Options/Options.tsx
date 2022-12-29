import React from "react";
import { st, classes } from "./Options.st.css";
import FilterOptions from "../FilterOptions/FilterOptions";
import _ from "lodash";

export type OptionsProps = {
  typeRender?: "single" | "tree";
  optionsSelect?: [];
};
const Options = ({ typeRender, optionsSelect }: OptionsProps) => {
  // console.log(optionsSelect);
  _.map(optionsSelect, (option: any) => {
    _.map(option.groupOptions, (option) => {
      console.log(option);
    });
  });
  return (
    <div className={st(classes.root)}>
      <FilterOptions />
      <div className={st(classes.listItemOptions)}>
        {typeRender === "single" && (
          <>
            {_.map(optionsSelect, (option: any) => (
              <>
                <div className={st(classes.itemOption)}>{option.label}</div>
                {_.map(option.groupOptions, (option) => (
                  <>
                    <div className={st(classes.itemOption)}>{option.label}</div>
                    {_.map(option.groupOptions, (option) => (
                      <>
                        <div className={st(classes.itemOption)}>
                          {option.label}
                        </div>
                        {_.map(option.groupOptions, (option) => (
                          <>
                            <div className={st(classes.itemOption)}>
                              {option.label}
                            </div>
                          </>
                        ))}
                      </>
                    ))}
                  </>
                ))}
              </>
            ))}
          </>
        )}

        {typeRender === "tree" && (
          <div className={st(classes.itemOption)}>2</div>
        )}
      </div>
    </div>
  );
};

export default Options;
