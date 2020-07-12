const faker = require('faker');
const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 250
  })
  page = await browser.newPage();
  page.emulate({
    viewport: {
      width: 900,
      height: 500
    },
    userAgent: ''
  });
})

describe('Login Test', () => {
  test('A bidder can log in', async () => {

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#username')

    await page.click('#username')
    await page.type('#username', 'bidder')
    await page.click('#login')

    await page.waitForSelector('#userDisplay')

    const html = await page.$eval('#userDisplay', e => e.innerHTML);
    expect(html).toBe('Welcome : bidder');

  }, 16000);
});

afterAll( () => {
  browser.close();
})