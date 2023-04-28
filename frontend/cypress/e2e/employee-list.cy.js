const devAppUrl = Cypress.config().baseUrl;

describe('Employee List Component', () => {
    beforeEach(() => {
        cy.visit(`${devAppUrl}/employee-list`);
    });

    it('should display employee list with All columns', () => {
        cy.get('table').should('be.visible');
        cy.get('thead > tr > th').should('have.length', 5);
        cy.get('th.mat-column-firstName').should('have.text', 'First Name');
        cy.get('th.mat-column-lastName').should('have.text', 'Last Name');
        cy.get('th.mat-column-email').should('have.text', 'Email');
        cy.get('th.mat-column-department').should('have.text', 'Department');
        cy.get('th.mat-column-action').should('have.text', 'Action');
    });

    it('should filter the employee list based on search term', () => {
        cy.get('input[placeholder="Search"]').type('Miranda');
        //cy.get('table > tbody > tr').should('have.length', 1);
        cy.get('table > tbody > tr > td:nth-child(1)').should('have.text', 'Miranda');
        cy.get('table > tbody > tr > td:nth-child(2)').should('have.text', 'Bailey');
    });



    /*
it('should delete an employee from the list', () => {
  cy.get('.mat-table').should('be.visible');
  cy.get('.mat-row').first().as('employee');
  cy.get('@employee').find('[data-testid="delete-button"]').click();
  cy.get('[data-testid="confirm-delete-button"]').click();
  cy.get('.mat-row').should('have.length', 9);
});*/
});
