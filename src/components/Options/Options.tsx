import { memo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { DATA_UI, UiSelect, addSelectoptions } from "../../stores/ReduxStore";
import OptionsTree from "./OptionsTree";
import ItemOption from "./ItemOption";
import { st, classes } from "./Options.st.css";

export type OptionsProps = {
  data?: DATA_UI[];
  typeRender?: "single" | "tree";
  typeSelect?: "single" | "multi";
  typeGroup?: "group_single" | "group_tree";
  typeSearch?: "online" | "offline";
  isSearchOnline?: boolean;
  flatArrDataSelect?: DATA_UI[];
  handleCloseOptions?: () => void;
  deleteOptionAllSelected?: () => void;
  showLevel?: number;
  isKeyDowning?: boolean;
  inputSearch?: string;
  isLoadingInput?: boolean;
  setIsFirstLoading?: (e: boolean) => void;
  selectedData?: DATA_UI[];
};

const Options = ({
  typeRender,
  flatArrDataSelect,
  handleCloseOptions,
  typeSelect,
  data,
  showLevel,
  isKeyDowning,
  inputSearch,
  typeGroup,
  isLoadingInput,
  isSearchOnline,
  setIsFirstLoading,
  selectedData,
}: OptionsProps) => {
  const dataStore: UiSelect = useSelector(
    (state: { ui_select: UiSelect }) => state.ui_select
  );

  const ulWapperRef = useRef<HTMLUListElement>(null);
  const isLoading = dataStore.isLoading;

  const dispatch = useDispatch();
  console.log(selectedData);

  const handleAddselectOptions = (option?: DATA_UI) => {
    const currentOption = _.cloneDeep(option);
    if (currentOption) {
      currentOption["groupOptions"] = [];
      if (typeSelect === "single") {
        let currentSelectedData: DATA_UI[] | undefined =
          _.cloneDeep(selectedData);
        currentSelectedData = [currentOption];
        dispatch(addSelectoptions(currentSelectedData));
      } else {
        const currentSelectedData: DATA_UI[] | undefined =
          _.cloneDeep(selectedData);

        if (_.find(selectedData, ["value", currentOption.value])) {
          const newSelectedData: DATA_UI[] = [];
          _.each(selectedData, (option) => {
            if (option.value !== currentOption.value) {
              newSelectedData.push(option);
            }
          });

          dispatch(addSelectoptions(newSelectedData));
        } else {
          currentSelectedData && currentSelectedData.push(currentOption);
          currentSelectedData &&
            dispatch(addSelectoptions(currentSelectedData));
        }
      }
    }
    _.isFunction(setIsFirstLoading) && setIsFirstLoading(false);
  };

  return (
    <div className={st(classes.root)} data-hook="options">
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
                  id={`wapper-list-option-${typeSelect}`}
                  data-hook="item-option-single-no_group"
                >
                  {_.map(flatArrDataSelect, (opt) => (
                    <ItemOption
                      opt={opt}
                      handleAddselectOptions={handleAddselectOptions}
                      typeRender={typeRender}
                      typeSelect={typeSelect}
                      key={opt.value}
                      isSearchOnline={isSearchOnline}
                    />
                  ))}
                </div>
              ) : (
                ""
              )}

              {typeGroup === "group_single" ? (
                <div
                  className={st(classes.listItemOptions)}
                  id={`wapper-list-option-${typeSelect}`}
                  data-hook="item-option-group_single"
                >
                  {_.map(flatArrDataSelect, (opt) => (
                    <ItemOption
                      opt={opt}
                      handleAddselectOptions={handleAddselectOptions}
                      typeRender={typeRender}
                      typeSelect={typeSelect}
                      typeGroup={typeGroup}
                      key={opt.value}
                      isSearchOnline={isSearchOnline}
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
                    id={`wapper-list-option-${typeSelect}`}
                    data-hook="item-option-tree-no_group"
                  >
                    {_.map(flatArrDataSelect, (opt) => (
                      <ItemOption
                        opt={opt}
                        handleAddselectOptions={handleAddselectOptions}
                        typeRender={typeRender}
                        typeSelect={typeSelect}
                        key={opt.value}
                        isSearchOnline={isSearchOnline}
                        typeGroup={typeGroup}
                      />
                    ))}
                  </div>
                ) : (
                  <ul
                    className={st(classes.listItemOptionsTree)}
                    ref={ulWapperRef}
                    id={`wapper-list-option-${typeSelect}`}
                    data-hook="item-option-tree-no_group"
                  >
                    {_.map(data, (opt) => (
                      <OptionsTree
                        isKeyDowning={isKeyDowning}
                        data={opt}
                        key={opt.value}
                        typeRender={typeRender}
                        typeSelect={typeSelect}
                        handleAddselectOptions={handleAddselectOptions}
                        showLevel={showLevel}
                        selectedData={selectedData}
                        isSearchOnline={isSearchOnline}
                      />
                    ))}
                  </ul>
                )}
              </>
            )}

          {typeRender === "tree" && typeGroup === "group_tree" && (
            <>
              {inputSearch !== "" ? (
                <div
                  className={st(classes.listItemOptions)}
                  id={`wapper-list-option-${typeSelect}`}
                  data-hook="item-option-tree-group_tree"
                >
                  {_.map(flatArrDataSelect, (opt) => (
                    <ItemOption
                      opt={opt}
                      handleAddselectOptions={handleAddselectOptions}
                      typeRender={typeRender}
                      typeSelect={typeSelect}
                      key={opt.value}
                      isSearchOnline={isSearchOnline}
                      typeGroup={typeGroup}
                    />
                  ))}
                </div>
              ) : (
                <ul
                  className={st(classes.listItemOptionsTree)}
                  ref={ulWapperRef}
                  id={`wapper-list-option-${typeSelect}`}
                  data-hook="item-option-tree-group_tree"
                >
                  {_.map(data, (opt) => (
                    <OptionsTree
                      isKeyDowning={isKeyDowning}
                      data={opt}
                      key={opt.value}
                      typeRender={typeRender}
                      typeSelect={typeSelect}
                      handleAddselectOptions={handleAddselectOptions}
                      showLevel={showLevel}
                      selectedData={selectedData}
                      typeGroup={typeGroup}
                      isSearchOnline={isSearchOnline}
                    />
                  ))}
                </ul>
              )}
            </>
          )}
        </>
      )}

      <div className={st(classes.done)}>
        <button onClick={handleCloseOptions} data-hook="btn-done">
          Done
        </button>
      </div>
    </div>
  );
};

export default memo(Options);
