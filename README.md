# Playwright Portfolio

## About the project

This repository contains a collection of end-to-end (E2E) automated tests developed with **Playwright** and **JavaScript**.

The objective is to demonstrate practical skills in UI test automation, including browser interactions, element selection, assertions, user workflows, and test reporting.

The project is part of a QA Automation portfolio and focuses on realistic test scenarios rather than isolated technical examples.

## Tech Stack

- **Playwright** – End-to-end browser automation
- **JavaScript** – Test scripting
- **Node.js** – JavaScript runtime
- **npm** – Dependency management
- **Chromium** – Browser used for test execution

## Project Structure

```text
playwright/
├── tests/
│   ├── demoblaze.spec.js
│   ├── homepage.spec.js
│   ├── locators.spec.js
│   └── portfolio.spec.js
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.js
```

## Automated Test Scenarios

### 1. Homepage Tests
Basic browser navigation and page validation, including page title and element visibility checks.

### 2. Locator Tests
Practical examples of Playwright locators:
- `getByRole()`
- `getByText()`
- `getByLabel()`
- CSS selectors

These tests demonstrate how to identify and interact with web elements reliably.

### 3. Portfolio Tests
Automated checks against a GitHub portfolio and its associated Allure report, including navigation and repository visibility.

### 4. DemoBlaze – E-commerce Purchase Workflow
An end-to-end test reproducing a realistic customer purchase journey:

1. Open the DemoBlaze online store.
2. Select a Samsung Galaxy S6.
3. Add the product to the shopping cart.
4. Verify the cart contents and product price.
5. Fill in the customer and payment information.
6. Confirm the purchase.
7. Validate the purchase confirmation and return to the homepage.

This scenario covers browser interactions, native dialogs, form handling, assertions, and page navigation.

## Installation

Clone the repository:

```bash
git clone https://github.com/helenaLGF/Playwright_Portfolio.git
cd Playwright_Portfolio
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers if needed:

```bash
npx playwright install chromium
```

## Running the Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/demoblaze.spec.js
```

Run tests with the browser visible:

```bash
npx playwright test --headed
```

Run a specific test by name:

```bash
npx playwright test --grep "test name"
```

## Test Reports

The project uses Playwright's HTML reporter.

After test execution, open the report with:

```bash
npx playwright show-report
```

## Project Goals

This portfolio aims to demonstrate:

- Writing and maintaining automated end-to-end tests.
- Using reliable Playwright locators.
- Validating UI behavior and business workflows.
- Handling browser dialogs and forms.
- Checking navigation and page state.
- Organizing tests into reusable and maintainable test files.

---

**Author:** Helena Le Goff  
**Repository:** [Playwright_Portfolio](https://github.com/helenaLGF/Playwright_Portfolio)
