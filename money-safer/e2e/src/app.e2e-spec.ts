import { AppPage } from './app.po';
import {browser, by, element, logging} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Login in the application', () => {
    page.gateLogin('genchev.martin1@gmail.com' , 'genchev.martin1@gmail.com');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard');
  });

  it('Add transaction', () => {
    element(by.css('#transactions')).click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'transactions');
    page.getByFormControlName('amounts').sendKeys(1000);
    element(by.css('#inflow')).click();
  });

  it('Select type', () => {
    element(by.css('#transactionCategory')).click();
    element(by.cssContainingText('mat-option', 'Salary')).click();
  });
  it('Click', () => {
    element(by.css('#InsertTransaction')).click();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
