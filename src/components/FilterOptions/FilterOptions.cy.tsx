import { Provider } from "react-redux";
import FilterOptions from "./FilterOptions";
import { initStore } from "../../stores/store";

const data = [
  {
    value: "Default",
    label: "Default Category",
  },
  {
    value: "Group-1",
    label: "Gear",
  },
  { value: "Group-11", label: "Bags" },
  { value: "Group-12", label: "Fitness Equipment" },
  { value: "Group-13", label: "Watches" },
  {
    value: "Group-2",
    label: "Collections",
  },
  { value: "Group-22", label: "New Luma Yoga Collection" },
  { value: "Group-23", label: "Erin Recommends" },
  { value: "Group-24", label: "Performance Fabrics" },
  { value: "Group-25", label: "Eco Friendly" },
  { value: "Group-26", label: "Performance Sportswear New" },
  { value: "Group-27", label: "Eco Collection New" },
  {
    value: "Group-3",
    label: "Training",
  },
  { value: "Group-33", label: "Video Download" },
  {
    value: "Group-4",
    label: "Men",
  },
  {
    value: "Group-44",
    label: "Tops",
  },
  {
    value: "Group-444",
    label: "Jackets",
  },
  {
    value: "Group-445",
    label: "Hoodies & Sweatshirts",
  },
  {
    value: "Group-446",
    label: "Tees",
  },
  {
    value: "Group-447",
    label: "Tanks",
  },
  {
    value: "Group-45",
    label: "Bottoms",
  },
  {
    value: "Group-455",
    label: "Pants",
  },
  {
    value: "Group-456",
    label: "Shorts",
  },
  {
    value: "Group-5",
    label: "Women",
  },
  {
    value: "Group-55",
    label: "Tops",
  },
  {
    value: "Group-555",
    label: "Jackets",
  },
  {
    value: "Group-556",
    label: "Hoodies & Sweatshirts",
  },
  {
    value: "Group-557",
    label: "Tees",
  },
  {
    value: "Group-558",
    label: "Tanks",
  },
  {
    value: "Group-56",
    label: "Bottoms",
  },
  {
    value: "Group-566",
    label: "Pants",
  },
  {
    value: "Group-567",
    label: "Shorts",
  },
  {
    value: "Group-6",
    label: "Promotions",
  },
  { value: "Group-66", label: "Women Sale" },
  { value: "Group-67", label: "Men Sale" },
  { value: "Group-68", label: "Pants" },
  { value: "Group-69", label: "Tees" },
  { value: "Group-7", label: "Sale" },
  { value: "Group-8", label: "What's New" },
];
const store = initStore();

describe("FilterOptions.cy.tsx", () => {
  it("Show mount", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <FilterOptions
          flatArrDataSelect={data}
          inputSearch=""
          isSearchable={true}
          isDisabled={false}
        />
      </Provider>
    );

    cy.get('[data-hook="filter-options"]').viewport("macbook-15");
    cy.get('[data-hook="input-search"]')
      .invoke("val", "lll")
      .should("have.value", "lll")
      .and("have.css", "border-color", "rgb(0, 123, 219)");
  });

  it("Show mount is disable", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <FilterOptions
          flatArrDataSelect={data}
          inputSearch=""
          isSearchable={true}
          isDisabled={true}
        />
      </Provider>
    );

    cy.get('[data-hook="filter-options"]').viewport("macbook-15");
    cy.get('[data-hook="input-search"]').should("be.disabled");
  });

  it("Show mount with searchable is fasle", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <FilterOptions
          flatArrDataSelect={data}
          inputSearch=""
          isSearchable={false}
          isDisabled={false}
        />
      </Provider>
    );

    cy.get('[data-hook="filter-options"]').viewport("macbook-15");
    cy.get('[data-hook="input-search"]').should("be.hidden");
  });

  it("Show mount onChange input", () => {
    cy.viewport("macbook-15");
    const handleChange = cy.spy().as("handleChange");

    cy.mount(
      <Provider store={store}>
        <FilterOptions
          flatArrDataSelect={data}
          inputSearch={"a"}
          hanldeOnchangeSearch={handleChange}
          isSearchable={true}
        />
      </Provider>
    );
    cy.get('[data-hook="filter-options"]');
    cy.get('[data-hook="action-search"]');
    cy.get('[data-hook="input-search"]').type("ab");
    cy.get("@handleChange").should("be.calledBefore", "ab");
  });

  it("Show mount with input show data", () => {
    cy.viewport("macbook-15");
    const handleChange = cy.spy().as("handleChange");

    cy.mount(
      <Provider store={store}>
        <FilterOptions
          flatArrDataSelect={data}
          inputSearch={"a"}
          hanldeOnchangeSearch={handleChange}
          isSearchable={true}
        />
      </Provider>
    );
    cy.get('[data-hook="filter-options"]');
    cy.get('[data-hook="action-search"]');
    cy.get('[data-hook="quality-options"]').should("have.text", "39 options");
  });
});
