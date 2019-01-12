'use strict';

const Chrome = require('selenium-webdriver/chrome');
const { Builder, By } = require('selenium-webdriver');

const driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(new Chrome.Options().headless())
  .build();


beforeAll(async () => {
  await driver.get('http://localhost:3000');
});


describe('validate web', () => {

  it('should get web title', async () => {
    const title = await driver.getTitle();
    expect(title).toEqual('React App');
  });
});

describe('conversion form', () => {
  it('should have conversion form have default value', async () => {
    const conversionForm = await driver.findElement(By.className('conversion-form'));
    const conversionFormDisplayed = await conversionForm.isDisplayed();
    expect(conversionFormDisplayed).toEqual(true);

    const conversionFormTitle = await conversionForm.findElement(By.className('form-title'));
    const conversionFormTitleDisplayed = await conversionFormTitle.isDisplayed();
    expect(conversionFormTitleDisplayed).toEqual(true);

    const conversionFormInput = await conversionForm.findElement(By.className('input'));
    const conversionFormInputDisplayed = await conversionFormInput.isDisplayed();
    expect(conversionFormInputDisplayed).toEqual(true);

    const conversionFormInputValue = await conversionFormInput.getAttribute('value');
    expect(conversionFormInputValue).not.toEqual('');
  });

  it('should conversion form be inputable', async () => {
    const conversionForm = await driver.findElement(By.className('conversion-form'));
    const conversionFormInput = await conversionForm.findElement(By.className('input'));

    await conversionFormInput.clear();
    await conversionFormInput.click();
    await conversionFormInput.sendKeys('9999');

    const conversionFormInputValue = await conversionFormInput.getAttribute('value');
    expect(conversionFormInputValue).toEqual('9999');
  });

  it('should conversion form title updated', async () => {
    const conversionForm = await driver.findElement(By.className('conversion-form'));
    const conversionFormTitle = await conversionForm.findElement(By.className('form-title'));
    const conversionFormTitleText = await conversionFormTitle.getText();

    const regexTest = new RegExp(/\w+ (9.999)[\w ]+/);

    expect(conversionFormTitleText).toMatch(regexTest);
  });
});

describe('content', () => {
  it('should have content to be visible', async () => {
    const content = await driver.findElement(By.className('content'));
    const contentDisplayed = await content.isDisplayed();
    expect(contentDisplayed).toEqual(true);
  });

  it('should have add currency button to be visible', async () => {
    const addCurrencyButton = await driver.findElement(By.className('content__button--add-currency'));
    const addCurrencyButtonDisplayed = await addCurrencyButton.isDisplayed();
    expect(addCurrencyButtonDisplayed).toEqual(true);
  });

  it('should add currency button disappear on clicked', async () => {
    const addCurrencyButton = await driver.findElement(By.className('content__button--add-currency'));
    await addCurrencyButton.click();

    const addCurrencyButtonCount = await driver.findElements(By.className('content__button--add-currency'));
    expect(addCurrencyButtonCount.length).toEqual(0);
  });

  it('should display add currency form', async () => {
    const addCurrencyForm = await driver.findElement(By.className('content_form--add-currency'));
    const addCurrencyFormDisplayed = await addCurrencyForm.isDisplayed();
    expect(addCurrencyFormDisplayed).toEqual(true);
  });

  it('should be able to add new currency into list', async () => {
    const addCurrencyForm = await driver.findElement(By.className('content_form--add-currency'));
    const addCurrencyFormSelectBox = await addCurrencyForm.findElement(By.className('select'));
    const chooseCurrencyButton = await addCurrencyForm.findElement(By.className('content__button--choose-currency'));

    await driver.wait(async () => {
      const addCurrencyFormSelectBoxOptions = await addCurrencyFormSelectBox.findElements(By.tagName('option'));
      return addCurrencyFormSelectBoxOptions.length > 0;
    }, 2000);

    const rateCardsBeforeUpdate = await driver.findElements(By.className('rate-card'));
    const rateCardsBeforeUpdateTotal = await rateCardsBeforeUpdate.length;

    const addCurrencyFormSelectBoxText = await addCurrencyFormSelectBox.getText();

    const regexTest = new RegExp(/(\w{3}) - [\w ]+/);

    expect(addCurrencyFormSelectBoxText).toMatch(regexTest);

    await chooseCurrencyButton.click();

    const rateCardsAfterUpdate = await driver.findElements(By.className('rate-card'));
    const rateCardsAfterUpdateTotal = await rateCardsAfterUpdate.length;

    expect(rateCardsAfterUpdateTotal).toBeGreaterThan(rateCardsBeforeUpdateTotal);
  });

  it('Should be able to delete currency from list', async () => {
    const content = await driver.findElement(By.className('content'))
    const rateCards = await content.findElements(By.className('rate-card'));
    expect(rateCards.length).toBeGreaterThan(0);

    const rateCard = rateCards[0];
    const rateCardDeleteButton = await rateCard.findElement(By.tagName('button'));

    await rateCardDeleteButton.click();

    const rateCardsPostDeletion = await content.findElements(By.className('rate-card'));
    expect(rateCardsPostDeletion.length).toEqual(0);
  });
});

afterAll(async () => {
  await driver.quit();
});

