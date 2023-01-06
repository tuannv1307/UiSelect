import { Provider } from "react-redux";
import FilterOptions from "./FilterOptions";
import { dataUiSelect } from "../../constants";
// import SelectOptions from "../SelectOptions";
import { initStore } from "../../stores/store";

let data: any = dataUiSelect;
const store = initStore();
// it("mount", () => {
//   cy.mount(
//     <App
//       typeRender="single"
//       typeSelect="single"
//       typeSearch="offline"
//       options={data}
//     />
//   );
//   cy.get('[data-hook="Ui_Select"]').viewport("macbook-15");
// });

describe("group select item", () => {
  it("is true", () => {
    cy.mount(
      <Provider store={store}>
        <FilterOptions />
      </Provider>
    );
    //cy.get('[data-hook="UiSelect"]').viewport("macbook-15");
  });

  it("is false", () => {});
});
