import { Provider } from "react-redux";
import { arrdataRecursive, dataUiSelect, flatArrData } from "../../constants";
import { initStore } from "../../stores/store";
import Options from "./Options";

const data_UiSelect: any = dataUiSelect;
const store = initStore();

describe("Options", () => {
  it("Show mount with render is single and select is single ", () => {
    const handleSpy = cy.spy().as("handleSpyClose");

    cy.mount(
      <Provider store={store}>
        <Options
          typeRender="single"
          flatArrDataSelect={flatArrData(data_UiSelect)}
          handleCloseOptions={handleSpy}
          typeSelect="single"
          data={arrdataRecursive(data_UiSelect)}
          inputSearch={""}
        />
      </Provider>
    );

    cy.get('[data-hook="options"]').viewport("macbook-15");
    cy.get('[data-hook="btn-done"]').click();
    cy.get("@handleSpyClose").should("be.calledOnce");
    cy.get('[data-hook="item-option-single-no_group"]');
    cy.get('[data-hook="item-options"]').eq(2).trigger("mousemove").click();
    cy.get('[data-hook="item-options"]').eq(3).trigger("mousemove");
  });

  it("Show mount with render is single group and select is single", () => {
    const handleSpy = cy.spy().as("handleSpyClose");

    cy.mount(
      <Provider store={store}>
        <Options
          typeRender="single"
          flatArrDataSelect={flatArrData(data_UiSelect)}
          handleCloseOptions={handleSpy}
          typeSelect="single"
          data={arrdataRecursive(data_UiSelect)}
          typeGroup="group_single"
        />
      </Provider>
    );
    cy.get('[data-hook="options"]').viewport("macbook-15");
    cy.get('[data-hook="btn-done"]').click();
    cy.get("@handleSpyClose").should("be.calledOnce");
    cy.get('[data-hook="item-option-group_single"]');
    cy.get('[data-hook="item-options"]').eq(3).trigger("mousemove").click();
    cy.get('[data-hook="item-options"]').eq(4).trigger("mousemove");
    cy.get('[data-hook="item-options"]').eq(0).trigger("mousemove");
    cy.get('[data-hook="item-options"] [data-hook="number-group"]')
      .eq(0)
      .should("have.text", 8);
  });

  it("Show mount with render is single and select is multi", () => {
    const handleSpy = cy.spy().as("handleSpyClose");

    cy.mount(
      <Provider store={store}>
        <Options
          typeRender="single"
          flatArrDataSelect={flatArrData(data_UiSelect)}
          handleCloseOptions={handleSpy}
          typeSelect="multi"
          data={arrdataRecursive(data_UiSelect)}
          showLevel={2}
          selectedData={[
            { value: "Group-13", label: "Watches" },
            {
              value: "Group-2",
              label: "Collections",
            },
          ]}
        />
      </Provider>
    );
    cy.get('[data-hook="options"]').viewport("macbook-15");
    cy.get('[data-hook="btn-done"]').click();
    cy.get("@handleSpyClose").should("be.calledOnce");
    cy.get('[data-hook="item-option-single-no_group"]');
    cy.get('[data-hook="item-options"]').eq(0).click();
    cy.get('[data-hook="item-options"]').eq(1).click();
    cy.get('[data-hook="item-options"]').eq(4).trigger("mousemove");
  });

  it("Show mount with render is single group and select is multi", () => {
    const handleSpy = cy.spy().as("handleSpyClose");

    cy.mount(
      <Provider store={store}>
        <Options
          typeRender="single"
          flatArrDataSelect={flatArrData(data_UiSelect)}
          handleCloseOptions={handleSpy}
          typeSelect="multi"
          data={arrdataRecursive(data_UiSelect)}
          typeGroup="group_single"
          selectedData={[
            { value: "Group-13", label: "Watches" },
            {
              value: "Group-2",
              label: "Collections",
            },
          ]}
        />
      </Provider>
    );
    cy.get('[data-hook="options"]').viewport("macbook-15");
    cy.get('[data-hook="btn-done"]').click();
    cy.get("@handleSpyClose").should("be.calledOnce");
    cy.get('[data-hook="item-option-group_single"]');
    cy.get('[data-hook="item-options"]').eq(1).click();
    cy.get('[data-hook="item-options"]').eq(4).trigger("mousemove");
    cy.get('[data-hook="item-options"]').eq(0).trigger("mousemove");
    cy.get('[data-hook="item-options"] [data-hook="number-group"]')
      .eq(0)
      .should("have.text", 8);
  });

  it("Show mount with render is tree and select is single", () => {
    const handleSpy = cy.spy().as("handleSpyClose");

    cy.mount(
      <Provider store={store}>
        <Options
          typeRender="tree"
          flatArrDataSelect={flatArrData(data_UiSelect)}
          handleCloseOptions={handleSpy}
          typeSelect="single"
          data={arrdataRecursive(data_UiSelect)}
          inputSearch=""
          showLevel={2}
          selectedData={[
            { value: "Group-13", label: "Watches" },
            {
              value: "Group-2",
              label: "Collections",
            },
          ]}
        />
      </Provider>
    );
    cy.get('[data-hook="options"]').viewport("macbook-15");
    cy.get('[data-hook="btn-done"]').click();
    cy.get("@handleSpyClose").should("be.calledOnce");
    cy.get('[data-hook="item-option-tree-no_group"]');
    cy.get('[data-hook="options-tree"]');
    cy.get('[data-hook="item-options-tree"]').eq(0).click();
    cy.get('[data-hook="toggle-item-tree"]').eq(0).click();
    cy.get('[data-hook="toggle-item-tree"]').eq(0).click();
    cy.get('[data-hook="toggle-item-tree"]').eq(4).click();
  });

  it("Show mount with render is tree and select is single with input search", () => {
    const handleSpy = cy.spy().as("handleSpyClose");

    cy.mount(
      <Provider store={store}>
        <Options
          typeRender="tree"
          flatArrDataSelect={flatArrData(data_UiSelect)}
          handleCloseOptions={handleSpy}
          typeSelect="single"
          data={arrdataRecursive(data_UiSelect)}
          inputSearch="aa"
          showLevel={2}
        />
      </Provider>
    );
    cy.get('[data-hook="options"]').viewport("macbook-15");
    cy.get('[data-hook="btn-done"]').click();
    cy.get("@handleSpyClose").should("be.calledOnce");
    cy.get('[data-hook="item-option-tree-no_group"]');
    cy.get('[data-hook="item-options"]').eq(0).click();
    cy.get('[data-hook="item-options"]').eq(8).trigger("mousemove");
    cy.get('[data-hook="item-options"]').eq(5).click();
    cy.get('[data-hook="item-options"]').eq(6).trigger("mousemove");
  });

  it("Show mount with render is tree and select is multi  with input search", () => {
    const handleSpy = cy.spy().as("handleSpyClose");

    cy.mount(
      <Provider store={store}>
        <Options
          typeRender="tree"
          flatArrDataSelect={flatArrData(data_UiSelect)}
          handleCloseOptions={handleSpy}
          typeSelect="multi"
          data={arrdataRecursive(data_UiSelect)}
          inputSearch="aaa"
          showLevel={2}
          selectedData={[
            { value: "Group-11", label: "Bags" },
            { value: "Group-12", label: "Fitness Equipment" },
            { value: "Group-13", label: "Watches" },
            {
              value: "Group-2",
              label: "Collections",
            },
          ]}
        />
      </Provider>
    );
    cy.get('[data-hook="options"]').viewport("macbook-15");
    cy.get('[data-hook="btn-done"]').click();
    cy.get("@handleSpyClose").should("be.calledOnce");
    cy.get('[data-hook="item-option-tree-no_group"]');
    cy.get('[data-hook="item-options"]').eq(0).click();
    cy.get('[data-hook="item-options"]').eq(8).trigger("mousemove");
    cy.get('[data-hook="item-options"]').eq(5).click();
    cy.get('[data-hook="item-options"]').eq(6).trigger("mousemove");
  });

  it("Show mount with render is tree group and select is single with input search", () => {
    const handleSpy = cy.spy().as("handleSpyClose");

    cy.mount(
      <Provider store={store}>
        <Options
          typeRender="tree"
          flatArrDataSelect={flatArrData(data_UiSelect)}
          handleCloseOptions={handleSpy}
          typeSelect="single"
          typeGroup="group_tree"
          data={arrdataRecursive(data_UiSelect)}
          inputSearch="aa"
          showLevel={2}
        />
      </Provider>
    );
    cy.get('[data-hook="options"]').viewport("macbook-15");
    cy.get('[data-hook="btn-done"]').click();
    cy.get("@handleSpyClose").should("be.calledOnce");
    cy.get('[data-hook="item-option-tree-group_tree"]');
    cy.get('[data-hook="item-options"]').eq(0).click();
    cy.get('[data-hook="item-options"]').eq(8).trigger("mousemove");
    cy.get('[data-hook="item-options"]').eq(5).click();
    cy.get('[data-hook="item-options"]').eq(6).trigger("mousemove");
  });

  it("Show mount with render is tree group and select is multi", () => {
    const handleSpy = cy.spy().as("handleSpyClose");

    cy.mount(
      <Provider store={store}>
        <Options
          typeRender="tree"
          flatArrDataSelect={flatArrData(data_UiSelect)}
          handleCloseOptions={handleSpy}
          typeSelect="multi"
          typeGroup="group_tree"
          data={arrdataRecursive(data_UiSelect)}
          inputSearch=""
          showLevel={2}
          selectedData={[
            { value: "Group-11", label: "Bags" },
            { value: "Group-12", label: "Fitness Equipment" },
            { value: "Group-13", label: "Watches" },
            {
              value: "Group-2",
              label: "Collections",
            },
          ]}
        />
      </Provider>
    );
    cy.get('[data-hook="options"]').viewport("macbook-15");
    cy.get('[data-hook="btn-done"]').click();
    cy.get("@handleSpyClose").should("be.calledOnce");
    cy.get('[data-hook="item-option-tree-group_tree"]');
    cy.get('[data-hook="options-tree"]');
    cy.get('[data-hook="item-options-tree"]').eq(0).click();
    cy.get('[data-hook="toggle-item-tree"]').eq(0).click();
    cy.get('[data-hook="toggle-item-tree"]').eq(0).click();
    cy.get('[data-hook="toggle-item-tree"]').eq(1).click();
  });

  it("Show mount with render is tree group and select is multi with input search online", () => {
    const handleSpy = cy.spy().as("handleSpyClose");

    cy.mount(
      <Provider store={store}>
        <Options
          typeRender="tree"
          flatArrDataSelect={flatArrData(data_UiSelect)}
          handleCloseOptions={handleSpy}
          typeSelect="multi"
          typeGroup="group_tree"
          data={arrdataRecursive(data_UiSelect)}
          inputSearch="aa"
          showLevel={2}
          isSearchOnline={true}
          selectedData={[
            { value: "Group-11", label: "Bags" },
            { value: "Group-12", label: "Fitness Equipment" },
            { value: "Group-13", label: "Watches" },
            {
              value: "Group-2",
              label: "Collections",
            },
          ]}
        />
      </Provider>
    );
    cy.get('[data-hook="options"]').viewport("macbook-15");
    cy.get('[data-hook="btn-done"]').click();
    cy.get("@handleSpyClose").should("be.calledOnce");
    cy.get('[data-hook="item-option-tree-group_tree"]');
    cy.get('[data-hook="item-options"]').eq(8).trigger("mousemove");
    cy.get('[data-hook="item-options"]').eq(6).trigger("mousemove");
  });
});
