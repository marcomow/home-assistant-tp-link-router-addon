import * as puppeteer from 'puppeteer';

const host = process.env.HOST || 'https://192.168.0.1/webpages/login.html';
const username = process.env.USERNAME || 'admin';
const password = process.env.PASSWORD || 'password';

const reboot = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
            defaultViewport: null,
        });
        const page = await browser.newPage();
        await page.goto(host);
        const form = await page.$('#form-login');
        const passwordInput = await form.waitForSelector('input[type=password]', { visible: true, timeout: 3000 });
        if (!passwordInput) {
            throw new Error('Could not find password input');
        }
        console.log('Typing password...');
        await passwordInput.type(password);
        console.log('Typed password');
        await page.keyboard.press('Enter');
        await page.waitForNetworkIdle();
        console.log('Navigated to dashboard');
        const rebootButton = await page.waitForSelector('#top-control-reboot', { visible: true, timeout: 5000 });
        if (!rebootButton) {
            throw new Error('Could not find reboot button');
        }
        console.log('Clicking reboot button...');
        await rebootButton.click();
        const confirmButton = await page.waitForSelector('.btn-msg-ok', { visible: true, timeout: 5000 });
        if (!confirmButton) {
            throw new Error('Could not find confirm button');
        }
        console.log('Clicking confirm button...');
        await confirmButton.evaluate((e) => (e as HTMLElement).click());
        // closing 
        await browser.close();
    } catch (e) {
        console.log(e);
    }
}
reboot();