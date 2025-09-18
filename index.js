function scrollPage(dir) {
  return async (page, { delay = 100, size = 250, stepsLimit = null } = {}) => {
    return await page.evaluate(
      (pixels, delayAfterStep, limit, direction) => {
        const isDown = direction === 'bottom'
        const initial = window.pageYOffset
        const maxHeight = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.body.clientHeight
        )
        let pos = isDown ? 0 : initial

        return new Promise(resolve => {
          const interval = setInterval(() => {
            window.scrollBy(0, isDown ? pixels : -pixels)
            pos += isDown ? pixels : -pixels

            const reachedEnd = isDown ? pos >= maxHeight : pos <= 0
            const reachedLimit =
              limit && (isDown ? pos >= pixels * limit : pos <= initial - pixels * limit)

            if (reachedEnd || reachedLimit) {
              clearInterval(interval)
              resolve(pos)
            }
          }, delayAfterStep)
        })
      },
      size,
      delay,
      stepsLimit,
      dir
    )
  }
}

export const scrollPageToBottom = scrollPage('bottom')
export const scrollPageToTop = scrollPage('top')
