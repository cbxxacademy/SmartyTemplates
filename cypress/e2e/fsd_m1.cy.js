/// <reference types="cypress" />

describe("Web Dev 1", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("T1 - Smarty references - All Smarty references have been removed", () => {
    cy.get("body").should("not.contain", "smarty");
    cy.get(".logo > img")
      .should("exist")
      .and("have.attr", "src", "assets/images/rocketElevators/rocketLogo.png");
  });

  it("T2 - Browser tab - The name and logo of company appears in browser tab", () => {
    cy.document()
      .find('head link[rel="icon"]')
      .first()
      .then(($link) => $link.attr("href"))
      .then((href) => {
        cy.get("body").then(($body) => {
          $body
            .empty()
            .append(`<img id="favicon" src="${href}">`);
        });
        cy.get("#favicon")
          .should("exist")
          .and(
            "have.attr",
            "src",
            "./assets/images/rocketElevators/favicon.ico"
          );
      });
  });

  it("T3 - Validate 3x Sliders", () => {
    cy.get('li[data-transition="parallaxtotop"]').eq(2);
  });

  it("T4 - Slide - The home slide contains a link to the Quote form", () => {
    cy.get('li[data-transition="parallaxtotop"]').first().should("exist");
    cy.get('a[href*="quote.html"]').should("be.visible");
    cy.get('a[href*="quote.html"]').then((link) => {
      cy.request(link.prop("href")).its("status").should("eq", 200);
    });
  });

  it("T5 - Slide 2 - The residential slide contains a link to the Residential page", () => {
    cy.get('li[data-transition="parallaxtotop"]').next().should("exist");
    cy.get('a[href*="residential.html"]').should("be.visible");
    cy.get('a[href*="residential.html"]').then((link) => {
      cy.request(link.prop("href")).its("status").should("eq", 200);
    });
  });

  it("T6 - Slide 3 - The commercial slide contains a link to the Commercial page", () => {
    cy.get('li[data-transition="parallaxtotop"]').last().should("exist");
    cy.get('a[href*="commercial.html"]').should("be.visible");
    cy.get('a[href*="commercial.html"]').then((link) => {
      cy.request(link.prop("href")).its("status").should("eq", 200);
    });
  });

  it("T7 - Services card - The card publicizes the awards and portfolio and contains a link towards that section", () => {
    cy.get("#services > .container > .row > :nth-child(1)").should("exist");
    cy.get('a[href*="#portfolio"]').should("exist");
    cy.get('a[href*="#portfolio"]').then((link) => {
      cy.request(link.prop("href")).its("status").should("eq", 200);
    });
  });

  it("T8 - Services card 2 - The card publicizes the Residential service and contains a link towards the Residential page", () => {
    cy.get("#services > .container > .row > :nth-child(2)").should("exist");
    cy.get('a[href*="residential.html"]').should("be.visible");
    cy.get('a[href*="residential.html"]').then((link) => {
      cy.request(link.prop("href")).its("status").should("eq", 200);
    });
  });

  it("T9 - Services card 3 - The card publicizes the Commercial service and contains a working link towards the Commercial page", () => {
    cy.get("#services > .container > .row > :nth-child(3)").should("exist");
    cy.get('a[href*="commercial.html"]').should("be.visible");
    cy.get('a[href*="commercial.html"]').then((link) => {
      cy.request(link.prop("href")).its("status").should("eq", 200);
    });
  });

  it("T10 - Ribon - The ribbon has the proper text", () => {
    cy.get("#parallax").should("exist");
    cy.get("#parallax > .container").contains("in business since 1976", {
      matchCase: false,
    });
  });

  it("T11 - Ribon - The Quote page link is working", () => {
    cy.get("#parallax").should("exist");
    cy.get('a[href*="quote.html"]').last().should("be.visible");
    cy.get('a[href*="quote.html"]').then((link) => {
      cy.request(link.prop("href")).its("status").should("eq", 200);
    });
  });

  it("T12 - Ribon - The Contact Us page link is working", () => {
    cy.get("#parallax").should("exist");
    cy.get('a[href*="#contact"]').last().should("be.visible");
    cy.get('a[href*="#contact"]').then((link) => {
      cy.request(link.prop("href")).its("status").should("eq", 200);
    });
  });

  it("T13 - News section - The news section contains 6 working links", () => {
    cy.get("#news > .container > .heading-title")
      .should("be.visible")
      .contains("News", {
        matchCase: false,
      });

      cy.get("#news > .container")
      .find(".img-fluid")
      .should("have.length", 6)
      .each(($img) => {
        const src = $img[0].getAttribute("src");
        cy.request(src).its("status").should("eq", 200);
      });
  });

  it("T14 - Portfolio section - A Portfolio section that features 12 recognitions or major projects", () => {
    cy.get("#portfolio").find("img.img-fluid").eq(11);
  });

  it("T15 - Scrolling ribbon - A scrolling ribbon containing images of the CEO and the Employee of the Month", () => {
    cy.get("#testimonials").find("img").eq(1);
    cy.get("#testimonials").should("exist").contains("CEO");
    cy.get("#testimonials").should("exist").contains("Employee of the month");
  });

  it("T16 - Clients section - The clients section contains the logos of twelve (12) corporate partners", () => {
    cy.get("#clients > .container > .heading-title").should("be.visible");
    cy.get("#clients").find("img.img-fluid").eq(11);
  });

  it("T17 - Clients section - 2 - The clients section corporate partners logos are consistent in size", () => {
    cy.get("#clients")
      .find("li")
      .should("have.class", "col-md-3 col-sm-3 col-6");
  });

  it("T18 - Contact us section - The contact us section contains the company contact information", () => {
    cy.get(".col-sm-4 > p > :nth-child(1)").should("exist");
    cy.get("p > :nth-child(2)").should("exist");
    cy.get("p > :nth-child(3)").should("exist");
  });

  it("T19 - Contact us section 2 - The contact us form contains the required eight (8) fields", () => {
    cy.get("#contact > .container > .text-center > h2")
      .should("be.visible")
      .contains("Contact Us");

    cy.get("#name").should("be.visible");
    cy.get("#email").should("be.visible");
    cy.get("#company_name").should("be.visible");
    cy.get("#phone").should("be.visible");
    cy.get("#project_name").should("be.visible");
    cy.get("#department").should("be.visible");
    cy.get("#project_description").should("be.visible");
    cy.get("#message").should("be.visible");
    cy.get("#attachment").should("exist");
  });

  it("T20 - Navigation Bar - The index navigation bar is visible at all times", () => {
    cy.get("#header").should("be.visible");
  });

  it("T21 - Navigation Bar - 2 - The index navigation bar contains the required six (6) sections", () => {
    cy.get('a[href*="index.html#body-wrapper"]')
      .should("exist")
      .and("contain.text", "HOME");
    cy.get('a[href*="#services"]')
      .should("exist")
      .and("contain.text", "SERVICES");
    cy.get('a[href*="#portfolio"]')
      .should("exist")
      .and("contain.text", "PORTFOLIO");
    cy.get('a[href*="#news"]').should("exist").and("contain.text", "NEWS");
    cy.get('a[href*="#clients"]')
      .should("exist")
      .and("contain.text", "CLIENTS");
    cy.get('a[href*="#contact"]')
      .should("exist")
      .and("contain.text", "CONTACT");
  });

  it("T22 - Navigation Bar 3 - All the index navigation bar links are working properly", () => {
    cy.get('a[href*="index.html#body-wrapper"]').then((link) => {
      cy.request(link.prop("href")).its("status").should("eq", 200);
    });
    cy.get('a[href*="#services"]').then((link) => {
      cy.request(link.prop("href")).its("status").should("eq", 200);
    });
    cy.get('a[href*="#portfolio"]').then((link) => {
      cy.request(link.prop("href")).its("status").should("eq", 200);
    });
    cy.get('a[href*="#news"]').then((link) => {
      cy.request(link.prop("href")).its("status").should("eq", 200);
    });
    cy.get('a[href*="#clients"]').then((link) => {
      cy.request(link.prop("href")).its("status").should("eq", 200);
    });
    cy.get('a[href*="#contact"]').then((link) => {
      cy.request(link.prop("href")).its("status").should("eq", 200);
    });
  });

  it("T23 - Residential page 2 - The residential page contains a paragraph describing or marketing the residential product", () => {
    cy.visit("residential.html");
    cy.get("#parallax_overview > .container > .row > .col-md-4").should("be.visible");
  });

  it("T24 - Commercial page 2 - The residential page contains a paragraph describing or marketing the residential product", () => {
    cy.visit("commercial.html");
    cy.get("#parallax_overview > .container > .row > .col-md-4").should("be.visible");
  });
});
