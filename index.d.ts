import { Page } from 'puppeteer'

export declare function scrollPageToBottom(
  page: Page,
  scrollSize?: number,
  scrollDelay?: number,
  scrollStepsLimit?: number
): Promise<number>
