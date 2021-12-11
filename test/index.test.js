const { test } = require('uvu')
const { join } = require('path')
const assert = require('uvu/assert')
const puppeteer = require('puppeteer-core')
const { findChrome } = require('find-chrome-bin')
const { PUPPETEER_REVISIONS } = require('puppeteer-core/lib/cjs/puppeteer/revisions')

const { scrollPageToBottom } = require('../index')

test('should scroll `regular` page to bottom', async () => {
  let chromeInfo = await findChrome({
    download: { puppeteer, revision: PUPPETEER_REVISIONS.chromium, path: join(__dirname, 'chrome') }
  })
  let browser = await puppeteer.launch({
    headless: true,
    executablePath: chromeInfo.executablePath
  })
  let isScrolledToBottom = false

  try {
    let page = await browser.newPage()
    await page.goto(`file://${join(__dirname, 'stub', 'regular-page.html')}`)
    await scrollPageToBottom(page)
    isScrolledToBottom = await page.evaluate(() => isInViewport(document.querySelector('#test'))) // eslint-disable-line no-undef
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  } finally {
    let pages = await browser.pages()
    await Promise.all(pages.map(item => item.close()))
    await browser.close()
  }

  assert.equal(isScrolledToBottom, true)
})

test('should scroll `async content page` to bottom', async () => {
  let chromeInfo = await findChrome({
    download: { puppeteer, revision: PUPPETEER_REVISIONS.chromium, path: join(__dirname, 'chrome') }
  })
  let browser = await puppeteer.launch({
    headless: true,
    executablePath: chromeInfo.executablePath
  })
  let isScrolledToBottom = false

  try {
    let page = await browser.newPage()
    await page.goto(`file://${join(__dirname, 'stub', 'async-content-page.html')}`)

    let isLoadingAvailable

    while (isLoadingAvailable) {
      isLoadingAvailable = !(await page.evaluate(() =>
        document.querySelector('#loader').classList.contains('hide')
      ))
      await scrollPageToBottom(page, { size: 500 })
      await page.waitForTimeout(1500)
    }

    isScrolledToBottom = await page.evaluate(() => isInViewport(document.querySelector('#test'))) // eslint-disable-line no-undef
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  } finally {
    let pages = await browser.pages()
    await Promise.all(pages.map(item => item.close()))
    await browser.close()
  }

  assert.equal(isScrolledToBottom, true)
})

test.run()
