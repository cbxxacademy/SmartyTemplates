/// <reference types="cypress" />

import "cypress-map";
import chaiColors from "chai-colors";
chai.use(chaiColors);
chai.use(require("chai-sorted"));

describe("FSD Module 3", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("T1 - Styling 1 - Roboto Slab font is used for navigation elements and headlines", () => {
    cy.get("#header, h1, h2, h3, h4, h5, h6, #topMain.nav-pills>li>a")
      .should("have.css", "font-family")
      .and("include", "Roboto Slab");
  });

  it("T2 - Styling 2 - A serif font is used for paragraphs", () => {
    cy.get("p")
      .should("have.css", "font-family")
      .and("match", /serif/);
  });

  it("T3 - Styling 4 - All gray background elements are in #0a65a0 blue", () => {
    cy.get("#team").should("have.css", "background-color", "rgb(10, 101, 160)");

  });

  it("T4 - Styling 6 - All headlines (text) are in #0a65a0 blue", () => {
    cy.get(".heading-title h2")
      .should("have.css", "color")
      .and("eq", "rgb(10, 101, 160)");
  });

  it("T5 - Styling 7 - The foundation date of the company is red, bold and larger than surrounding fonts", () => {
    cy.get("h2.fs-40 strong span")
      .should("have.css", "color", "rgb(255, 0, 0)")
      .should("have.css", "font-weight", "700")
      .should("have.css", "font-size")
      .then((fontSize) => {
        const numericFontSize = parseFloat(fontSize);
        expect(numericFontSize).to.be.greaterThan(40);
      });
  });

  it("T6 - Styling 8 - Tthe Company Highlights section images are spaced properly", () => {
    cy.get(".portfolio-nogutter > .row > :nth-child(1)").should(
      "have.css",
      "padding",
      "0px 15px"
    );
  });

  it("T7 - Styling 9 - Visit Us section Business hours are emphasized", () => {
    cy.get("#biz_address > strong").should("have.css", "font-weight", "700");
    cy.get("#biz_phone > strong").should("have.css", "font-weight", "700");
    cy.get("#biz_saturday").should("have.css", "font-weight", "700");
  });

  it("T8 - Styling 10 - Background color of Quote page tabs changes based on the type of building selected", () => {
    cy.get("#quote-nav").click();
    cy.get("#building-type").select("residential");
    cy.get(".card-heading").each(($header) => {
      cy.wrap($header).should("have.css", "background-color", "rgb(12, 149, 238)");
    });

    cy.get("#building-type").select("commercial");
    cy.get(".card-heading").each(($header) => {
      cy.wrap($header).should("have.css", "background-color", "rgb(252, 70, 70)");
    });

    cy.get("#building-type").select("industrial");
    cy.get(".card-heading").each(($header) => {
      cy.wrap($header).should("have.css", "background-color", "rgb(190, 190, 190)");
    });
  });

  it("T9 - Styling 11 - Residential (light blue), Commercial (light red), Industrial (gray, no change)", () => {
    cy.get('#quote-nav').click();

    cy.get("#building-type").select("residential");
    cy.get(".card-heading").should("have.css", "background-color", "rgb(12, 149, 238)");

    cy.get("#building-type").select("commercial");
    cy.get(".card-heading").should("have.css", "background-color", "rgb(252, 70, 70)");

    cy.get("#building-type").select("industrial");
    cy.get(".card-heading").should("have.css", "background-color", "rgb(190, 190, 190)");
  });

  it("T10 - Form - All required (*) fields are validated", () => {
    cy.get("#fullname").should("be.visible");
    cy.get('input[id="fullname"]')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get('input[id="fullname"]')
      .type("test")
      .then(($el) => $el[0].checkValidity())
      .should("be.true");

    cy.get("#email").should("be.visible");
    cy.get('input[id="email"]')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get('input[id="email"]')
      .type("testgmail.com")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get('input[id="email"]')
      .clear()
      .type("test@gmail.com")
      .then(($el) => $el[0].checkValidity())
      .should("be.true");

    cy.get("#phone").should("be.visible");
    cy.get('input[id="phone"]')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get('input[id="phone"]')
      .type("test")
      .then(($el) => $el[0].checkValidity())
      .should("be.true");

    cy.get("#company_name").should("be.visible");
    cy.get('input[id="company_name"]')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get('input[id="company_name"]')
      .type("test")
      .then(($el) => $el[0].checkValidity())
      .should("be.true");

    cy.get("#project_name").should("be.visible");
    cy.get('input[id="project_name"]')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get('input[id="project_name"]')
      .type("test")
      .then(($el) => $el[0].checkValidity())
      .should("be.true");

    cy.get("#project_desc").should("be.visible");
    cy.get('input[id="project_desc"]')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get('input[id="project_desc"]')
      .type("test")
      .then(($el) => $el[0].checkValidity())
      .should("be.true");

    cy.get("#department").should("be.visible");
    cy.get('select[id="department"]')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get('select[id="department"]')
      .select("Residential")
      .then(($el) => $el[0].checkValidity())
      .should("be.true");
    cy.get('select[id="department"]')
      .select("Commercial")
      .then(($el) => $el[0].checkValidity())
      .should("be.true");

    cy.get("#message").should("be.visible");
    cy.get('textarea[id="message"]')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get('textarea[id="message"]')
      .type("test")
      .then(($el) => $el[0].checkValidity())
      .should("be.true");
  });

  it("T11 - Form 2 - Only image files are accepted as attachments", () => {
    cy.get("#attachment").should("exist");
    cy.get("#attachment").should(
      "have.attr",
      "accept",
      "image/png, image/gif, image/jpeg, image/jpg"
    );
  });

  it("T12 - Form 3 - When sending the form, a POST request is sent to the API", () => {
    cy.get("#contact-nav").click();
    cy.get("#fullname").type("TestName");
    cy.get("#email").type("Tes@gmail.com");
    cy.get("#phone").type("1234567");
    cy.get("#company_name").type("test Inc");
    cy.get("#project_name").type("test that");
    cy.get("#project_desc").type("this test");
    cy.get("#department").select("Residential");
    cy.get("#message").type("its a test");
    cy.get(".col-md-12 > .btn").click();
    cy.request({
      method: "POST",
      url: "/api/contact",
      body: {
        name: "contact",
      },
    }).then(({ status }) => {
      expect(status).to.eq(200);
    });
  });

  it("T13 - Form 4 - The response of the POST request is communicated to the front end", () => {
    cy.get("#contact-nav").click();
    cy.get("#fullname").type("TestName");
    cy.get("#email").type("Tes@gmail.com");
    cy.get("#phone").type("1234567");
    cy.get("#company_name").type("test Inc");
    cy.get("#project_name").type("test that");
    cy.get("#project_desc").type("this test");
    cy.get("#department").select("Residential");
    cy.get("#message").type("its a test");
    cy.get(".col-md-12 > .btn").click();
    cy.get("#postResult").should("exist");
  });

  it("T14 - Residential Services - a GET request to retrieve a list of agents is sent to the API", () => {
    cy.request("GET", "http://99.79.77.144:3000/api/agents").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.be.empty;
      expect(response.body).to.be.an("array");

      response.body.forEach((agent) => {
        expect(agent).to.have.property("first_name");
        expect(agent).to.have.property("last_name");
      });
    });
  });

  it("T15 - Residential Services 3 - Only agents with a rating >= 95 are visible", () => {
    cy.visit("/residential.html");
    cy.request("GET", "http://99.79.77.144:3000/api/agents");

    cy.get("#agent-table-body tr").should("have.length", 4);
    cy.get("#agent-table-body tr").each(($row) => {
      const rating = Number($row.find("td").eq(4).text());
      expect(rating).to.be.at.least(95);
    });
  });

  it("T16 - Residential Services 4 - The table contains a proper title and proper column names", () => {
    cy.get("#residential-nav").click({ force: true });
    cy.get(".heading-title > h2").contains("Top Rating Agent", {
      matchCase: false,
    });
    cy.get("#first_name").should("be.visible");
    cy.get("#last_name").should("be.visible");
    cy.get("#regions").should("be.visible");
  });

  it("T17 - Residential Services 5 - The table is sortable by last name", () => {
    cy.get("#residential-nav").click({ force: true });
    cy.get("#last_name").click();
    cy.get("table tbody tr").map("innerText").then(console.log);
    cy.get("table thead").table().then(console.table);
    cy.get("table thead").table(2, 0).map(Number).should("be.sorted");
  });

  it("T18 - Residential Services 6 - The table is sortable by first name", () => {
    cy.get("#residential-nav").click({ force: true });
    cy.get("#first_name").click();
    cy.get("table tbody tr").map("innerText").then(console.log);
    cy.get("table thead").table().then(console.table);
    cy.get("table thead").table(1).map(Number).should("be.sorted");
  });

  it("T19 - Residential Services 7 - The table is filterable by region", () => {
    cy.get("#residential-nav").click({ force: true });
    cy.get("#regions").select("North");
    cy.get("table thead th").map("innerText").then(console.log);
    cy.get("table thead").table().then(console.table);
    cy.get("table thead").table(5, 0).map(Number).should("be.sorted");
  });
});
