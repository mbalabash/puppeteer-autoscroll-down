import { Page } from 'puppeteer'
export type LastScrollPosition = number

export declare function scrollPageToBottom(page: Page, scrollStep?: number, scrollDelay?: number): Promise<LastScrollPosition>
