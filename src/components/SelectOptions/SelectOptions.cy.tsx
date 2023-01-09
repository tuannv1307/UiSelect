import { Provider } from "react-redux";
import { dataUiSelect } from "../../constants";
import { initStore } from "../../stores/store";
import SelectOptions from "./SelectOptions";

const data: any = dataUiSelect;
const store = initStore();

describe("SelectOptions.cy.tsx", () => {
  it("Show mount with type render single:  select is single options", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <SelectOptions typeRender="single" typeSelect="single" options={data} />
      </Provider>
    );
    cy.get('[data-hook="Ui_Select"]').click();
    cy.wait(2000);
    cy.get('[data-hook="Ui_Select"]').click();
  });

  it("Show mount with type render single:  select is multi options", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <SelectOptions typeRender="single" typeSelect="multi" options={data} />
      </Provider>
    );
    cy.get('[data-hook="Ui_Select"]').click();
    cy.wait(2000);
    cy.get('[data-hook="Ui_Select"]').click();
  });

  it("Show mount with type render single: select is single", () => {
    cy.mount(
      <Provider store={store}>
        <SelectOptions typeRender="single" typeSelect="single" options={data} />
      </Provider>
    );
    cy.get('[data-hook="Ui_Select"]').viewport("macbook-15");
    cy.get('[data-hook="Ui_Select"]').click();
    cy.get('[data-hook="item-options"]').eq(3).click();
    cy.get('[data-hook="item-options"]').eq(4).trigger("mousemove");
    cy.get('[data-hook="item-options"]').eq(5).trigger("click");
  });

  it("Show mount with type render single: select is multi", () => {
    cy.mount(
      <Provider store={store}>
        <SelectOptions typeRender="single" typeSelect="multi" options={data} />
      </Provider>
    );
    cy.get('[data-hook="Ui_Select"]').viewport("macbook-15");
    cy.get('[data-hook="Ui_Select"]').viewport("macbook-15");
    cy.get('[data-hook="Ui_Select"]').click();
    cy.get('[data-hook="item-options"]').eq(3).click();
    cy.get('[data-hook="item-options"]').eq(4).trigger("mousemove");
    cy.get('[data-hook="item-options"]').eq(5).trigger("click");
    cy.get('[data-hook="item-options"]').eq(6).trigger("mousemove");
    cy.get('[data-hook="delete-item"]').eq(1).trigger("click");
    cy.get('[data-hook="delete-all"]').trigger("click");
  });

  it("Show mount with type render single: select is single options with input", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <SelectOptions typeRender="single" typeSelect="single" options={data} />
      </Provider>
    );
    cy.get('[data-hook="Ui_Select"]').click();
    cy.get('[data-hook="item-options"]').eq(3).click();
    cy.get('[data-hook="item-options"]').eq(4).trigger("mousemove");
    cy.get('[data-hook="item-options"]').eq(5).trigger("click");
    cy.get('[data-hook="item-options"]')
      .eq(5)
      .trigger("keydown", { code: "Tab" });
    cy.get('[data-hook="input-search"]').type("ba");
    cy.get('[data-hook="item-options"]')
      .eq(0)
      .trigger("keydown", { key: "Enter" });
    cy.get('[data-hook="item-options"]')
      .eq(0)
      .trigger("keydown", { code: "Tab" });
    cy.get('[data-hook="input-search"]').clear();
  });

  it("Show mount with type render single: select is multi options with input", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <SelectOptions typeRender="single" typeSelect="multi" options={data} />
      </Provider>
    );
    cy.get('[data-hook="Ui_Select"]').click();
    cy.get('[data-hook="item-options"]').eq(3).click();
    cy.get('[data-hook="item-options"]').eq(4).trigger("mousemove");
    cy.get('[data-hook="item-options"]').eq(5).trigger("click");
    cy.get('[data-hook="item-options"]')
      .eq(5)
      .trigger("keydown", { code: "Tab" });
    cy.get('[data-hook="input-search"]').type("ba");
    cy.get('[data-hook="item-options"]')
      .eq(0)
      .trigger("keydown", { key: "Enter" });
    cy.get('[data-hook="item-options"]')
      .eq(0)
      .trigger("keydown", { code: "Tab" });
    cy.get('[data-hook="input-search"]').clear();
  });

  it("Show mount with type render single: group_single and select is single with options select options", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <SelectOptions
          typeRender="single"
          typeSelect="single"
          options={data}
          typeGroup="group_single"
        />
      </Provider>
    );
    cy.get('[data-hook="Ui_Select"]').click();
    cy.get('[data-hook="item-options"]').eq(3).click();
    cy.get('[data-hook="item-options"]').eq(4).trigger("mousemove");
    cy.get('[data-hook="item-options"] [data-hook="number-group"]')
      .eq(0)
      .should("have.text", 8);
    cy.get('[data-hook="input-search"]').focus().type("wa");
    cy.get('[data-hook="item-options"]').eq(0).click();
    cy.get('[data-hook="item-options"]')
      .eq(0)
      .trigger("keydown", { code: "Tab" });
    cy.get('[data-hook="input-search"]').clear().type("ba");
    cy.get('[data-hook="item-options"]')
      .eq(0)
      .trigger("keydown", { code: "Space" });
  });

  it("Show mount with type render single: group_single and select is multi with options select options", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <SelectOptions
          typeRender="single"
          typeSelect="multi"
          options={data}
          typeGroup="group_single"
        />
      </Provider>
    );
    cy.get('[data-hook="Ui_Select"]').click();
    cy.get('[data-hook="item-options"]').eq(3).click();
    cy.get('[data-hook="item-options"]').eq(4).trigger("mousemove");
    cy.get('[data-hook="item-options"] [data-hook="number-group"]')
      .eq(0)
      .should("have.text", 8);
    cy.get('[data-hook="input-search"]').focus().type("wa");
    cy.get('[data-hook="item-options"]').eq(0).click();
    cy.get('[data-hook="item-options"]')
      .eq(0)
      .trigger("keydown", { code: "Tab" });
    cy.get('[data-hook="input-search"]').clear().type("ba");
    cy.get('[data-hook="item-options"]')
      .eq(0)
      .trigger("keydown", { code: "Space" });
    cy.get('[data-hook="delete-item"]').eq(1).trigger("click");
    cy.get('[data-hook="delete-all"]').trigger("click");
  });

  it("Show mount with type render single: search online with select single", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <SelectOptions
          typeRender="single"
          typeSelect="single"
          options={data}
          typeGroup="group_single"
          isSearchOnline={true}
          url="http://192.168.1.21:3005/options"
          arrSelectedData={["Default", "Group-1", "Gear", "Group-2"]}
        />
      </Provider>
    );
    cy.get('[data-hook="Ui_Select"]').click();
    cy.get('[data-hook="input-search"]').focus().type("ba");
    cy.get('[data-hook="item-options"]')
      .eq(0)
      .trigger("keydown", { code: "Space" });
    cy.get('[data-hook="input-search"]').clear().type("w");
    cy.get('[data-hook="item-options"]')
      .eq(3)
      .trigger("keydown", { key: "Enter" });
  });

  it("Show mount with type render single: search online with select multi", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <SelectOptions
          typeRender="single"
          typeSelect="multi"
          options={data}
          typeGroup="group_single"
          isSearchOnline={true}
          url="http://192.168.1.21:3005/options"
          arrSelectedData={["Default", "Group-1", "Gear", "Group-2"]}
        />
      </Provider>
    );
    cy.get('[data-hook="Ui_Select"]').click();
    cy.get('[data-hook="item-options"]').eq(0).click();
    cy.get('[data-hook="item-options"]')
      .eq(0)
      .trigger("keydown", { code: "Tab" });
    cy.get('[data-hook="input-search"]').clear().type("ba");
    cy.get('[data-hook="item-options"]')
      .eq(0)
      .trigger("keydown", { code: "Space" });
    cy.get('[data-hook="input-search"]').clear().type("w");
    cy.get('[data-hook="item-options"]')
      .eq(3)
      .trigger("keydown", { key: "Enter" });
  });

  it("Show mount with type render tree:  select is single options", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <SelectOptions
          typeRender="tree"
          typeSelect="single"
          options={data}
          showLevel={2}
        />
      </Provider>
    );
    cy.get('[data-hook="Ui_Select"]').click();
    cy.get('[data-hook="item-options-tree"]')
      .eq(3)
      .trigger("keydown", { key: "Enter" });
    cy.get('[data-hook="item-options-tree"]')
      .eq(3)
      .trigger("keydown", { code: "Tab" });
    cy.get('[data-hook="toggle-item-tree"]').eq(3).trigger("click");
    cy.get('[data-hook="item-options-tree"]')
      .eq(4)
      .trigger("keydown", { key: "Enter" });
    cy.get('[data-hook="input-search"]').clear().type("ba");
    cy.get('[data-hook="item-options"]')
      .eq(0)
      .trigger("keydown", { code: "Space" });
    cy.get('[data-hook="input-search"]').clear().type("w");
    cy.get('[data-hook="item-options"]')
      .eq(3)
      .trigger("keydown", { key: "Enter" });
  });

  it("Show mount with type render tree:  select is multi options", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <SelectOptions
          typeRender="tree"
          typeSelect="multi"
          options={data}
          showLevel={2}
        />
      </Provider>
    );
    cy.get('[data-hook="Ui_Select"]').click();
    cy.get('[data-hook="item-options-tree"]')
      .eq(3)
      .trigger("keydown", { key: "Enter" });
    cy.get('[data-hook="item-options-tree"]')
      .eq(3)
      .trigger("keydown", { code: "Tab" });
    cy.get('[data-hook="toggle-item-tree"]').eq(3).trigger("click");
    cy.get('[data-hook="item-options-tree"]')
      .eq(4)
      .trigger("keydown", { key: "Enter" });
    cy.get('[data-hook="input-search"]').clear().type("ba");
    cy.get('[data-hook="item-options"]')
      .eq(0)
      .trigger("keydown", { code: "Space" });
    cy.get('[data-hook="input-search"]').clear().type("w");
    cy.get('[data-hook="item-options"]')
      .eq(3)
      .trigger("keydown", { key: "Enter" });
    cy.get('[data-hook="delete-item"]').eq(1).trigger("click");
    cy.get('[data-hook="delete-all"]').trigger("click");
    cy.get('[data-hook="input-search"]').clear();
  });

  it("Show mount with type render tree: group_tree and select is single with options select options", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <SelectOptions
          typeRender="tree"
          typeSelect="single"
          options={data}
          typeGroup="group_tree"
          showLevel={2}
        />
      </Provider>
    );
    cy.get('[data-hook="Ui_Select"]').click();
    cy.get('[data-hook="number-group-tree"]').eq(0).should("have.text", 8);
    cy.get('[data-hook="item-options-tree"]')
      .eq(3)
      .trigger("keydown", { key: "Enter" });
    cy.get('[data-hook="item-options-tree"]')
      .eq(3)
      .trigger("keydown", { code: "Tab" });
    cy.get('[data-hook="toggle-item-tree"]').eq(3).trigger("click");
    cy.get('[data-hook="item-options-tree"]')
      .eq(4)
      .trigger("keydown", { key: "Enter" });
    cy.get('[data-hook="input-search"]').clear().type("ba");
    cy.get('[data-hook="item-options"]')
      .eq(0)
      .trigger("keydown", { code: "Space" });
    cy.get('[data-hook="input-search"]').clear().type("w");
    cy.get('[data-hook="item-options"]')
      .eq(3)
      .trigger("keydown", { key: "Enter" });
    cy.get('[data-hook="input-search"]').clear();
  });

  it("Show mount with type render tree: group_tree and select is multi with options select options", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <SelectOptions
          typeRender="tree"
          typeSelect="multi"
          options={data}
          typeGroup="group_tree"
          showLevel={2}
        />
      </Provider>
    );
    cy.get('[data-hook="Ui_Select"]').click();
    cy.get('[data-hook="number-group-tree"]').eq(1).should("have.text", 3);
    cy.get('[data-hook="item-options-tree"]')
      .eq(3)
      .trigger("keydown", { key: "Enter" });
    cy.get('[data-hook="item-options-tree"]')
      .eq(3)
      .trigger("keydown", { code: "Tab" });
    cy.get('[data-hook="toggle-item-tree"]').eq(3).trigger("click");
    cy.get('[data-hook="item-options-tree"]')
      .eq(4)
      .trigger("keydown", { key: "Enter" });
    cy.get('[data-hook="input-search"]').clear().type("ba");
    cy.get('[data-hook="item-options"]')
      .eq(0)
      .trigger("keydown", { code: "Space" });
    cy.get('[data-hook="input-search"]').clear().type("w");
    cy.get('[data-hook="item-options"]')
      .eq(3)
      .trigger("keydown", { key: "Enter" });
    cy.get('[data-hook="input-search"]').clear();
    cy.get('[data-hook="btn-done"]').click();
    cy.get('[data-hook="delete-all"]').trigger("click");
  });
});
