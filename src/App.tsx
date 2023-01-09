import { Provider } from "react-redux";

import { initStore } from "./stores/store";
import SelectOptions from "./components/SelectOptions";

function App(props: {
  typeRender?: "single" | "tree";
  typeSelect?: "single" | "multi";
  isMulti?: boolean;
  typeGroup?: "group_single" | "group_tree";
  isGroup?: boolean;
  showLevel?: number;
  options?: {}[];
  isSearchOnline?: boolean;
  url?: string;
  arrSelectedData?: string[];
}) {
  const store = initStore();

  return (
    <Provider store={store}>
      <SelectOptions {...props} />
    </Provider>
  );
}
export default App;
