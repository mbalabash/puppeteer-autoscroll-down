/**
 * Scrolling page to bottom based on Body element
 * @param {Object} page Puppeteer page object
 * @param {Number} scrollSize Number of pixels to scroll on each step
 * @param {Number} scrollDelay Delay after each completed scroll step
 * @param {Number} scrollStepsLimit Max number of steps to scroll
 * @returns {Number} Last scroll position
 */
async function scrollPageToBottom(
  page,
  scrollSize = 250,
  scrollDelay = 100,
  scrollStepsLimit = null
) {
  const lastScrollPosition = await page.evaluate(
    async (pixelsToScroll, delayAfterStep, stepsLimit) => {
      const getElementScrollHeight = (element) => {
        if (!element) return 0
        const { scrollHeight, offsetHeight, clientHeight } = element
        return Math.max(scrollHeight, offsetHeight, clientHeight)
      }

      const scrollToBottom = (resolve) => {
        let lastPosition = 0

        const intervalId = setInterval(() => {
          const { body } = document
          const availableScrollHeight = getElementScrollHeight(body)

          window.scrollBy(0, pixelsToScroll)
          lastPosition += pixelsToScroll

          if (
            lastPosition >= availableScrollHeight ||
            (stepsLimit !== null && lastPosition >= pixelsToScroll * stepsLimit)
          ) {
            clearInterval(intervalId)
            resolve(lastPosition)
          }
        }, delayAfterStep)
      }

      return new Promise(scrollToBottom)
    },
    scrollSize,
    scrollDelay,
    scrollStepsLimit
  )

  return lastScrollPosition
}

module.exports = scrollPageToBottom
