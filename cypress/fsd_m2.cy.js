/**
 * Test file for Module 2 of CodeBoxx Full Stack Development Program
 */
/// <reference types="cypress" />

const { visible } = require("ansi-colors");

describe("Web Dev 2", () => {
  beforeEach(() => {
    cy.visit("quote.html");
  });

  it("T1 - Quote Page 2 - The quote page is accessible from the home page", () => {
    cy.visit("index.html");
    cy.get('a[href*="quote.html"]').should("be.visible");
  });

  it("T2 - Quote Form - A dropdown or radio buttons allows the user to select one of 3 building types", () => {
    cy.get("#building-type").should("be.visible");
    cy.get("#residential").should("exist").and("not.be.visible");
    cy.get("#commercial").should("exist").and("not.be.visible");
    cy.get("#industrial").should("exist").and("not.be.visible");
  });

  it("T3 - Quote Form - Only one building can be selected at a time", () => {
    cy.get("#building-type")
      .select("residential")
      .should("have.value", "residential")
      .and("not.have.value", "industrial", "commercial");
    cy.get("#building-type")
      .select("commercial")
      .should("have.value", "commercial")
      .and("not.have.value", "industrial", "residential");
    cy.get("#building-type")
      .select("industrial")
      .should("have.value", "industrial")
      .and("not.have.value", "commercial", "residential");
  });

  it("T4 - Quote Form 2 - Before selecting a building type, the user cannot see the other non-readonly input fields", () => {
    cy.get("#building-type").should("be.visible");
    cy.get(".estimate-num-elv").should("exist").and("not.be.visible");
    cy.get(".product-line").should("exist").and("not.be.visible");
    cy.get(".final-pricing-display").should("exist").and("not.be.visible");
  });

  it("T5 - Quote Form 3 - When selecting the Residential building type, only the required fields are shown", () => {
    cy.get("#building-type").select("Residential");
    cy.get("#number-of-apartments").should("be.visible");
    cy.get("#number-of-floors").should("be.visible");
    cy.get("#number-of-elevators").should("not.be.visible");
    cy.get("#maximum-occupancy").should("not.be.visible");
  });

  it("T6 - Quote Form 4 - When selecting the Commercial building type, only the required fields are shown", () => {
    cy.get("#building-type").select("Commercial");
    cy.get("#number-of-floors").should("be.visible");
    cy.get("#maximum-occupancy").should("be.visible");
    cy.get("#number-of-elevators").should("not.be.visible");
  });

  it("T7 - Quote Form 5 - When selecting the Industrial building type, only the required fields are shown", () => {
    cy.get("#building-type").select("Industrial");
    cy.get("#number-of-elevators").should("be.visible");
    cy.get("#number-of-apartments").should("not.be.visible");
    cy.get("#number-of-floors").should("not.be.visible");
    cy.get("#maximum-occupancy").should("not.be.visible");
  });

  it("T8 - Quote Form 6 - Radio buttons allow the user to select one of three product tier", () => {
    cy.get(".standard").should("exist");
    cy.get(".premium").should("exist");
    cy.get(".excelium").should("exist");
  });

  it("T9 - Quote Form 6 - Only one radio button can be selected at a time", () => {
    cy.get("#building-type").select("Residential");
    cy.get("#number-of-apartments").type("100");
    cy.get("#number-of-floors").type("3");
    cy.get(".standard").click().should("exist");
    cy.get(".premium").should("not.be.checked").and("be.visible");
    cy.get(".excelium").should("not.be.checked").and("be.visible");

    cy.get(".premium").click().should("exist");
    cy.get(".standard").should("not.be.checked").and("be.visible");
    cy.get(".excelium").should("not.be.checked").and("be.visible");

    cy.get(".excelium").click().should("exist");
    cy.get(".standard").should("not.be.checked").and("be.visible");
    cy.get(".premium").should("not.be.checked").and("be.visible");
  });

  it("T10 - Quote Form 7 - The results for a Residential building are correct", () => {
    cy.get("#building-type").select("Residential");
    cy.get("#number-of-apartments").type("100");
    cy.get("#number-of-floors").type("3");
    cy.get(".estimate-num-elv > .card-heading").click("topRight");

    cy.get(".standard").click();
    cy.get(
      "#elevator-unit-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$8,000.00");
    cy.get(
      "#elevator-total-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$48,000.00");
    cy.get("#installation-fees > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$4,800.00"
    );
    cy.get("#total-cost > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$52,800.00"
    );

    cy.get(".premium").click();
    cy.get(
      "#elevator-unit-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$12,000.00");
    cy.get(
      "#elevator-total-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$72,000.00");
    cy.get("#installation-fees > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$10,800.00"
    );
    cy.get("#total-cost > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$82,800.00"
    );

    cy.get(".excelium").click();
    cy.get(
      "#elevator-unit-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$15,000.00");
    cy.get(
      "#elevator-total-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$90,000.00");
    cy.get("#installation-fees > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$18,000.00"
    );
    cy.get("#total-cost > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$108,000.00"
    );
  });

  it("T11 - Quote Form 8 - The results for a Commercial building are correct", () => {
    cy.get("#building-type").select("Commercial");
    cy.get("#number-of-floors").type("6");
    cy.get("#maximum-occupancy").type("50");

    cy.get(".standard").click();
    cy.get(
      "#elevator-unit-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$8,000.00");
    cy.get(
      "#elevator-total-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$24,000.00");
    cy.get("#installation-fees > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$2,400.00"
    );
    cy.get("#total-cost > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$26,400.00"
    );

    cy.get(".premium").click();
    cy.get(
      "#elevator-unit-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$12,000.00");
    cy.get(
      "#elevator-total-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$36,000.00");
    cy.get("#installation-fees > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$5,400.00"
    );
    cy.get("#total-cost > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$41,400.00"
    );

    cy.get(".excelium").click();
    cy.get(
      "#elevator-unit-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$15,000.00");
    cy.get(
      "#elevator-total-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$45,000.00");
    cy.get("#installation-fees > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$9,000.00"
    );
    cy.get("#total-cost > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$54,000.00"
    );
  });

  it("T12 - Quote Form 9 - The results for an Industrial building are correct", () => {
    cy.get("#building-type").select("Industrial");

    cy.get("#number-of-elevators").type("3");
    cy.get(".standard").click();
    cy.get(
      "#elevator-unit-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$8,000.00");

    cy.get(
      "#elevator-total-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$24,000.00");

    cy.get("#installation-fees > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$2,400.00"
    );

    cy.get("#total-cost > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$26,400.00"
    );

    cy.get(".premium").click();
    cy.get(
      "#elevator-unit-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$12,000.00");
    cy.get(
      "#elevator-total-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$36,000.00");
    cy.get("#installation-fees > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$5,400.00"
    );

    cy.get("#total-cost > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$41,400.00"
    );

    cy.get(".excelium").click();
    cy.get(
      "#elevator-unit-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$15,000.00");
    cy.get(
      "#elevator-total-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$45,000.00");
    cy.get("#installation-fees > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$9,000.00"
    );

    cy.get("#total-cost > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$54,000.00"
    );
  });

  it("T13 - Quote Form 10 - The 4 required output fields are present and are read-only", () => {
    cy.get("#elevator-unit-price").should("exist");
    cy.get(
      "#elevator-unit-price > .pricing > h4 > label > .form-control"
    ).should("have.attr", "readonly", "readonly");
    cy.get("#elevator-total-price").should("exist");
    cy.get(
      "#elevator-total-price > .pricing > h4 > label > .form-control"
    ).should("have.attr", "readonly", "readonly");
    cy.get("#installation-fees").should("exist");
    cy.get("#installation-fees > .pricing > h4 > label > .form-control").should(
      "have.attr",
      "readonly",
      "readonly"
    );
    cy.get("#total-cost").should("exist");
    cy.get("#total-cost > .pricing > h4 > label > .form-control").should(
      "have.attr",
      "readonly",
      "readonly"
    );
  });

  it("T14 - Quote Form 11 - The values of the required output fields are dynamically updated as the user changes the input values", () => {
    cy.get("#building-type").select("Industrial");

    // Standard validation
    cy.get("#number-of-elevators").type("3");
    cy.get(".standard").click();
    cy.get(
      "#elevator-unit-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$8,000.00");
    cy.get(
      "#elevator-total-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$24,000.00");
    cy.get("#installation-fees > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$2,400.00"
    );
    cy.get("#total-cost > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$26,400.00"
    );
    cy.get("#number-of-elevators > :nth-child(2) > .form-control")
      .clear()
      .type("4");
    cy.get(".estimate-num-elv > .card-block").click("center");
    cy.get(
      "#elevator-unit-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$8,000.00");
    cy.get(
      "#elevator-total-price > .pricing > h4 > label > .form-control"
    ).should("have.value", "$320,000.00");
    cy.get("#installation-fees > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$32,000.00"
    );
    cy.get("#total-cost > .pricing > h4 > label > .form-control").should(
      "have.value",
      "$352,000.00"
    );
  });
});
