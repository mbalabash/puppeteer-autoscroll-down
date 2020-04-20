/**
 * Scrolling page to bottom based on Body element
 * @param {Object} page Puppeteer page object
 * @param {Number} scrollStep Number of pixels to scroll on each step
 * @param {Number} scrollDelay A delay between each scroll step
 * @returns {Number} Last scroll position
 */
async function scrollPageToBottom(page, scrollStep = 250, scrollDelay = 100) {
  const lastPosition = await page.evaluate(
    async (step, delay) => {
      const getScrollHeight = (element) => {
        if (!element) return 0

        const { scrollHeight, offsetHeight, clientHeight } = element
        return Math.max(scrollHeight, offsetHeight, clientHeight)
      }

      const position = await new Promise((resolve) => {
        let count = 0
        const intervalId = setInterval(() => {
          const { body } = document
          const availableScrollHeight = getScrollHeight(body)

          window.scrollBy(0, step)
          count += step

          if (count >= availableScrollHeight) {
            clearInterval(intervalId)
            resolve(count)
          }
        }, delay)
      })

      return position
    },
    scrollStep,
    scrollDelay
  )
  return lastPosition
}

module.exports = scrollPageToBottom
