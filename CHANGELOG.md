# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

## 1.1.2

- Upgraded devDependencies.

## 1.1.1

- Upgraded project packages.
- Fixed npm security alert.

## 1.1.0

- Added `scrollPageToTop`.

## 1.0.0

- Moved to named export. Use `const { scrollPageToBottom } = require('puppeteer-autoscroll-down')`.

- Renamed and moved options to object. Use `scrollPageToBottom(page, { size: 500, delay: 250, stepsLimit: 10 })`.

## 0.2.0

- Added `scrollStepsLimit` option, which allows you to control how many scrolls you want to make (for cases when you want to parse only recent information).
- Fixed npm security alert. Upgraded project packages.

## 0.1.7

- Fixed npm security alert. Upgraded project packages.

## 0.1.6

- Fixed npm security alert. Upgraded project packages.

## 0.1.5

- Fixed [handle destructuring for null body](https://github.com/mbalabash/puppeteer-autoscroll-down/pull/3) issue.

## 0.1.4

- Fixed npm security alert. Upgraded vulnerable packages.

## 0.1.3

- Fixed npm security alert. Upgraded vulnerable packages.

## 0.1.2

- Fixed npm security alert. Upgraded vulnerable packages.

## 0.1.1

- Added `MIT` license.

## 0.1.0

- Initial release.
