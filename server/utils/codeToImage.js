const puppeteer = require('puppeteer');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
require('dotenv').config();

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

async function codeToImage (htmlCode) {
  const sanitizedCode = DOMPurify.sanitize(htmlCode);
  console.log('combinedCode:', sanitizedCode);
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
  await page.setContent(sanitizedCode);

  // Disable scrollbars and reset margins and padding
  await page.addStyleTag({
    content: `
      body::-webkit-scrollbar { display: none; }
      html, body { margin: 0; padding: 0; }
    `,
  });

  const content = await page.$('body');
  const imageBuffer = await content.screenshot();

  await page.close();
  await browser.close();

  return imageBuffer;
}

module.exports = codeToImage;
