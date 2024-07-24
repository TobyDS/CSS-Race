const puppeteer = require('puppeteer');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
require('dotenv').config();

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

async function codeToImage (htmlCode) {
  const sanitizedCode = DOMPurify.sanitize(htmlCode);
  const fullHtml = `<html><head><style>html{height:100%;width:100%}body{overflow:clip}</style></head><body>${sanitizedCode}</body></html>`;
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--single-process',
      '--no-zygote',
    ],
    executablePath:
      process.env.NODE_ENV === 'production'
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  const page = await browser.newPage();

  await page.setViewport({ width: 401, height: 300 });
  await page.setContent(fullHtml);

  const content = await page.$('html');
  const imageBuffer = await content.screenshot();

  await page.close();
  await browser.close();

  return imageBuffer;
}

module.exports = codeToImage;
