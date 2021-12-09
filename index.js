async function scrollPageToBottom(page, { size = 250, delay = 100, stepsLimit = null }) {
  let lastScrollPosition = await page.evaluate(
    async (pixelsToScroll, delayAfterStep, limit) => {
      let getElementScrollHeight = element => {
        if (!element) return 0
        let { scrollHeight, offsetHeight, clientHeight } = element
        return Math.max(scrollHeight, offsetHeight, clientHeight)
      }

      let scrollToBottom = resolve => {
        let lastPosition = 0

        let intervalId = setInterval(() => {
          let { body } = document
          let availableScrollHeight = getElementScrollHeight(body)

          window.scrollBy(0, pixelsToScroll)
          lastPosition += pixelsToScroll

          if (
            lastPosition >= availableScrollHeight ||
            (limit !== null && lastPosition >= pixelsToScroll * limit)
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
