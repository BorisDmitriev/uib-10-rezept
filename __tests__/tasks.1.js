const puppeteer = require("puppeteer");
const path = require('path');

const browserOptions = {
    headless: true,
    ignoreHTTPSErrors: true,
    defaultViewport: null,
    devtools: false,
}
let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch(browserOptions);
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./recipes/index.html'));
}, 30000);

afterAll((done) => {
    try { 
        this.puppeteer.close(); 
    } catch (e) 
    {} 
    done();
});

describe("Recipe Book",  () =>{
    it("HTML file should have an `author` meta tag", async () => {
        try {
            const metaTag = await page.$eval('meta[name="author"]', element => element.content);
            expect(metaTag).toBeTruthy();
            expect(typeof metaTag).toBe('string');
            expect(metaTag).toMatch(/[a-zA-Z]/);
        } catch (error) {
            throw error
        }
    });
    it("HTML file should have a `title` tag ", async () => {
        try {
            const title = await page.$eval('title', element => element.innerHTML);
            expect(title).toBeTruthy();
            expect(typeof title).toBe('string');
            expect(title).toMatch(/[a-zA-Z]/);
        } catch (error) {
            throw error
        };
    });
    it("An image should be present in index.html, with width of 500px", async () => {
        try {
            const imgFolder = await page.$eval('img', element => element.src);
            expect(imgFolder).toBeTruthy();
            expect(typeof imgFolder).toBe('string');
            expect(imgFolder).toMatch(/[a-zA-Z]/);
            expect(imgFolder).toMatch(/[.png]|[.jpg]/);
            const imgWidth = await page.$eval('img', element => element.width);
            expect(imgWidth).toBeTruthy();
            expect(imgWidth).toBe(500);
            
        } catch (error) {
            throw error
        }
    });
    it("Heading tag with content 'ingredients' exists", async () => {
        try {
            const heading1 = await page.$eval('*', element => element.innerHTML);
            expect(heading1).toBeTruthy();
            expect(heading1).toMatch(/ingredients/i);    
        } catch (error) {
            throw error        
        }
    });
    it("Ingredients Should be in Unordered List", async () => {
        try {
            const list1 = await page.$eval('ul', element => element.innerHTML);
            expect(list1).toBeTruthy();
            const listItems = await page.$$eval('ul li', elements => elements.length);
            expect(listItems).toBeTruthy();
            expect(listItems).toBeGreaterThan(2);
        } catch (error) {
            throw error
        }
    });
    it("Heading tag with content 'Preparation' exists", async () => {
        try {
            const heading2 = await page.$eval('*', elements => elements.innerHTML);
            expect(heading2).toBeTruthy();
            expect(heading2).toMatch(/preparation/i);    
        } catch (error) {
            throw error
        }
    });
    it("Preparation instructions are in Ordered List", async () => {
        try {
            const list2 = await page.$eval('ol', element => element.innerHTML);
            expect(list2).toBeTruthy();
            const listItems2 = await page.$$eval('ol li', elements => elements.length);
            expect(listItems2).toBeTruthy();
            expect(listItems2).toBeGreaterThan(2);
        } catch (error) {
            throw error
        }
    });
})
