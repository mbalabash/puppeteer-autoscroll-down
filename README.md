## Small tool for puppeteer which scrolling page to bottom based on Body element

**This package using `window.scrollBy` method for scrolling.**

**See https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollBy**

### Install:

```js
npm i puppeteer-autoscroll-down
```

or

```js
yarn add puppeteer-autoscroll-down
```

### Example:

```js
const browser = await puppeteer.launch({ headless: false })
const page = await browser.newPage()
await page.setViewport({ width: 1366, height: 768 })

await page.goto('https://en.wikipedia.org/wiki/Main_Page')
const lastPosition = await scrollPageToBottom(page)
await page.screenshot({ path: path.normalize(`${__dirname}/example.png`) })

console.log(`lastPosition: ${lastPosition}`)

await browser.close()
```

**You can use returned last scroll position and request/response hooks to handle async content uploading.**

### Scrolling options

**`scrollStep {Number}` - Number of pixels to scroll on each step.**

**`scrollDelay {Number}` - A delay between each scroll step in ms.**

```js
const scrollStep = 250 // default
const scrollDelay = 100 // default
const lastPosition = await scrollPageToBottom(page, scrollStep, scrollDelay)
```
