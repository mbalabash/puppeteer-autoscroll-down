import { findChrome } from 'find-chrome-bin'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core'
import { PUPPETEER_REVISIONS } from 'puppeteer-core/lib/cjs/puppeteer/revisions.js'
import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { scrollPageToBottom, scrollPageToTop } from '../index.js'
const __dirname = dirname(fileURLToPath(import.meta.url));

test('should scroll `regular` page to bottom', async () => {
  let chromeInfo = await findChrome({
    download: { path: join(__dirname, 'chrome'), puppeteer, revision: PUPPETEER_REVISIONS.chromium }
  })
  let browser = await puppeteer.launch({
    executablePath: chromeInfo.executablePath,
    headless: true
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
    download: { path: join(__dirname, 'chrome'), puppeteer, revision: PUPPETEER_REVISIONS.chromium }
  })
  let browser = await puppeteer.launch({
    executablePath: chromeInfo.executablePath,
    headless: true
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
    download: { path: join(__dirname, 'chrome'), puppeteer, revision: PUPPETEER_REVISIONS.chromium }
  })
  let browser = await puppeteer.launch({
    executablePath: chromeInfo.executablePath,
    headless: true
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
