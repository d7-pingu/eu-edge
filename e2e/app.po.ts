import { browser, element, by } from 'protractor/globals';

export class EuEdgePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h2')).getText();
  }
}
