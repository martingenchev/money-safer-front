import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }

  btnsubmit() {
    return element.all(by.tagName('button')).click();
  }

  getByFormControlName(name: string) {
    return element(by.css('[formControlName=' + name + ']'));
  }

  gateLogin(username: string, password: string) {
    this.navigateTo();
    this.getByFormControlName('email').sendKeys(username);
    this.getByFormControlName('password').sendKeys(password);
    this.btnsubmit();
  }
}
