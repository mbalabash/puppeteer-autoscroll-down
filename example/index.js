const path = require('path')
const puppeteer = require('puppeteer')
const scrollPageToBottom = require('../index')

;(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.setViewport({ width: 1366, height: 768 })

  await page.goto('https://en.wikipedia.org/wiki/Main_Page')
  const lastPosition = await scrollPageToBottom(page)
  await page.screenshot({ path: path.normalize(`${__dirname}/example.png`) })

  console.log(`lastPosition: ${lastPosition}`)

  await browser.close()
})()
