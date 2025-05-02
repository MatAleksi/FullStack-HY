describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testi Käyttäjä',
      username: 'testiukko',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('#loginButton').should('be.visible')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testiukko')
      cy.get('#password').type('salasana')
      cy.get('#loginButton').click()
      cy.contains('Logged in as Testi Käyttäjä')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('ukkotesti')
      cy.get('#password').type(('sanasala'))
      cy.get('#loginButton').click()
      cy.contains('Wrong password or username')
      cy.get('#username').should('be.visible')
      cy.get('#password').should('be.visible')
      cy.get('#loginButton').should('be.visible')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testiukko')
      cy.get('#password').type('salasana')
      cy.get('#loginButton').click()
    })

    it('A blog can be created', function() {
      cy.get('#createButton').click()
      cy.get('#title').type('Testi blogi')
      cy.get('#author').type('Testi kirjoittaja')
      cy.get('#url').type('http://testi.fi')
      cy.get('#submitButton').click()
      cy.contains('Testi blogi')
      cy.contains('Testi kirjoittaja')
    })

    it('A blog can be liked', function() {
      cy.get('#createButton').click()
      cy.get('#title').type('Testi blogi')
      cy.get('#author').type('Testi kirjoittaja')
      cy.get('#url').type('http://testi.fi')
      cy.get('#submitButton').click()

      cy.get('#viewButton').click()
      cy.get('#likeButton').click()
      cy.contains('1 likes')
    })
    it('A blog can be removed', function() {
      cy.get('#createButton').click()
      cy.get('#title').type('Testi blogi')
      cy.get('#author').type('Testi kirjoittaja')
      cy.get('#url').type('http://testi.fi')
      cy.get('#submitButton').click()

      cy.get('#viewButton').click()
      cy.get('#removeButton').click()
      cy.contains('Testi blogi').should('not.exist')
    })
  })
  describe('Wrong user', function(){
    it('cannot remove a blog', function() {
      const user2 = {
        name: 'Testi Käyttäjä2',
        username: 'testiukko2',
        password: 'salasana2'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user2)
      cy.get('#username').type('testiukko2')
      cy.get('#password').type('salasana2')
      cy.get('#loginButton').click()

      cy.get('#createButton').click()
      cy.get('#title').type('Testi blogi')
      cy.get('#author').type('Testi kirjoittaja')
      cy.get('#url').type('http://testi.fi')
      cy.get('#submitButton').click()

      cy.get('#logoutButton').click()

      cy.get('#username').type('testiukko')
      cy.get('#password').type('salasana')
      cy.get('#loginButton').click()

      cy.get('#viewButton').click()
      cy.get('#removeButton').should('not.exist')
    })
  })
})