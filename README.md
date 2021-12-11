# Handle infinite scroll on websites with puppeteer

Small puppeteer tool which makes your parsing experience a little bit better

## Usage

**`size` - Number of pixels to scroll on each step** `[default: 250]`.

**`delay` - Delay in ms after each completed scroll step** `[default: 100]`.

**`stepsLimit` - Max number of steps to scroll** `[default: null]`.

```js
const puppeteer = require('puppeteer')
const { scrollPageToBottom } = require('puppeteer-autoscroll-down')

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto('http://example.com')

const lastPosition = await scrollPageToBottom(page, {
  size: 500,
  delay: 250
})

await browser.close()
```

### Async content loading

**You can use returned value with request/response hooks to handle async content loading.**

```js
const puppeteer = require('puppeteer')
const { scrollPageToBottom } = require('puppeteer-autoscroll-down')

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto('http://example.com')

let isLoadingAvailable = true // Your condition-to-stop

while (isLoadingAvailable) {
  await scrollPageToBottom(page, { size: 500 })
  await page.waitForResponse(
    response => response.url() === 'http://example.com' && response.status() === 200
  )
  isLoadingAvailable = false // Update your condition-to-stop value
}

await browser.close()
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
