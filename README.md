## Handle infinite scroll on websites with puppeteer

Small puppeteer tool which makes your parsing experience a little bit better

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

**`scrollSize` - Number of pixels to scroll on each step** `[default: 250]`.

**`scrollDelay` - Delay in ms after each completed scroll step** `[default: 100]`.

**`scrollStepsLimit` - Max number of steps to scroll** `[default: null]`.

### How?

**We take available scroll height from `body` element and then using [`window.scrollBy`](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollBy) method to scroll pages.**

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
