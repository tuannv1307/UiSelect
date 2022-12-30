import { Provider } from "react-redux";

import { initStore } from "./stores/store";
import SelectOptions from "./components/SelectOptions/SelectOptions";

function App(props: {
  typeRender?: "single" | "tree";
  typeSearch?: "online" | "offline";
  typeSelect?: "single" | "multi";
  options?: {}[];
}) {
  const store = initStore();

  return (
    <Provider store={store}>
      <SelectOptions {...props} />
    </Provider>
  );
}
export default App;
