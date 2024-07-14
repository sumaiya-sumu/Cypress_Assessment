describe('Automation Exercise Scenario', () => {
    it('should complete the given scenario', () => {
        // Generate a unique email address
        const uniqueEmail = `sumaiya+${Date.now()}@gmail.com`;
        cy.log(`Generated Email: ${uniqueEmail}`);

        // 1. Launch browser and navigate to URL
        cy.visit('http://automationexercise.com');

        // 2. Verify that the home page is visible successfully
        cy.get('body').should('be.visible');

        // 3. Navigate to the "Products" section
        cy.get('.shop-menu > .nav > :nth-child(2) > a').click();

        // 4. Add products to the cart
        //Scroll 
        cy.get(':nth-child(6) > .product-image-wrapper > .single-products > .productinfo > .btn').scrollIntoView()
        cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
        cy.get('.modal-footer > .btn').click();
        cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
        cy.get('.modal-footer > .btn').click();

        // 5. View the cart
        cy.get('.shop-menu > .nav > :nth-child(3) > a').click();

        // 6. Verify that the cart page is displayed
        cy.url().should('include', '/view_cart');

        // 7. Proceed to checkout
        cy.get('.cart_quantity_delete').should('be.visible'); // Ensure cart items are visible
        cy.get('.btn.btn-default.check_out').click();

        // 8. Register a new account
        cy.get('.modal-body > :nth-child(2) > a > u').click();
        cy.get('[data-qa="signup-name"]').type('Sumaiya');
        cy.get('.signup-form > form > [type="email"]').type(uniqueEmail);
        cy.get('[data-qa="signup-button"]').click();

        // 9. Fill in the registration form
        cy.get('#id_gender2').check();
        cy.get('[data-qa="password"]').type('Sumaiya123');
        cy.get('[data-qa="days"]').select('1');
        cy.get('[data-qa="months"]').select('January');
        cy.get('[data-qa="years"]').select('2000');
        cy.get('#newsletter').check();
        cy.get('[data-qa="first_name"]').type('Mirpur');
        cy.get('[data-qa="last_name"]').type('Dhaka');
        cy.get('[data-qa="company"]').type('DhakaCompany');
        cy.get('[data-qa="address"]').type('123 Mirpur Street');
        cy.get('[data-qa="address2"]').type('Apt 4B');
        cy.get('[data-qa="country"]').select('India');
        cy.get('[data-qa="state"]').type('Tamil Nadu');
        cy.get('[data-qa="city"]').type('Delhi');
        cy.get('[data-qa="zipcode"]').type('12345');
        cy.get('[data-qa="mobile_number"]').type('01626300967');
        cy.get('[data-qa="create-account"]').click();

        // 10. Verify account creation and continue
        cy.contains('b').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();

        // 11. Verify login status
        cy.get(':nth-child(10) > a').should('be.visible');

        // 12. Navigate to the cart again
        cy.get('.shop-menu > .nav > :nth-child(3) > a').click();

        // 13. Proceed to checkout
        cy.get('.btn.btn-default.check_out').click();

        // 14. Verify address details and review order
        cy.get('#address_delivery').should('be.visible');
        cy.get('#address_invoice').should('be.visible');
        cy.get(':nth-child(4) > .cart_total_price').should('be.visible');

        // 15. Enter a comment and place the order
        cy.get('.form-control').type('Please deliver between 9 AM and 5 PM and do not call me! -Sumaiya.');
        cy.get('.btn.btn-default.check_out').click();

        // 16. Enter payment details
        cy.get('[data-qa="name-on-card"]').type('Sumaiya');
        cy.get('[data-qa="card-number"]').type('1234567812345678');
        cy.get('[data-qa="cvc"]').type('123');
        cy.get('[data-qa="expiry-month"]').type('12');
        cy.get('[data-qa="expiry-year"]').type('30');

        // 17. Pay and confirm the order
        cy.get('[data-qa="pay-button"]').click();

        // 18. Verify order success message
        cy.get('.col-sm-9 > p').should('be.visible');
    });
});
