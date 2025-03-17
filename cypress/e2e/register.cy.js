/**
 * - Register spec
 *   - should display register page correctly
 *   - should display alert when name is empty
 *   - should display alert when email is empty
 *   - should display alert when email input type is not valid
 *   - should display alert when password is empty
 *   - should display alert when password and confirm password are not match
 *   - should display alert when password and confirm password are less than 6 characters
 *   - should display alert when email is already taken
 *   - should display success pop and login page (after confirm button) when registration are correct
 */

describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/register');
  });

  it('should display register page correctly', () => {
    cy.get('input[placeholder="Name"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('input[placeholder="Confirm Password"]').should('be.visible');
    cy.get('button').contains(/^Register$/).should('be.visible');
    cy.get('a').contains(/^Login here!$/).should('be.visible');
  });

  it('should display alert when name is empty', () => {
    // klik tombol registrasi tanpa mengisi nama
    cy.get('button').contains(/^Register$/).click();
    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"name" is not allowed to be empty');
    });
  });

  it('should display alert when email is empty', () => {
    // mengisi name
    cy.get('input[placeholder="Name"]').type('algy');
    // klik tombol registrasi tanpa mengisi email
    cy.get('button').contains(/^Register$/).click();
    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when email input type is not valid', () => {
    // mengisi nama
    cy.get('input[placeholder="Name"]').type('algy');
    // mengisi email tidak valid
    cy.get('input[placeholder="Email"]').type('testuser');
    // klik tombol register
    cy.get('button').contains(/^Register$/).click();
    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" must be a valid email');
    });
  });

  it('should display alert when password is empty', () => {
    // mengisi nama
    cy.get('input[placeholder="Name"]').type('algy');
    // mengisi email
    cy.get('input[placeholder="Email"]').type('testuser987123@gmail.com');
    // klik tombol register tanpa mengisi password
    cy.get('button').contains(/^Register$/).click();
    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when password and confirm password are not match', () => {
    // mengisi nama
    cy.get('input[placeholder="Name"]').type('algy');
    // mengisi email
    cy.get('input[placeholder="Email"]').type('algy25ng@gmail.com');
    // mengisi password
    cy.get('input[placeholder="Password"]').type('123456');
    // mengisi confirm password
    cy.get('input[placeholder="Confirm Password"]').type('654321');
    // menekan tombol Register
    cy.get('button').contains(/^Register$/).click();
    // memverifikasi window.alert untuk menampilkan pesan yang sesuai
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Passwords do not match. Please ensure they match and try again.');
    });
  });

  it('should display alert when password and confirm password are less than 6 characters', () => {
    // mengisi nama
    cy.get('input[placeholder="Name"]').type('algy');
    // mengisi email
    cy.get('input[placeholder="Email"]').type('algy25ng@gmail.com');
    // mengisi password
    cy.get('input[placeholder="Password"]').type('123');
    // mengisi confirm password
    cy.get('input[placeholder="Confirm Password"]').type('123');
    // menekan tombol Register
    cy.get('button').contains(/^Register$/).click();
    // memverifikasi window.alert untuk menampilkan pesan yang sesuai
    cy.on('window:alert', (str) => {
      expect(str).to.equal('password must be at least 6 characters long');
    });
  });

  it('should display alert when email is already taken', () => {
    // mengisi nama
    cy.get('input[placeholder="Name"]').type('algy');
    // mengisi email
    cy.get('input[placeholder="Email"]').type('algy25ng@gmail.com');
    // mengisi password
    cy.get('input[placeholder="Password"]').type('123123');
    // mengisi confirm password
    cy.get('input[placeholder="Confirm Password"]').type('123123');
    // menekan tombol Register
    cy.get('button').contains(/^Register$/).click();
    // memverifikasi window.alert untuk menampilkan pesan yang sesuai
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email is already taken');
    });
  });

  it('should display success pop and login page (after confirm button) when registration are correct', () => {
    const uniqueEmail = `user_${Date.now()}@example.com`; // Membuat email unik
    // Mengisi nama
    cy.get('input[placeholder="Name"]').type('algy');
    // Mengisi email
    cy.get('input[placeholder="Email"]').type(uniqueEmail);
    // Mengisi password
    cy.get('input[placeholder="Password"]').type('123123');
    // Mengisi confirm password
    cy.get('input[placeholder="Confirm Password"]').type('123123');
    // Menekan tombol Register
    cy.get('button').contains(/^Register$/).click();
    // Menunggu dan berinteraksi dengan SweetAlert2
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Akun berhasil diregistrasi, silahkan login.');
    });
    // Menunggu SweetAlert2 muncul dan klik OK
    cy.get('.swal2-confirm').should('be.visible').click();
    // Memverifikasi bahwa elemen yang berada di login page ditampilkan
    cy.get('button').contains(/^Login$/).should('be.visible');
    cy.get('a').contains(/^Sign up here!$/).should('be.visible');
  });
});