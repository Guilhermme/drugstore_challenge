class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = '') {
    await this.page.goto(path, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
  }

  async click(locator) {
    await this.page.locator(locator).click();
  }

  async fill(locator, value) {
    await this.page.locator(locator).fill(value);
  }

  async isVisible(locator) {
    return await this.page.locator(locator).isVisible();
  }

  async text(locator) {
    return await this.page.locator(locator).innerText();
  }
}

module.exports = BasePage;
