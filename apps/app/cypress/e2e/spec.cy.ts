describe('User Stories', () => {
  context(
    'GIVEN that I am a public user AND I can access a web browser',
    () => {
      context('WHEN I navigate to the application link', () => {
        it('navigate to application link', () => cy.visit('/'));

        context('THEN I can view all wildfires from the year 2023', () => {
          it('', () => {
            cy.then(() => expect(true).to.be.equal(false));
          });
        });
      });
    },
  );

  context(
    'GIVEN that I am a public user and can access the application in a browser AND I can view all the wildfires',
    () => {
      context('WHEN I change any filter', () => {
        context('THEN I can view the filtered wildfires', () => {
          it('', () => {
            cy.then(() => expect(true).to.be.equal(false));
          });
        });
      });
    },
  );

  context(
    'Given that I am a public user and can access the application in a browser And I can view all or filtered wildfires',
    () => {
      context('WHEN I click the `download` button', () => {
        context(
          'THEN I can download all or filtered wildfires list in csv or text file formats',
          () => {
            it('', () => {
              cy.then(() => expect(true).to.be.equal(false));
            });
          },
        );
      });
    },
  );
});
