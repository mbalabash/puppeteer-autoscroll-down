import { Page } from 'puppeteer-core'

export type Options = {
  /**
   * Number of pixels to scroll on each step
   * @type {number}
   */
  size?: number

  /**
   * Delay after each completed scroll step
   * @type {number}
   */
  delay?: number

  /**
   * Max number of steps to scroll
   * @type {number}
   */
  stepsLimit?: number
}

/**
 * Scrolling page to the bottom
 *
 * @example
 * ```js
 * const browser = await puppeteer.launch()
 * const page = await browser.newPage()
 * await page.goto("https://en.wikipedia.org/wiki/Main_Page")
 * const lastPosition = await scrollPageToBottom(page)
 * await browser.close()
 * ```
 * @param {Page} page
 * @param {Options} options
 * @returns {Promise<number>}
 */
export declare function scrollPageToBottom(page: Page, options: Options): Promise<number>

/**
 * Scrolling page to the top
 *
 * @example
 * ```js
 * const browser = await puppeteer.launch()
 * const page = await browser.newPage()
 * await page.goto("https://en.wikipedia.org/wiki/Main_Page")
 * const lastPosition = await scrollPageToTop(page)
 * await browser.close()
 * ```
 * @param {Page} page
 * @param {Options} options
 * @returns {Promise<number>}
 */
export declare function scrollPageToTop(page: Page, options: Options): Promise<number>
