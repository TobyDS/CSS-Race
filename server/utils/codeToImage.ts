import puppeteer from 'puppeteer';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
require('dotenv').config();

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

async function codeToImage(htmlCode: string) {
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

  await page.setViewport({ width: 400, height: 300 });
  await page.setContent(fullHtml);

  const content = await page.$('html');
  if (!content) {
    throw new Error('Failed to find the HTML element.');
  }
  const imageBuffer = await content.screenshot();

  await page.close();
  await browser.close();

  return imageBuffer;
}

export default codeToImage;
