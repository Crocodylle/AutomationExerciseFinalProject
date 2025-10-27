const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'automation-exercise',
  e2e: {
    baseUrl: 'https://automationexercise.com',
    pageLoadTimeout: 30000,
    defaultCommandTimeout: 10000,
    requestTimeout: 30000,
    responseTimeout: 30000,
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      // Implementar plugins aqui se necessário
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome-report',
    reportFilename: '[status]_[datetime]-[name]-report',
    html: true,
    json: true,
    overwrite: false,
    timestamp: 'longDate',
  },
});
