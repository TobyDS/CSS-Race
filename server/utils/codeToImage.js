const puppeteer = require('puppeteer');

async function codeToImage (htmlCode) {
  console.log('htmlCode:', htmlCode);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlCode);
  await page.setViewport({ width: 400, height: 300 });

  const content = await page.$('body');
  const imageBuffer = await content.screenshot();

  await page.close();
  await browser.close();

  return imageBuffer;
}

module.exports = codeToImage;
