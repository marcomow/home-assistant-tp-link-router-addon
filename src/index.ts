import * as puppeteer from 'puppeteer';

const reboot = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        env: {
            DISPLAY: ":10.0"
        }
    });
    const page = await browser.newPage();
    await page.goto
    const input = await page.$('input[type=password]');
    // get the class name of the input
    const className = await page.evaluate(input => input?.getAttribute('class'), input);
    console.log(className);
}
reboot();