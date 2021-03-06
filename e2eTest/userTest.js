
import { userDataGenerator } from './mock/userDataGenerator';

const { username, password, email } = userDataGenerator;
module.exports = {
  'it should return an error text when invalid details are inputed': (client) => {
    client
      .url('http://localhost:7070/login')
      .pause(1000)
      .waitForElementVisible('body', 500)
      .setValue('input[name=username]', 'gvhvhgv')
      .setValue('input[name=password]', 'tfcgcgcvg')
      .click('#loginbtn')
      .waitForElementVisible('p', 600)
      .assert.containsText('.help-block', 'please enter valid details')
      .pause(600);
  },

  'it should toast an error message when invalid details are inputed': (client) => {
    client
      .url('http://localhost:7070/login')
      .waitForElementVisible('body', 500)
      .pause(1000)
      .setValue('input[name=username]', 'gvhvhgv')
      .pause(1000)
      .setValue('input[name=password]', 'tfcgcgcvg')
      .pause(1000)
      .click('#loginbtn')
      .waitForElementVisible('.toast', 600)
      .assert.containsText('.toast', 'please enter valid details')
      .pause(600);
  },
  'It should not register a user if firstname is less than two': (client) => {
    client
      .url('http://localhost:7070/signup')
      .waitForElementVisible('body', 500)
      .setValue('input[name=firstName]', 'n')
      .pause(1000)
      .setValue('input[name=lastName]', 'n')
      .pause(1000)
      .setValue('input[name=email]', 'n@gkhjh.com')
      .pause(1000)
      .setValue('input[name=username]', 'n')
      .pause(1000)
      .setValue('input[name=password]', 'n')
      .pause(1000)
      .click('#signUbtn')
      .waitForElementVisible('p', 500)
      .assert.containsText('.help-block', 'firstname length should be more than ')
      .pause(600);
  },
  'It should not register a user if lastname is less than two': (client) => {
    client
      .url('http://localhost:7070/signup')
      .waitForElementVisible('body', 500)
      .setValue('input[name=firstName]', 'TosmakPac')
      .pause(1000)
      .setValue('input[name=lastName]', 'n')
      .pause(1000)
      .setValue('input[name=email]', 'n@gkhjh.com')
      .pause(1000)
      .setValue('input[name=username]', 'n')
      .pause(1000)
      .setValue('input[name=password]', 'n')
      .pause(1000)
      .click('#signUbtn')
      .waitForElementVisible('p', 500)
      .assert.containsText('.help-block', 'lastname length should be more than ')
      .pause(600);
  },
  'It should not register a user if email is invalid': (client) => {
    client
      .url('http://localhost:7070/signup')
      .waitForElementVisible('body', 500)
      .setValue('input[name=firstName]', 'TosmakPac')
      .pause(1000)
      .setValue('input[name=lastName]', 'Roy')
      .pause(1000)
      .setValue('input[name=email]', 'n@gvn')
      .pause(1000)
      .setValue('input[name=username]', 'fakeuser')
      .pause(1000)
      .setValue('input[name=password]', 'fakepassword')
      .click('#signUbtn')
      .waitForElementVisible('p', 500)
      .assert.containsText('.help-block', 'Field must contain a valid email address')
      .pause(600);
  },
  'It should not register a user if password length is less than 6': (client) => {
    client
      .url('http://localhost:7070/signup')
      .waitForElementVisible('body', 500)
      .setValue('input[name=firstName]', 'TosmakPac')
      .pause(1000)
      .setValue('input[name=lastName]', 'Roy')
      .pause(1000)
      .setValue('input[name=email]', 'n@gvn.com')
      .pause(1000)
      .setValue('input[name=username]', 'n')
      .pause(1000)
      .setValue('input[name=password]', 'n')
      .pause(1000)
      .click('#signUbtn')
      .waitForElementVisible('p', 500)
      .assert.containsText('.help-block', 'password length should be more than 5')
      .pause(600);
  },
  'It should not register a user if username length is less than 3': (client) => {
    client
      .url('http://localhost:7070/signup')
      .waitForElementVisible('body', 500)
      .setValue('input[name=firstName]', 'TosmakPac')
      .pause(1000)
      .setValue('input[name=lastName]', 'Roy')
      .pause(1000)
      .setValue('input[name=email]', 'n@gvn.com')
      .setValue('input[name=username]', 'n')
      .pause(1000)
      .setValue('input[name=password]', '123456')
      .pause(1000)
      .click('#signUbtn')
      .waitForElementVisible('p', 500)
      .assert.containsText('.help-block', 'username length should be more than 2')
      .pause(600);
  },
  'It should register a user if all credentials are valid': (client) => {
    client
      .url('http://localhost:7070/signup')
      .waitForElementVisible('body', 500)
      .setValue('input[name=firstName]', 'TosmakPac')
      .pause(1000)
      .setValue('input[name=lastName]', 'Roy')
      .pause(1000)
      .setValue('input[name=email]', email.toString())
      .pause(1000)
      .setValue('input[name=username]', `${username.toString()}`)
      .pause(1000)
      .setValue('input[name=password]', password.toString())
      .pause(1000)
      .click('#signUbtn')
      .waitForElementVisible('.toast', 500)
      .assert.containsText('.toast', 'Account created')
      .assert.urlEquals('http://localhost:7070/login')
      .pause(600);
  },
  'It should not register a new user if username already exist': (client) => {
    client
      .url('http://localhost:7070/signup')
      .waitForElementVisible('body', 500)
      .setValue('input[name=firstName]', 'TosmakPac')
      .pause(1000)
      .setValue('input[name=lastName]', 'Roy')
      .pause(1000)
      .setValue('input[name=email]', email.toString())
      .pause(1000)
      .setValue('input[name=username]', username.toString())
      .pause(1000)
      .setValue('input[name=password]', password.toString())
      .pause(1000)
      .click('#signUbtn')
      .waitForElementVisible('.toast', 500)
      .assert.containsText('.toast', 'username already exist')
      .assert.urlEquals('http://localhost:7070/signup')
      .pause(600);
  },

  'It should not register a new user if email already exist': (client) => {
    client
      .url('http://localhost:7070/signup')
      .waitForElementVisible('body', 500)
      .setValue('input[name=firstName]', 'TosmakPac')
      .pause(1000)
      .setValue('input[name=lastName]', 'Roy')
      .pause(1000)
      .setValue('input[name=email]', email.toString())
      .pause(1000)
      .setValue('input[name=username]', `${username.toString()}new`)
      .pause(1000)
      .setValue('input[name=password]', password.toString())
      .click('#signUbtn')
      .waitForElementVisible('.toast', 500)
      .assert.containsText('.toast', 'email already exist')
      .assert.urlEquals('http://localhost:7070/signup')
      .pause(600);
  },
  'it should login a user with valid credentials': (client) => {
    client
      .url('http://localhost:7070/login')
      .waitForElementVisible('body', 500)
      .pause(1000)
      .setValue('input[name=username]', username.toString())
      .pause(1000)
      .setValue('input[name=password]', password.toString())
      .click('#loginbtn')
      .waitForElementVisible('#search', 500)
      .waitForElementVisible('.toast', 600)
      .assert.containsText('.toast', 'You have successfully logged in')
      .assert.urlEquals('http://localhost:7070/books')
      .pause(600);
  },
  'logged in user should be a able to borrow a book': (client) => {
    client
      .url('http://localhost:7070/books')
      .pause(10000)
      .waitForElementVisible('body', 500)
      .waitForElementVisible('img#book_img', 500)
      .waitForElementVisible('input#search', 600)
      .useXpath()
      .waitForElementVisible('//*[@id="6"]', 6000)
      .pause(1000)
      .click('//*[@id="6"]')
      .useCss()
      .waitForElementVisible('button#borrowbtn', 600)
      .assert.urlEquals('http://localhost:7070/book/details')
      .click('button#borrowbtn')
      .pause(1000)
      .waitForElementVisible('#modal1', 600)
      .waitForElementVisible('#btn-no', 600)
      .waitForElementVisible('#btn-yes', 600)
      .pause(1000)
      .click('#btn-yes')
      .waitForElementVisible('#modal3', 600)
      .pause(1000)
      .waitForElementVisible('.displaySuccessMessage', 600)
      .assert.containsText('.displaySuccessMessage', 'Book added to personal shelf. happy reading!')
      .pause(600);
  },
  'basic user should not be a able to borrow unreturned book': (client) => {
    client
      .url('http://localhost:7070/books')
      .waitForElementVisible('body', 500)
      .waitForElementVisible('img#book_img', 500)
      .waitForElementVisible('input#search', 600)
      .useXpath()
      .waitForElementVisible('//*[@id="6"]', 6000)
      .pause(1000)
      .click('//*[@id="6"]')
      .useCss()
      .waitForElementVisible('button#borrowbtn', 600)
      .assert.urlEquals('http://localhost:7070/book/details')
      .click('button#borrowbtn')
      .waitForElementVisible('#modal1', 600)
      .waitForElementVisible('#btn-no', 600)
      .waitForElementVisible('#btn-yes', 600)
      .pause(1000)
      .click('#btn-yes')
      .pause(1000)
      .waitForElementVisible('#modal2', 600)
      .waitForElementVisible('.displayErrorMessage', 600)
      .assert.containsText('.displayErrorMessage', 'You have borrowed this book before !')
      .pause(600);
  },
  'loggged in user should be a able to read borrowed book': (client) => {
    client
      .url('http://localhost:7070/dashboard')
      .waitForElementVisible('body', 500)
      .waitForElementVisible('h4', 600)
      .waitForElementVisible('button.material-icons.green-text', 600)
      .waitForElementVisible('button.material-icons.red-text', 600)
      .assert.containsText('h4', 'Current Reads')
      .assert.urlEquals('http://localhost:7070/dashboard')
      .pause(1000)
      .click('button.material-icons.green-text')
      .pause(1000)
      .waitForElementVisible('#pdf_reader', 600)
      .waitForElementVisible('.ReactPDF__Page__canvas', 60000)
      .waitForElementVisible('canvas', 60000)
      .pause(1000)
      .moveToElement('.ReactPDF__Page__canvas', 10, 10)
      .pause(1000)
      .click('button.keyboard_arrow_right')
      .pause(1000)
      .moveToElement('.ReactPDF__Page__canvas', 10, 10)
      .pause(1000)
      .click('button.keyboard_arrow_left')
      .pause(1000)
      .moveToElement('.ReactPDF__Page__canvas', 10, 10)
      .pause(1000)
      .click('button.close')
      .waitForElementVisible('button.material-icons.green-text', 600)
      .waitForElementVisible('button.material-icons.red-text', 600)
      .assert.containsText('h4', 'Current Reads')
      .pause(600);
  },
  'loggged in user should be a book to return a borrowed book': (client) => {
    client
      .url('http://localhost:7070/dashboard')
      .waitForElementVisible('body', 500)
      .waitForElementVisible('h4', 600)
      .waitForElementVisible('button.material-icons.green-text', 600)
      .waitForElementVisible('button.material-icons.red-text', 600)
      .assert.containsText('h4', 'Current Reads')
      .click('button.material-icons.red-text')
      .useXpath()
      .waitForElementVisible('//*[@id="modal1"]', 6000)
      .waitForElementVisible('//*[@id="modal1"]/div[1]', 600)
      .waitForElementVisible('//*[@id="modal1"]/div[2]/a[1]', 600)
      .waitForElementVisible('//*[@id="modal1"]/div[2]/a[2]', 600)
      .click('//*[@id="modal1"]/div[2]/a[2]')
      .waitForElementVisible('//*[@id="modal3"]', 600)
      .waitForElementVisible('//*[@id="modal3"]/div[1]/p', 600)
      .waitForElementVisible('//*[@id="modal3"]/div[2]/a', 600)
      .assert.containsText('//*[@id="modal3"]/div[1]/p', 'book has been returned successfully')
      .click('//*[@id="modal3"]/div[2]/a')
      .pause(600);
  },

  'loggged in user should be a book to see their borrowed books history': (client) => {
    client
      .url('http://localhost:7070/dashboard')
      .useXpath()
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[2]/a', 600)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[3]/a', 600)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[4]/a', 600)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[5]/a', 600)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[6]/a', 600)
      .pause(1000)
      .click('//*[@id="sidebar-wrapper"]/ul/li[4]/a')
      .pause(1000)
      .waitForElementVisible('//*[@id="bh_table"]/div/h4', 600)
      .waitForElementVisible('//*[@id="table_bh"]', 600)
      .assert.containsText('//*[@id="bh_table"]/div/h4', 'Read List')
      .assert.urlEquals('http://localhost:7070/dashboard/history')
      .pause(600);
  },
  'loggged in user should be able to see and change their account details': (client) => {
    client
      .url('http://localhost:7070/dashboard')
      .useXpath()
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[2]/a', 600)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[3]/a', 600)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[4]/a', 600)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[5]/a', 600)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[6]/a', 600)
      .pause(1000)
      .click('//*[@id="sidebar-wrapper"]/ul/li[3]/a')
      .assert.urlEquals('http://localhost:7070/dashboard/userprofile')
      .waitForElementVisible('//*[@id="b_page"]/form', 600)
      .waitForElementVisible('//*[@id="b_page"]/form/h4', 600)
      .assert.containsText('//*[@id="b_page"]/form/h4', 'Personal Info')
      .useCss()
      .waitForElementVisible('#editbtn', 600)
      .waitForElementVisible('#firstname', 600)
      .waitForElementVisible('#lastname', 600)
      .waitForElementVisible('#inputPhoneNumber', 600)
      .pause(1000)
      .click('#editbtn')
      .pause(200)
      .setValue('input[name=firstName]', 'Tosmak')
      .pause(1000)
      .setValue('input[name=lastName]', 'Rolland')
      .pause(1000)
      .setValue('input[name=mobileNumber]', '07031811733')
      .pause(1000)
      .click('#editbtn')
      .useXpath()
      .waitForElementVisible('//*[@id="modalO"]', 600)
      .waitForElementVisible('//*[@id="modalO"]/div[1]/h5', 600)
      .waitForElementVisible('//*[@id="modalO"]/div[2]/a[2]', 600)
      .assert.containsText('//*[@id="modalO"]/div[1]/h5', 'Do you want to update your details?')
      .pause(1000)
      .click('//*[@id="modalO"]/div[2]/a[2]')
      .pause(1000)

      .waitForElementVisible('//*[@id="modalS"]', 600)
      .waitForElementVisible('//*[@id="modalS"]/div[1]/p', 600)
      .waitForElementVisible('//*[@id="modalS"]/div[2]/a', 600)
      .pause(1000)
      .assert.containsText('//*[@id="modalS"]/div[1]/p', 'Details has been updated')
      .click('//*[@id="modalS"]/div[2]/a')
      .pause(600);
  },

  'loggged in user should be a able to change their password': (client) => {
    client
      .url('http://localhost:7070/dashboard')
      .useXpath()
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[2]/a', 600)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[3]/a', 600)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[4]/a', 600)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[5]/a', 600)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[6]/a', 600)
      .click('//*[@id="sidebar-wrapper"]/ul/li[5]/a')
      .assert.urlEquals('http://localhost:7070/dashboard/changepassword')
      .waitForElementVisible('//*[@id="ch_pas"]/form', 600)
      .waitForElementVisible('//*[@id="ch_pas"]/form/h4', 600)
      .assert.containsText('//*[@id="ch_pas"]/form/h4', 'Change password')
      .useCss()
      .waitForElementVisible('#oldPassword', 600)
      .waitForElementVisible('#newPassword', 600)
      .waitForElementVisible('#confirmPassword', 600)
      .waitForElementVisible('#editbtn', 600)
      .click('#editbtn')
      .waitForElementVisible('#ch_pas > form > p', 600)
      .assert.containsText('#ch_pas > form > p', 'current password is required')
      .setValue('input[name=oldPassword]', password)
      .setValue('input[name=newPassword]', password)
      .setValue('input[name=confirmPassword]', password)
      .click('#editbtn')
      .assert.containsText('#ch_pas > form > p', 'Oh! sorry you can not use the same password')
      .pause(1000)
      .clearValue('input[name=oldPassword]')
      .clearValue('input[name=newPassword]')
      .clearValue('input[name=confirmPassword]')
      .pause(1000)
      .setValue('input[name=oldPassword]', password.toString())
      .setValue('input[name=newPassword]', `${password}1`)
      .setValue('input[name=confirmPassword]', `${password}1`)
      .click('#editbtn')
      .pause(6000)
      .useXpath()
      .waitForElementVisible('//*[@id="modalOpen"]', 6000)
      .waitForElementVisible('//*[@id="modalOpen"]/div[1]/h5', 600)
      .waitForElementVisible('//*[@id="modalOpen"]/div[2]/a[2]', 600)
      .assert.containsText('//*[@id="modalOpen"]/div[1]/h5', 'Do you want to change your password?')
      .click('//*[@id="modalOpen"]/div[2]/a[2]')
      .waitForElementVisible('//*[@id="modalSuccess"]', 600)
      .waitForElementVisible('//*[@id="modalSuccess"]/div[1]/p', 600)
      .waitForElementVisible('//*[@id="modalSuccess"]/div[2]/a', 600)
      .assert.containsText('//*[@id="modalSuccess"]/div[1]/p', 'Password has been changed')
      .click('//*[@id="modalSuccess"]/div[2]/a')
      .pause(600)
      .end();
  },

};

