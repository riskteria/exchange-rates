import { Builder } from 'selenium-webdriver';

export const driver = new Builder()
  .forBrowser('chrome')
  .usingServer('http://localhost:4444/wd/hub')
  .build()
;

afterAll(async () => {
  for (const listener of process.listeners('exit')) {
    listener();
    process.removeListener('exit', listener);
  }
  await driver.quit();
});
