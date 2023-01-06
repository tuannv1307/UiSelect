import { memo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { DATA_UI, UiSelect, addSelectoptions } from "../../stores/ReduxStore";
import OptionsTree from "./OptionsTree";
import ItemOption from "./ItemOption";
import { st, classes } from "./Options.st.css";

export type OptionsProps = {
  data: DATA_UI[];
  typeRender?: "single" | "tree";
  typeSelect?: "single" | "multi";
  typeGroup?: "group_single" | "group_tree";
  typeSearch?: "online" | "offline";
  isSearchOnline?: boolean;
  platArrData?: DATA_UI[];
  handleCloseOptions?: () => void;
  deleteOptionAllSelected?: () => void;
  showLevel?: number;
  isShowOption?: boolean;
  isKeyDowning?: boolean;
  inputSearch?: string;
  isLoadingInput?: boolean;
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
  isLoadingInput,
  isSearchOnline,
}: OptionsProps) => {
  const dataStore: UiSelect = useSelector(
    (state: { ui_select: UiSelect }) => state.ui_select
  );
  let selectedData: any = dataStore.selectedData;
  const ulWapperRef = useRef<HTMLUListElement>(null);
  const isLoading = dataStore.isLoading;

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
      {isLoading && isSearchOnline ? (
        <div className={st(classes.loading, { isLoadingInput })}>
          Loading...
        </div>
      ) : (
        <>
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
        </>
      )}

      <div className={st(classes.done)}>
        <button onClick={handleCloseOptions}>Done</button>
      </div>
    </div>
  );
};

export default memo(Options);
