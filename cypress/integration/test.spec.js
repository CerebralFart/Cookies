const Cookie = require("../../dist");
/// <reference types="cypress" />

describe("Cookie Management", () => {
  beforeEach(() => {
    cy.visit("/cypress/test.html");
    cy.clearCookies();
  });

  it("Can set cookies", async () => {
    Cookie.name = "value";
    cy.getCookie("name").should("have.property", "value", "value");
  });

  it("Can get cookies", async () => {
    await cy.setCookie("name", "value");
    expect(Cookie.name).to.eq("value");
  });

  it("Can delete cookies", async () => {
    await cy.setCookie("name", "value");
    expect(Cookie.name).to.eq("value");
    delete Cookie.name;
    expect(Cookie.name).to.be.null;
  });

  it("Can check for cookies", async () => {
    await cy.setCookie("name", "value");
    expect("name" in Cookie).to.be.true;
    expect("test" in Cookie).to.be.false;
  });

  it("Can enumerate cookies", async () => {
    Cookie.c1 = "value";
    Cookie.c2 = "value";

    const keys = Object.keys(Cookie);
    expect(keys).to.contain("c1");
    expect(keys).to.contain("c2");
    expect(keys).to.not.contain("c3");
  });
});
