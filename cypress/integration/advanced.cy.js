const Cookie = require("../../dist");
/// <reference types="cypress" />

describe("Cookie Management", () => {
  beforeEach(() => {
    cy.visit("/cypress/test.html");
    cy.clearCookies();
  });

  it("Can be used as string", async () => {
    const value = "value";
    const cookie = new Cookie(value);
    for (let i = 0; i < value.length; i++) {
      expect(cookie.charAt(i)).to.eq(value[i]);
    }
  });

  it("Can set cookies", async () => {
    Cookie.name = new Cookie("value");
    cy.getCookie("name").should("have.property", "value", "value");
  });

  it("Can't set cookies in another folder", async () => {
    Cookie.name = new Cookie("value", { path: "/wrong-folder/" });
    cy.getCookie("name").should("be.null");
  });

  it("Can't use protected names", async () => {
    try {
      Cookie.prototype = "text";
      expect(true).to.be.false;
    } catch (e) {
      expect(e.message).to.contain("protected name");
      expect(e.message).to.contain("prototype");
    }
  });

  it("Respects expiry", async () => {
    Cookie.name = new Cookie("value", { expires: new Date("01-01-1970") });
    cy.getCookie("name").should("be.null");
  });

  it("Respects max age", async () => {
    Cookie.name = new Cookie("value", { maxAge: 1 });
    cy.getCookie("name").should("have.property", "value", "value");
    await new Promise((res) => setTimeout(res, 2000));
    cy.getCookie("name").should("be.null");
  });

  it("Is RFC 6265 compliant", () => {
    Cookie.name = new Cookie("=%{[ValueWithSpecialChars]}%=");
    cy.getCookie("name").should(
      "have.property",
      "value",
      "%3D%25%7B%5BValueWithSpecialChars%5D%7D%25%3D"
    );
    expect(Cookie.name).to.eq("=%{[ValueWithSpecialChars]}%=");
  });
});
