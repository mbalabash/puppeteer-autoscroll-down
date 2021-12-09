# Handle infinite scroll on websites with puppeteer

Small puppeteer tool which makes your parsing experience a little bit better

## Usage

**`size` - Number of pixels to scroll on each step** `[default: 250]`.

**`delay` - Delay in ms after each completed scroll step** `[default: 100]`.

**`stepsLimit` - Max number of steps to scroll** `[default: null]`.

```js
const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto('https://en.wikipedia.org/wiki/Main_Page')

const lastPosition = await scrollPageToBottom(page, {
  size: 500,
  delay: 250
})

await browser.close()
```

### Async content loading

**You can use returned value with request/response hooks to handle async content loading.**

```js

```

## Install

```js
npm i puppeteer-autoscroll-down
```

or

```js
yarn add puppeteer-autoscroll-down
```

## License

MIT
