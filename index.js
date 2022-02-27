function scrollPage(scrollDirection) {
  return async (page, { size = 250, delay = 100, stepsLimit = null } = {}) => {
    let lastScrollPosition = await page.evaluate(
      async (pixelsToScroll, delayAfterStep, limit, direction) => {
        let getElementScrollHeight = element => {
          if (!element) return 0
          let { scrollHeight, offsetHeight, clientHeight } = element
          return Math.max(scrollHeight, offsetHeight, clientHeight)
        }

        let initialScrollPosition = window.pageYOffset
        let availableScrollHeight = getElementScrollHeight(document.body)
        let lastPosition = direction === 'bottom' ? 0 : initialScrollPosition

        let scrollFn = resolve => {
          let intervalId = setInterval(() => {
            window.scrollBy(0, direction === 'bottom' ? pixelsToScroll : -pixelsToScroll)
            lastPosition += direction === 'bottom' ? pixelsToScroll : -pixelsToScroll

            if (
              (direction === 'bottom' && lastPosition >= availableScrollHeight) ||
              (direction === 'bottom' &&
                limit !== null &&
                lastPosition >= pixelsToScroll * limit) ||
              (direction === 'top' && lastPosition <= 0) ||
              (direction === 'top' &&
                limit !== null &&
                lastPosition <= initialScrollPosition - pixelsToScroll * limit)
            ) {
              clearInterval(intervalId)
              resolve(lastPosition)
            }
          }, delayAfterStep)
        }

        return new Promise(scrollFn)
      },
      size,
      delay,
      stepsLimit,
      scrollDirection
    )

    return lastScrollPosition
  }
}

module.exports = { scrollPageToBottom: scrollPage('bottom'), scrollPageToTop: scrollPage('top') }
