const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'n19jg5',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  reporter: 'mochawesome',
});
