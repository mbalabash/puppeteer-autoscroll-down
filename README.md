## Handle infinite scroll on websites by puppeteer

**We use [`window.scrollBy`](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollBy) method for scrolling pages.**

### Usage

```js
const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto(SOME_URL)

const lastPosition = await scrollPageToBottom(page)

await browser.close()
```

**You can use returned value with request/response hooks to handle async content uploading.**

### Scrolling options

**`scrollStep` - Number of pixels to scroll on each step.**

**`scrollDelay` - A delay between each scroll step in ms.**

```js
const scrollStep = 250 // default
const scrollDelay = 100 // default
const lastPosition = await scrollPageToBottom(page, scrollStep, scrollDelay)
```

### Install

```js
npm i puppeteer-autoscroll-down
```

or

```js
yarn add puppeteer-autoscroll-down
```

### Contributing

Feel free to ask or open an issue.
