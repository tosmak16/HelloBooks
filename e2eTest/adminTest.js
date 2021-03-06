import path from 'path';
import { bookMockData } from './mock/bookMockData';

const { bookTitle, stockNumber, author, summary, category, isbn } = bookMockData;

module.exports = {
  'admin should be able to login in into the application': (client) => {
    client
      .url('http://localhost:7070/login')
      .pause(100)
      .waitForElementVisible('body', 500)
      .pause(100)
      .setValue('input[name=username]', 'admin')
      .pause(100)
      .setValue('input[name=password]', '123456')
      .click('#loginbtn')
      .waitForElementVisible('.toast', 600)
      .assert.containsText('.toast', 'You have successfully logged in')
      .useXpath()
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[1]', 600)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[2]/a', 600)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[3]/a', 600)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[4]/a', 600)
      .waitForElementVisible('//*[@id="bb_table"]/div/div[1]/div[1]/div/select', 600)
      .waitForElementVisible('//*[@id="search"]', 600)
      .pause(100);
  },

  'logged in admin should be able to see his admin dashboard': (client) => {
    client
      .url('http://localhost:7070/admin')
      .useXpath()
      .pause(100)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[1]', 600)
      .moveToElement('//*[@id="sidebar-wrapper"]/ul/li[1]', 10, 10)
      .pause(100)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[2]/a', 600)
      .moveToElement('//*[@id="sidebar-wrapper"]/ul/li[2]/a', 10, 10)
      .pause(100)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[3]/a', 600)
      .moveToElement('//*[@id="sidebar-wrapper"]/ul/li[3]/a', 10, 10)
      .pause(100)
      .waitForElementVisible('//*[@id="bb_table"]/div/div[1]/div[1]/div/select', 600)
      .waitForElementVisible('//*[@id="search"]', 600)
      .pause(600);
  },

  'logged in admin should be able to search for books': (client) => {
    client
      .url('http://localhost:7070/admin')
      .useXpath()
      .pause(100)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[1]', 600)
      .moveToElement('//*[@id="sidebar-wrapper"]/ul/li[1]', 10, 10)
      .click('//*[@id="sidebar-wrapper"]/ul/li[1]')
      .assert.urlEquals('http://localhost:7070/admin/bookstore')
      .waitForElementVisible('//*[@id="bb_table"]/div/div[1]/div[1]/div/select', 600)
      .waitForElementVisible('//*[@id="search"]', 600)
      .pause(100)
      .moveToElement('//*[@id="bb_table"]/div/div[1]/div[1]/div/select', 10, 10)
      .pause(100)
      .click('//*[@id="bb_table"]/div/div[1]/div[1]/div/select')
      .click('//*[@id="bb_table"]/div/div[1]/div[1]/div/select/option[2]')
      .pause(100)
      .moveToElement('//*[@id="search"]', 10, 10)
      .click('//*[@id="search"]')
      .pause(100)
      .setValue('//*[@id="search"]', 'THE PEOPLE IN')
      .pause(100)
      .waitForElementVisible('//*[@id="bb_table"]/div', 600)
      .waitForElementVisible('//*[@id="bb_table"]/div/h4', 600)
      .waitForElementVisible('//* [@id="bb_table"]/div/div[2]/table/tbody/tr/td[7]/button', 600)
      .waitForElementVisible('//*[@id="bb_table"]/div/div[2]/table/tbody/tr/td[3]/a', 600)
      .assert.containsText('//*[@id="bb_table"]/div/h4', 'Search result')
      .assert.containsText('//*[@id="bb_table"]/div/div[2]/table/tbody/tr/td[3]/a', 'THE PEOPLE IN THE TREE')
      .pause(600);
  },
  'logged in admin should be able to upload books': (client) => {
    client
      .url('http://localhost:7070/admin')
      .useXpath()
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[1]', 600)
      .moveToElement('//*[@id="sidebar-wrapper"]/ul/li[2]', 10, 10)
      .pause(100)
      .click('//*[@id="sidebar-wrapper"]/ul/li[2]')
      .assert.urlEquals('http://localhost:7070/admin/uploadbook')
      .waitForElementVisible('//*[@id="b_page"]/form', 600)
      .waitForElementVisible('//*[@id="b_page"]/form/h4', 600)
      .waitForElementVisible('//*[@id="ubookTitle"]', 600)
      .waitForElementVisible('//*[@id="ubookAuthor"]', 600)
      .waitForElementVisible('//*[@id="ubookCat"]', 600)
      .waitForElementVisible('//*[@id="uISBN"]', 600)
      .waitForElementVisible('//*[@id="ustock"]', 600)
      .waitForElementVisible('//*[@id="ubookSummary"]', 600)
      .waitForElementVisible('//*[@id="b_page"]/form/div[5]/div[2]/input', 600)
      .waitForElementVisible('//*[@id="b_page"]/form/div[7]/div[2]/input', 600)
      .pause(100)
      .setValue('//*[@id="ubookTitle"]', bookTitle)
      .pause(100)
      .setValue('//*[@id="ubookAuthor"]', author)
      .pause(100)
      .setValue('//*[@id="ubookCat"]', category)
      .pause(100)
      .setValue('//*[@id="uISBN"]', isbn)
      .pause(100)
      .setValue('//*[@id="ustock"]', stockNumber)
      .pause(100)
      .setValue('//*[@id="ubookSummary"]', summary)
      .useCss()
      .setValue('input[name="imageFileInput"]', path.resolve(`${__dirname}/mock/image/1505167453834l1.jpg`))
      .setValue('input[name="pdfFileInput"]', path.resolve(`${__dirname}/mock/pdf/book.pdf`))
      .useXpath()
      .waitForElementVisible('//*[@id="uploadbtn"]', 600)
      .moveToElement('//*[@id="uploadbtn"]', 10, 10)
      .click('//*[@id="uploadbtn"]')
      .pause(100)
      .waitForElementVisible('//*[@id="modalOpen"]', 600)
      .waitForElementVisible('//*[@id="modalOpen"]/div[1]/h5', 600)
      .waitForElementVisible('//*[@id="modalOpen"]/div[2]/a[2]', 600)
      .click('//*[@id="modalOpen"]/div[2]/a[2]')
      .waitForElementVisible('//*[@id="modalSuccess"]', 60000)
      .assert.containsText('//*[@id="modalSuccess"]/div[1]/p', 'Book has been added to store')
      .waitForElementVisible('//*[@id="modalSuccess"]/div[2]/a', 600)
      .click('//*[@id="modalSuccess"]/div[2]/a')
      .pause(600);
  },

  'logged in admin should be able to update books': (client) => {
    client
      .url('http://localhost:7070/admin')
      .useXpath()
      .pause(100)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[3]', 600)
      .moveToElement('//*[@id="sidebar-wrapper"]/ul/li[3]', 10, 10)
      .click('//*[@id="sidebar-wrapper"]/ul/li[3]')
      .assert.urlEquals('http://localhost:7070/admin/updatebook')
      .waitForElementVisible('//*[@id="bh_table"]/form/div[1]/div[1]/div/select', 600)
      .waitForElementVisible('//*[@id="search"]', 600)
      .waitForElementVisible('//*[@id="bh_table"]/form/h4', 600)
      .waitForElementVisible('//*[@id="ebookTitle"]', 600)
      .waitForElementVisible('//*[@id="ebookAuthor"]', 600)
      .waitForElementVisible('//*[@id="ebookCat"]', 600)
      .waitForElementVisible('//*[@id="eISBN"]', 600)
      .waitForElementVisible('//*[@id="estock"]', 600)
      .waitForElementVisible('//*[@id="ebookSummary"]', 600)
      .waitForElementVisible('//*[@id="bh_table"]/form/div[8]/div[2]/input', 600)
      .waitForElementVisible('//*[@id="bh_table"]/form/div[9]/div[2]/input', 600)
      .waitForElementVisible('//*[@id="updatebtn"]', 600)
      .pause(100)
      .moveToElement('//*[@id="bh_table"]/form/div[1]/div[1]/div/select', 10, 10)
      .pause(100)
      .click('//*[@id="bh_table"]/form/div[1]/div[1]/div/select')
      .click('//*[@id="bh_table"]/form/div[1]/div[1]/div/select/option[2]')
      .pause(100)
      .moveToElement('//*[@id="search"]', 10, 10)
      .pause(100)
      .click('//*[@id="search"]')
      .pause(100)
      .setValue('//*[@id="search"]', 'THE PEOPLE IN')
      .pause(100)
      .clearValue('//*[@id="estock"]')
      .pause(100)
      .setValue('//*[@id="estock"]', '14')
      .pause(100)
      .click('//*[@id="updatebtn"]')
      .pause(100)
      .waitForElementVisible('//*[@id="modalO"]', 600)
      .waitForElementVisible('//*[@id="modalO"]/div[2]/a[2]', 600)
      .click('//*[@id="modalO"]/div[2]/a[2]')
      .waitForElementVisible('//*[@id="modalS"]', 1000)
      .assert.containsText('//*[@id="modalS"]/div[1]/p', 'Book has been updated')
      .waitForElementVisible('//*[@id="modalS"]/div[2]/a', 600)
      .click('//*[@id="modalS"]/div[2]/a')
      .pause(100);
  },

  'logged in admin should be able to delete books': (client) => {
    client
      .url('http://localhost:7070/admin')
      .pause(100)
      .waitForElementVisible('//*[@id="sidebar-wrapper"]/ul/li[1]', 600)
      .pause(100)
      .moveToElement('//*[@id="sidebar-wrapper"]/ul/li[1]', 10, 10)
      .pause(100)
      .click('//*[@id="sidebar-wrapper"]/ul/li[1]')
      .pause(100)
      .assert.urlEquals('http://localhost:7070/admin/bookstore')
      .waitForElementVisible('//*[@id="bb_table"]/div/div[1]/div[1]/div/select', 600)
      .waitForElementVisible('//*[@id="search"]', 600)
      .pause(100)
      .moveToElement('//*[@id="bb_table"]/div/div[1]/div[1]/div/select', 10, 10)
      .pause(100)
      .click('//*[@id="bb_table"]/div/div[1]/div[1]/div/select')
      .click('//*[@id="bb_table"]/div/div[1]/div[1]/div/select/option[2]')
      .pause(100)
      .moveToElement('//*[@id="search"]', 10, 10)
      .click('//*[@id="search"]')
      .pause(100)
      .setValue('//*[@id="search"]', 'THE HOUSE IN')
      .waitForElementVisible('//*[@id="bb_table"]/div', 600)
      .waitForElementVisible('//*[@id="bb_table"]/div/h4', 600)
      .waitForElementVisible('//*[@id="bb_table"]/div/div[2]/table/tbody/tr/td[7]/button', 600)
      .waitForElementVisible('//*[@id="bb_table"]/div/div[2]/table/tbody/tr/td[3]/a', 600)
      .assert.containsText('//*[@id="bb_table"]/div/h4', 'Search result')
      .assert.containsText('//*[@id="bb_table"]/div/div[2]/table/tbody/tr/td[3]/a', 'THE HOUSE IN THE TREE')
      .click('//*[@id="bb_table"]/div/div[2]/table/tbody/tr/td[7]/button')
      .waitForElementVisible('//*[@id="modal1"]', 600)
      .waitForElementVisible('//*[@id="modal1"]/div[2]/a[2]', 600)
      .click('//*[@id="modal1"]/div[2]/a[2]')
      .waitForElementVisible('//*[@id="modal3"]', 600)
      .waitForElementVisible('//*[@id="modal3"]/div[1]/p', 600)
      .waitForElementVisible('//*[@id="modal3"]/div[2]/a', 600)
      .assert.containsText('//*[@id="modal3"]/div[1]/p', 'book has been deleted')
      .pause(100)
      .click('//*[@id="modal3"]/div[2]/a')
      .pause(100)
      .end();
  },
};
