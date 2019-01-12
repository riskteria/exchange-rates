const Chrome = require('selenium-webdriver/chrome');
const { Builder } = require('selenium-webdriver');
const assert = require('assert');

const driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(new Chrome.Options().headless())
  .build();


describe('validate web', () => {
  beforeAll(async () => {
    await driver.get('http://localhost:3000');
  });

  it('should get web title', async () => {
    const title = await driver.getTitle();
    assert.equal(title, 'React App');
  });

  afterAll(async () => {
    await driver.quit();
  });
});

