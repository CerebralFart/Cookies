const { defineConfig } = require("rollup");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/integration/*.cy.js",
    fileServerFolder: "./",
  },
});
