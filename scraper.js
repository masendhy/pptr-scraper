//  Web scraper for books


const puppeteer = require ("puppeteer");
const {url} = require('./config');
const random_useragent = require('random-useragent');
const fs = require ('fs');


// invoke
(async() =>{
// open browser
const browser = await puppeteer.launch({headless:true});
const page = await browser.newPage();

// setup browser
await page.setDefaultTimeout(10000)
await page.setViewport({width:1200, height:800})
await page.setUserAgent(random_useragent.getRandom());

// get data from bookstore
const name_selector = '.product_main > h1'
const price_selector = '.price_color'
await page.goto(url);
await page.waitForSelector(name_selector);
await page.waitForSelector(price_selector);
const name = await page.$eval(name_selector, e => e.innerHTML);
const price = await page.$eval(price_selector, e => e.innerHTML);
const nameTrim = name.trim();
const priceTrim = price.trim();

// console.log('NAME   :'+ nameTrim);
// console.log('PRICE  :'+ priceTrim);

// get current date and time
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const time = date.getUTCMinutes();
const fullDate = `${day}/${month}/${year}`;

// console.log(fullDate +" "+ nameTrim + " " + priceTrim);

// save data to txt file
const logger = fs.createWriteStream('log.txt', {flags : 'a'});
logger.write(`${fullDate} - ${time} - ${nameTrim} - ${priceTrim}\n`)
logger.close();


// close browser
await browser.close();


// here goes scraper code
})().catch(error => {
    console.log(error);
    process.exit(1)
})

