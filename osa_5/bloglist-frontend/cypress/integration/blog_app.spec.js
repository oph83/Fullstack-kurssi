describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test Guy',
      username: 'test',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('username')
  })

  it('login', function() {
    cy.contains('login').click()
    cy.get('#username').type('test')
    cy.get('#password').type('salasana')
    cy.get('#login-button').click()

    cy.contains('Test Guy logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'salasana' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Cypress Test')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('www.test.com')
      cy.get('#create-button').click()
      cy.contains('Cypress Test')
    })

    it('blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Cypress Test')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('www.test.com')
      cy.get('#create-button').click()
      cy.contains('Cypress Test')
      cy.get('#view-button').click()
      cy.contains('likes')
      cy.get('#like-button').click()
      cy.contains(1)
    })

    it('blog can be removed', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Cypress Test')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('www.test.com')
      cy.get('#create-button').click()
      cy.contains('Cypress Test')
      cy.get('#view-button').click()
      cy.contains('remove')
      cy.get('#remove-button').click()
      cy.contains('Deleted Cypress Test')
    })

    it('blog cannot be removed by wrong user', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Cypress Test')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('www.test.com')
      cy.get('#create-button').click()
      cy.contains('logout')
      cy.get('#logout-button').click()
      const user = {
        name: 'Test Guy2',
        username: 'test2',
        password: 'salasana2'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.login({ username: 'test2', password: 'salasana2' })
      cy.get('#view-button').click()
      cy.get('html').should('not.contain', '#remove-button')
    })

    it('likes are sorted', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Most likes')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('www.test.com')
      cy.get('#create-button').click()
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.contains(1)
      cy.get('#like-button').click()
      cy.contains(2)
      cy.contains('new blog').click()
      cy.get('#title').type('2nd most likes')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('www.test.com')
      cy.get('#create-button').click()
      cy.contains('2nd most likes')
        .contains('view').click()
      cy.get('#like-button').click()
      cy.contains('new blog').click()
      cy.get('#title').type('3rd most likes')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('www.test.com')
      cy.get('#create-button').click()
      cy.get('.blog').eq(0).should('contain', 'Most likes')
      cy.get('.blog').eq(1).should('contain', '2nd most likes')
      cy.get('.blog').eq(2).should('contain', '3rd most likes')
    })
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('test')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')

    cy.get('html').should('not.contain', 'Test Guy logged in')
  })
})