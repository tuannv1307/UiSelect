import { Provider } from "react-redux";

import { initStore } from "./stores/store";
import SelectOptions from "./components/SelectOptions/SelectOptions";

function App(props: {}) {
  const store = initStore();

  return (
    <Provider store={store}>
      <SelectOptions {...props} />
    </Provider>
  );
}
export default App;
