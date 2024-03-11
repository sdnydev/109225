import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('that I am a public user and I can access a browser', () => {});

When('I navigate to the application link', () => {
  cy.intercept('GET', 'v1/fires*').as('getFires');
  cy.intercept('GET', 'v1/fires/metadata').as('getMetadata');
  cy.visit('/');
  cy.wait('@getFires');
  cy.wait('@getMetadata');
});

Then('I can view all the wildfires from the year 2023', () => {
  expect(cy.get('[data-cy="heading"]')).to.exist;
  expect(cy.get('[data-cy="map"]')).to.exist;
  expect(cy.get('[data-cy="filters"]')).to.exist;
  expect(cy.get('[data-cy="download-buttons"]')).to.exist;
  expect(cy.get('[data-cy="table"]')).to.exist;
});

Given(
  'that I am a public user and can access the application in a browser and I can view all the wildfires',
  () => {
    cy.intercept('GET', 'v1/fires*').as('getFires');
    cy.intercept('GET', 'v1/fires/metadata').as('getMetadata');
    cy.visit('/');
    cy.wait('@getFires');
    cy.wait('@getMetadata');
  },
);
When('I change any filter', () => {
  cy.url().should('contain', '?page=1');

  cy.get('[data-cy="geographic-description"]')
    .click()
    .type('1.2 km W of Heyde Creek{enter}');
});

Then('I can view the filtered wildfires', () => {
  cy.get('[data-cy="geographic-description"]').click().type('{enter}');

  cy.url().should(
    'contain',
    '?page=1&geographic_description=1.2+km+W+of+Heyde+Creek',
  );
});

Given(
  'that I am a public user and can access the application in a browser and I can view all or filtered wildfires',
  () => {
    cy.intercept('GET', 'v1/fires*').as('getFires');
    cy.intercept('GET', 'v1/fires/metadata').as('getMetadata');
    cy.visit('/');
    cy.wait('@getFires');
    cy.wait('@getMetadata');
  },
);
When('I click `download` button', () => {
  cy.get('[data-cy="download-current-page"]').click();
});
Then(
  'I can download all or filtered wildfires list in csv or text file formats',
  () => {
    cy.verifyDownload('fire-data-one-page.csv');
  },
);
