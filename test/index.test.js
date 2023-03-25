const { test } = require('uvu')
const { join } = require('path')
const assert = require('uvu/assert')
const puppeteer = require('puppeteer-core')
const { findChrome } = require('find-chrome-bin')
const { PUPPETEER_REVISIONS } = require('puppeteer-core/lib/cjs/puppeteer/revisions.js')

const { scrollPageToBottom, scrollPageToTop } = require('../index')

test('should scroll `regular` page to bottom', async () => {
  let chromeInfo = await findChrome({
    download: { puppeteer, revision: PUPPETEER_REVISIONS.chromium, path: join(__dirname, 'chrome') }
  })
  let browser = await puppeteer.launch({
    headless: true,
    executablePath: chromeInfo.executablePath
  })
  let isScrolledToBottom = false
  let lastPosition = 0

  try {
    let page = await browser.newPage()
    await page.goto(`file://${join(__dirname, 'stub', 'regular-page.html')}`)
    lastPosition = await scrollPageToBottom(page)
    isScrolledToBottom = await page.evaluate(() => isInViewport(document.querySelector('#test'))) // eslint-disable-line no-undef

    assert.is(isScrolledToBottom, true)
    assert.is(lastPosition > 0, true)
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  } finally {
    let pages = await browser.pages()
    await Promise.all(pages.map(item => item.close()))
    await browser.close()
  }
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
  let lastPosition = 0

  try {
    let page = await browser.newPage()
    await page.goto(`file://${join(__dirname, 'stub', 'async-content-page.html')}`)
    let isLoadingAvailable = !(await page.evaluate(() =>
      document.querySelector('#loader').classList.contains('hide')
    ))

    while (isLoadingAvailable) {
      isLoadingAvailable = !(await page.evaluate(() =>
        document.querySelector('#loader').classList.contains('hide')
      ))
      lastPosition = await scrollPageToBottom(page, { size: 100 })
      await page.waitForTimeout(1500)
    }

    isScrolledToBottom = await page.evaluate(() => isInViewport(document.querySelector('#test'))) // eslint-disable-line no-undef

    assert.is(isScrolledToBottom, true)
    assert.is(lastPosition > 0, true)
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  } finally {
    let pages = await browser.pages()
    await Promise.all(pages.map(item => item.close()))
    await browser.close()
  }
})

test('should scroll page to top', async () => {
  let chromeInfo = await findChrome({
    download: { puppeteer, revision: PUPPETEER_REVISIONS.chromium, path: join(__dirname, 'chrome') }
  })
  let browser = await puppeteer.launch({
    headless: true,
    executablePath: chromeInfo.executablePath
  })
  let lastPosition = 0

  try {
    let page = await browser.newPage()
    await page.goto(`file://${join(__dirname, 'stub', 'regular-page.html')}`)

    lastPosition = await scrollPageToBottom(page)
    let isScrolledToBottom = await page.evaluate(
      () => isInViewport(document.querySelector('#test')) // eslint-disable-line no-undef
    )
    assert.is(isScrolledToBottom, true)
    assert.is(lastPosition > 0, true)

    lastPosition = await scrollPageToTop(page)
    assert.is(lastPosition <= 0, true)
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  } finally {
    let pages = await browser.pages()
    await Promise.all(pages.map(item => item.close()))
    await browser.close()
  }
})

test.run()
