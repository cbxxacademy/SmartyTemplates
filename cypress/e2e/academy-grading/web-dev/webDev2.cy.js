/// <reference types="cypress" />

const { visible } = require("ansi-colors");

describe("Web Dev 2", () => {
  beforeEach(() => {
    // cy.visit("http://127.0.0.1:5500/index.html");
    cy.visit("quote.html");
  });
  it("Validate - Quote Page - Separate Quote page", () => {
    cy.get('a[href*="quote.html"]').then((link) => {
      cy.request(link.prop("href")).its("status").should("eq", 200);
      cy.get("#header").should("exist");
      cy.get("#footer").should("exist");
    });
  });
  it("Validate - Quote Page 2 - accessible from the home page", () => {
    cy.visit("index.html");
    cy.get('a[href*="quote.html"]').should("be.visible");
  });
  it("Validate - Quote Page 3 - Header/Footer", () => {
    cy.get("#header").should("exist");
    cy.get("#footer").should("exist");
  });

  it("Validate Quote Form 1 - specify building type dropdown", () => {
    cy.get("#building-type").should("be.visible");
    cy.get("#residential").should("exist").and("not.be.visible");
    cy.get("#commercial").should("exist").and("not.be.visible");
    cy.get("#industrial").should("exist").and("not.be.visible");
  });
  it("Validate - Quote Form 1 - only one selection at a time", () => {
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
  it("Validate Quote Form 2 - building type visibility", () => {
    cy.get("#building-type").should("be.visible");
    cy.get(".estimate-num-elv").should("exist").and("not.be.visible");
    cy.get(".product-line").should("exist").and("not.be.visible");
    cy.get(".final-pricing-display").should("exist").and("not.be.visible");
  });
  it("Validate Quote Form 3 - Residential building type inputs fields", () => {
    cy.get("#building-type").select("Residential");
    cy.get("#number-of-apartments").should("be.visible");
    cy.get("#number-of-floors").should("be.visible");
    cy.get("#number-of-elevators").should("not.be.visible");
    cy.get("#maximum-occupancy").should("not.be.visible");
  });
  it("Validate Quote Form 4 - Commercial building type inputs fields", () => {
    cy.get("#building-type").select("Commercial");
    cy.get("#number-of-floors").should("be.visible");
    cy.get("#maximum-occupancy").should("be.visible");
    cy.get("#number-of-elevators").should("not.be.visible");
  });
  it("Validate Quote Form 5 - Industrial building type inputs fields", () => {
    cy.get("#building-type").select("Industrial");
    cy.get("#number-of-elevators").should("be.visible");
    cy.get("#number-of-apartments").should("not.be.visible");
    cy.get("#number-of-floors").should("not.be.visible");
    cy.get("#maximum-occupancy").should("not.be.visible");
  });
  it("Validate  Quote Form 6 - Product Line radio button fields", () => {
    cy.get(".standard").should("exist");
    cy.get(".premium").should("exist");
    cy.get(".excelium").should("exist");
  });
  it("Validate  Quote Form 6 - Product Line only one field at a time", () => {
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
  it("Validate Quote Form 7 - Residential cost", () => {
    cy.get("#building-type").select("Residential");
    cy.get("#number-of-apartments").type("100");
    cy.get("#number-of-floors").type("3");
    cy.get(".estimate-num-elv > .card-heading").click("topRight");
    //standard validation
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
    //Premium validation
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
    //Excelium validation
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
  it("Validate Quote Form 8 - Commercial cost", () => {
    cy.get("#building-type").select("Commercial");
    cy.get("#number-of-floors").type("6");
    cy.get("#maximum-occupancy").type("50");
    //standard validation
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
    //Premium validation
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
    //Excelium validation
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
  it("Validate Quote Form 9 - Industrial cost", () => {
    cy.get("#building-type").select("Industrial");
    //standard validation
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
    //Premium validation
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
    //Excelium validation
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
  it("Validate Quote Form 10 - 4 fields and Read-only", () => {
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
  it("Validate Quote Form 11 - dynamically update", () => {
    cy.get("#building-type").select("Industrial");
    //standard validation
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
