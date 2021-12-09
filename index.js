async function scrollPageToBottom(page, { size = 250, delay = 100, stepsLimit = null }) {
  const lastScrollPosition = await page.evaluate(
    async (pixelsToScroll, delayAfterStep, stepsLimit) => {
      const getElementScrollHeight = element => {
        if (!element) return 0
        const { scrollHeight, offsetHeight, clientHeight } = element
        return Math.max(scrollHeight, offsetHeight, clientHeight)
      }

      const scrollToBottom = resolve => {
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
    size,
    delay,
    stepsLimit
  )

  return lastScrollPosition
}

module.exports = scrollPageToBottom
