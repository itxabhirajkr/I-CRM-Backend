import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true, timeout: 60000 });
    const page = await browser.newPage();
    await page.goto('https://example.com');
    await page.screenshot({ path: 'example.png' });
    await browser.close();
    console.log('Screenshot taken');
  } catch (error) {
    console.error('Error:', error);
  }
})();
