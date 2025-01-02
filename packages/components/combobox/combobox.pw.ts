import { type Locator, type Page, expect, test } from '@playwright/test';

import { playwrightUtils } from '$/utils/playwright';

const urls = {
  single: '/components/combobox/single',
  multi: '/components/combobox/multi',
  singlePreselected: '/components/combobox/single-preselected',
  multiPreselected: '/components/combobox/multi-preselected',
  singleAutoShowOptions: '/components/combobox/single-auto-show-options',
  multiAutoShowOptions: '/components/combobox/multi-auto-show-options',
  singleNoForceSelection: '/components/combobox/single-no-force-selection',
  multiNoForceSelection: '/components/combobox/multi-no-force-selection',
  singlePlaceholder: '/components/combobox/single-placeholder',
  multiPlaceholder: '/components/combobox/multi-placeholder',
  singleAsync: '/components/combobox/single-async',
  multiAsync: '/components/combobox/multi-async',
  singleInForm: '/components/combobox/single-in-form',
  multiInForm: '/components/combobox/multi-in-form',
  singleInFormAutoShowOptions: '/components/combobox/single-in-form-auto-show-options',
  multiInFormAutoShowOptions: '/components/combobox/multi-in-form-auto-show-options',
  singleFormattedSelectables: '/components/combobox/single-formatted-selectables',
  multiFormattedSelectables: '/components/combobox/multi-formatted-selectables',
  singleFormattedSelectablesRemoveDuplicateSelect:
    '/components/combobox/single-formatted-selectables-remove-duplicate-select',
  singleDisabled: '/components/combobox/single-disabled',
  multiDisabled: '/components/combobox/multi-disabled',
  singleWithMissingData: '/components/combobox/single-with-missing-data',
  multiWithMissingData: '/components/combobox/multi-with-missing-data',
};

class ComboboxPage {
  readonly page: Page;

  readonly comboboxInput: Locator;

  readonly resetSelectedButton: Locator;

  readonly setSelectedButton: Locator;

  readonly comboboxOptionsContainer: Locator;

  readonly comboboxOption: Locator;

  readonly firstComboboxOption: Locator;

  readonly comboboxHighlightedOption: Locator;

  readonly checkSelectedComboboxValue: Locator;

  readonly checkFormValue: Locator;

  readonly selectedOption: Locator;

  readonly secondSelectedOptionDeleteIndicator: Locator;

  readonly asyncDataLoadingIndicator: Locator;

  readonly asyncDataBeforeThreshold: Locator;

  readonly noOptionsFound: Locator;

  readonly inputIconIndicator: Locator;

  readonly clearIconTrigger: Locator;

  readonly manualSelectedOptions: Locator;

  constructor(page: Page) {
    this.page = page;

    this.comboboxInput = page.locator('[data-id="combobox"] [data-id="input"]');
    this.resetSelectedButton = page.locator('[data-id="reset-selected-button"]');
    this.setSelectedButton = page.locator('[data-id="set-selected-button"]');
    this.comboboxOptionsContainer = page.locator('[data-id="combobox"] [data-id="options"]');
    this.comboboxOption = page.locator('[data-id="combobox"] [data-id="options"] [data-id*="option"]');
    this.firstComboboxOption = page.locator(
      '[data-id="combobox"] [data-id="options"] [data-id*="option"]:nth-child(1)',
    );
    this.comboboxHighlightedOption = page.locator(
      '[data-id="combobox"] [data-id="options"] [data-id*="highlighted-option"]',
    );
    this.checkSelectedComboboxValue = page.locator('[data-id="check-selected-combobox-value"]');
    this.checkFormValue = page.locator('[data-id="check-form-value"]');
    this.selectedOption = page.locator('[data-id="combobox"] [data-id="selected-option"]');
    this.secondSelectedOptionDeleteIndicator = page.locator(
      '[data-id="combobox"] [data-id="selected-option"]:nth-child(2) [data-id="delete-indicator"]',
    );
    this.asyncDataLoadingIndicator = page.locator('[data-id="combobox"] [data-id="async-options-loading"]');
    this.asyncDataBeforeThreshold = page.locator('[data-id="combobox"] [data-id="async-options-before-threshold"]');
    this.noOptionsFound = page.locator('[data-id="combobox"] [data-id*="no-options-found"]');
    this.inputIconIndicator = page.locator('[data-id="combobox"] [data-id="input-icon-indicator"]');
    this.clearIconTrigger = page.locator('[data-id="combobox"] [data-id="clear-icon-trigger"]');
    this.manualSelectedOptions = page.locator('[data-id="manual-selected-options"]');
  }

  async goto(url: string) {
    return await playwrightUtils.goto(this.page, url);
  }

  // selectors
  getSelectedOptionDeleteIndicator(index: number) {
    return this.page.locator(
      `[data-id="combobox"] [data-id="selected-option"]:nth-child(${index}) [data-id="delete-indicator"]`,
    );
  }

  getOption(index: number) {
    return this.page.locator(`[data-id="combobox"] [data-id="options"] [data-id*="option"]:nth-child(${index})`);
  }

  // actions
  async clickInput() {
    await this.comboboxInput.click();
  }

  async fillInput(value: string) {
    await this.comboboxInput.fill(value);
  }

  async pressInput(value: string) {
    await this.comboboxInput.press(value);
  }

  async blurInput() {
    await this.comboboxInput.blur();
  }

  async focusInput() {
    await this.comboboxInput.focus();
  }

  async clickOption(index: number) {
    await this.getOption(index).click();
  }

  async hoverOverOption(index: number) {
    await this.getOption(index).hover();
  }

  async clickSetSelectedButton() {
    await this.setSelectedButton.click();
  }

  async clickResetSelectedButton() {
    await this.resetSelectedButton.click();
  }

  async clickInputIconIndicator() {
    await this.inputIconIndicator.click();
  }

  async clickClearIconIndicator() {
    await this.clearIconTrigger.click();
  }

  async clickSelectedOptionDeleteIndicator(index: number) {
    await this.getSelectedOptionDeleteIndicator(index).click();
  }

  // validations
  async expectOptionsContainerToBeVisible(errorMessage: string) {
    await expect(this.comboboxOptionsContainer, errorMessage).toBeVisible();
  }

  async expectOptionsContainerNotToBeVisible(errorMessage: string) {
    await expect(this.comboboxOptionsContainer, errorMessage).not.toBeVisible();
  }

  async expectOptionsCount(count: number, errorMessage: string) {
    await expect(this.comboboxOption, errorMessage).toHaveCount(count);
  }

  async expectOptionToHaveText(text: string, errorMessage: string, count = 1) {
    await expect(
      this.page.locator('[data-id="combobox"] [data-id="options"] [data-id*="option"]', { hasText: text }),
      errorMessage,
    ).toHaveCount(count);
  }

  async expectSelectedOptionToHaveText(text: string, errorMessage: string, count = 1) {
    await expect(
      this.page.locator('[data-id="combobox"] [data-id="selected-option"]', { hasText: text }),
      errorMessage,
    ).toHaveCount(count);
  }

  async expectSelectedOptionsCount(count: number, errorMessage: string) {
    await expect(this.selectedOption, errorMessage).toHaveCount(count);
  }

  async expectHighlightedOptionsCount(count: number, errorMessage: string) {
    await expect(this.comboboxHighlightedOption, errorMessage).toHaveCount(count);
  }

  async expectHighlightedOptionDisplay(display: string, errorMessage: string) {
    await expect(this.comboboxHighlightedOption, errorMessage).toHaveText(display);
  }

  async expectOptionsNotToBeVisible(errorMessage: string) {
    await expect(this.comboboxOption, errorMessage).not.toBeVisible();
  }

  async expectInputToBeFocused(errorMessage: string) {
    await expect(this.comboboxInput, errorMessage).toBeFocused();
  }

  async expectInputNotToBeFocused(errorMessage: string) {
    await expect(this.comboboxInput, errorMessage).not.toBeFocused();
  }

  async expectInputValue(inputValue: string, errorMessage: string) {
    expect(await this.comboboxInput.inputValue(), errorMessage).toBe(inputValue);
  }

  async expectInputAttribute(attribute: string, value: string, errorMessage: string) {
    await expect(this.comboboxInput, errorMessage).toHaveAttribute(attribute, value);
  }

  async expectInputToBeDisabled(errorMessage: string) {
    await expect(this.comboboxInput, errorMessage).toBeDisabled();
  }

  async expectManualSelectedOptionToHaveText(text: string, errorMessage: string, count = 1) {
    await expect(this.page.locator('[data-id="manual-selected-options"]', { hasText: text }), errorMessage).toHaveCount(
      count,
    );
  }

  async expectNoOptionsFoundNotToBeVisible(errorMessage: string) {
    // we need to limit the timeout in the case as the no options found would go away when the debounce
    // async call is executed so we want to make sure the no options is not visible before then
    await expect(this.noOptionsFound, errorMessage).toHaveCount(0, { timeout: 50 });
  }

  async expectAsyncDataLoadingIndicatorNotToBeVisible(errorMessage: string) {
    await expect(this.asyncDataLoadingIndicator, errorMessage).toHaveCount(0);
  }

  async expectAsyncDataLoadingIndicatorToBeVisible(errorMessage: string) {
    await expect(this.asyncDataLoadingIndicator, errorMessage).toHaveCount(1);
  }

  async expectAsyncDataBeforeThresholdIndicatorToBeVisible(errorMessage: string) {
    await expect(this.asyncDataBeforeThreshold, errorMessage).toHaveCount(1);
  }

  async testSelectedValue(checkValue: string, isMultiSelect: boolean, errorContext?: string) {
    if (isMultiSelect) {
      await expect(this.selectedOption, errorContext).toContainText(checkValue);

      return;
    }

    await expect(this.checkSelectedComboboxValue, errorContext).toContainText(checkValue);
  }

  async testNoSelectedValue(isMultiSelect: boolean, errorContext?: string) {
    if (isMultiSelect) {
      await expect(this.selectedOption, errorContext).toHaveCount(0);

      return;
    }

    await expect(this.checkSelectedComboboxValue, errorContext).toHaveCount(0);
  }
}

test.describe('combobox @combobox-component', () => {
  test.describe('core functionality', () => {
    test('focusing the input should not show the list when not configured @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();

        await componentPage.expectOptionsCount(0, loopErrorContext);
      }
    });

    test('focusing the input shows the list when configured @component', async ({ page }) => {
      const testUrls = [urls.singleAutoShowOptions, urls.multiAutoShowOptions];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();

        await componentPage.expectOptionsCount(4, loopErrorContext);
      }
    });

    test('typing filters the list @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.fillInput('1');

        await componentPage.expectOptionsCount(1, loopErrorContext);
        await componentPage.expectHighlightedOptionsCount(0, loopErrorContext);
      }
    });

    test('using keyboard highlights item @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.fillInput('t');
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('ArrowDown');

        await componentPage.expectHighlightedOptionDisplay('test2', loopErrorContext);
      }
    });

    test('using mouse highlights item @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.fillInput('t');
        await componentPage.hoverOverOption(1);

        await componentPage.expectHighlightedOptionDisplay('test1', loopErrorContext);
      }
    });

    test('selecting an item hides the list @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.fillInput('t');
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('Enter');

        await componentPage.expectOptionsCount(0, loopErrorContext);
      }
    });

    test('the escape key hides the list @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.fillInput('t');
        await componentPage.pressInput('Escape');

        await componentPage.expectOptionsNotToBeVisible(loopErrorContext);
      }
    });

    test('the escape key works properly when showing items on focus @component', async ({ page }) => {
      const testUrls = [urls.singleAutoShowOptions, urls.multiAutoShowOptions];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.fillInput('t');
        await componentPage.pressInput('Escape');

        await componentPage.expectInputToBeFocused(loopErrorContext);
        await componentPage.expectInputValue('', loopErrorContext);
        await componentPage.expectOptionsContainerToBeVisible(loopErrorContext);

        await componentPage.pressInput('Escape');

        await componentPage.expectInputNotToBeFocused(loopErrorContext);
        await componentPage.expectOptionsNotToBeVisible(loopErrorContext);
      }
    });

    test('preselection works @component', async ({ page }) => {
      const testUrls = [urls.singlePreselected, urls.multiPreselected];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        if (!isMultiMode) {
          await componentPage.expectInputValue('test1', loopErrorContext);
        }

        await componentPage.testSelectedValue('test1', isMultiMode);
      }
    });

    test('escape clears selection @component', async ({ page }) => {
      const testUrls = [urls.singlePreselected, urls.multiPreselected];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.pressInput('Escape');

        await componentPage.expectInputValue('', loopErrorContext);

        if (!isMultiMode) {
          await componentPage.testNoSelectedValue(isMultiMode, loopErrorContext);
        }
      }
    });

    test('tab hides the list @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.fillInput('t');
        await componentPage.pressInput('Tab');

        await componentPage.expectInputNotToBeFocused(loopErrorContext);
        await componentPage.expectOptionsContainerNotToBeVisible(loopErrorContext);
      }
    });

    test('tab with nothing selected does nothing @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.fillInput('t');
        await componentPage.pressInput('Tab');

        await componentPage.expectInputValue('', loopErrorContext);

        await componentPage.testNoSelectedValue(isMultiMode, loopErrorContext);
      }
    });

    test('tab with selection should do nothing @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.fillInput('t');
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('Tab');

        await componentPage.expectInputValue('', loopErrorContext);

        await componentPage.testNoSelectedValue(isMultiMode, loopErrorContext);
      }
    });

    test('blurring hides the list @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.fillInput('t');
        await componentPage.blurInput();

        await componentPage.expectInputNotToBeFocused(loopErrorContext);
        await componentPage.expectOptionsNotToBeVisible(loopErrorContext);
      }
    });

    test('blurring with input value and nothing selected does nothing with force selection @component', async ({
      page,
    }) => {
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.fillInput('t');
        await componentPage.blurInput();

        await componentPage.expectInputValue('', loopErrorContext);

        await componentPage.testNoSelectedValue(isMultiMode, loopErrorContext);
      }
    });

    test('blurring with nothing selected but with previously selected value should keep previous value @component', async ({
      page,
    }) => {
      const testUrls = [urls.singlePreselected, urls.multiPreselected];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.fillInput('Backspace');
        await componentPage.blurInput();

        await componentPage.expectInputValue(isMultiMode ? '' : 'test1', loopErrorContext);

        await componentPage.testSelectedValue('test1', isMultiMode, loopErrorContext);
      }
    });

    test('blurring with nothing selected but with previously selected value should keep previous value with show items on focused enabled @component', async ({
      page,
    }) => {
      const testUrls = [urls.singleAutoShowOptions, urls.multiAutoShowOptions];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.fillInput('t');
        await componentPage.clickOption(1);
        await componentPage.clickInput();
        await componentPage.pressInput('Backspace');
        await componentPage.blurInput();

        await componentPage.expectInputValue(isMultiMode ? '' : 'test1', loopErrorContext);

        await componentPage.testSelectedValue('test1', isMultiMode, loopErrorContext);
      }
    });

    test('placeholder works @component', async ({ page }) => {
      const testUrls = [urls.singlePlaceholder, urls.multiPlaceholder];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.expectInputAttribute('placeholder', 'placeholder', loopErrorContext);
      }
    });

    test('setting the selected value form outside the component is reflected in the component @component', async ({
      page,
    }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.single];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickSetSelectedButton();

        await componentPage.expectInputValue('tes4', loopErrorContext);
        await componentPage.testSelectedValue('tes4', isMultiMode, loopErrorContext);
      }
    });

    test('clearing the selected value form outside the component is reflected in the component @component', async ({
      page,
    }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.single];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickSetSelectedButton();
        await componentPage.clickResetSelectedButton();

        await componentPage.expectInputValue('', loopErrorContext);
        await componentPage.testNoSelectedValue(isMultiMode, loopErrorContext);
      }
    });

    test('highlight option and then clearing the input and blur should not select that last highlighted option @component @flaky', async ({
      page,
    }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.single];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.fillInput('t');
        await componentPage.pressInput('Backspace');
        await componentPage.pressInput('Backspace');

        await componentPage.expectOptionsCount(0, loopErrorContext);

        await componentPage.blurInput();

        await componentPage.expectInputValue('', loopErrorContext);
      }
    });

    test('input icon indicator work when there is no value @component @flaky', async ({ page }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.singleNoForceSelection, urls.multiNoForceSelection];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInputIconIndicator();

        await componentPage.expectInputNotToBeFocused(loopErrorContext);
      }
    });

    test('using the keyboard to select when list is not visible should make list visible @component', async ({
      page,
    }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.single, urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.pressInput('ArrowDown');

        await componentPage.expectInputToBeFocused(loopErrorContext);
        await componentPage.expectOptionsContainerToBeVisible(loopErrorContext);
      }
    });

    test('disabled @component', async ({ page }) => {
      const testUrls = [urls.singleDisabled, urls.multiDisabled];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.expectInputToBeDisabled(loopErrorContext);
      }
    });

    test('if an option has missing data, those options are not displayed @component', async ({ page }) => {
      // we need a higher timeout for this test because we are testing code that has a built-in delay of 1 second
      // for each iteration to test the async functionality
      test.setTimeout(30000);

      const testUrls = [urls.singleWithMissingData, urls.multiWithMissingData];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();

        await componentPage.expectOptionsCount(4, loopErrorContext);
        await componentPage.expectOptionToHaveText('test1', loopErrorContext);
        await componentPage.expectOptionToHaveText('test2', loopErrorContext);
        await componentPage.expectOptionToHaveText('tes3', loopErrorContext);
        await componentPage.expectOptionToHaveText('tes4', loopErrorContext);
      }
    });
  });

  test.describe('single-select mode', () => {
    test('selecting a value should not filter that value out @component', async ({ page }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.singleAutoShowOptions];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('Enter');
        await componentPage.blurInput();
        await componentPage.focusInput();
        await componentPage.pressInput('Backspace');

        await componentPage.expectOptionsCount(2, loopErrorContext);
      }
    });

    test('input icon indicator should work when there is a selected value @component', async ({ page }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.singleNoForceSelection];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.fillInput('t');
        await componentPage.pressInput('ArrowDown');
        await componentPage.blurInput();
        await componentPage.clickClearIconIndicator();

        await componentPage.testNoSelectedValue(isMultiMode, loopErrorContext);
        await componentPage.expectInputNotToBeFocused(loopErrorContext);
      }
    });
  });

  test.describe('multi-select mode core functionality', () => {
    test('does not show previously selected items @component', async ({ page }) => {
      const testUrls = [urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();

        await componentPage.expectOptionsCount(0, loopErrorContext);

        await componentPage.clickInput();
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('Enter');
        await componentPage.pressInput('ArrowDown');

        await componentPage.expectSelectedOptionToHaveText('test1', loopErrorContext);
      }
    });

    test('can selected multiple items @component', async ({ page }) => {
      const testUrls = [urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();

        await componentPage.expectOptionsCount(0, loopErrorContext);

        await componentPage.clickInput();
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('Enter');
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('Enter');

        await componentPage.expectSelectedOptionsCount(2, loopErrorContext);
        await componentPage.expectSelectedOptionToHaveText('test1', loopErrorContext);
        await componentPage.expectSelectedOptionToHaveText('test2', loopErrorContext);
      }
    });

    test('delete selected item works @component', async ({ page }) => {
      const testUrls = [urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.expectOptionsCount(0, loopErrorContext);

        await componentPage.clickInput();
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('Enter');
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('Enter');
        await componentPage.clickSelectedOptionDeleteIndicator(2);

        await componentPage.expectSelectedOptionsCount(1, loopErrorContext);
        await componentPage.expectSelectedOptionToHaveText('test1', loopErrorContext);
      }
    });

    test('delete selected item does not show menu @component', async ({ page }) => {
      const testUrls = [urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.expectOptionsCount(0, loopErrorContext);

        await componentPage.clickInput();
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('Enter');
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('Enter');
        await componentPage.clickSelectedOptionDeleteIndicator(2);

        await componentPage.expectOptionsContainerNotToBeVisible(loopErrorContext);
      }
    });

    test('delete selected item shows back in list @component', async ({ page }) => {
      const testUrls = [urls.multi];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();

        await componentPage.expectOptionsCount(0, loopErrorContext);

        await componentPage.clickInput();
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('Enter');
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('Enter');
        await componentPage.clickSelectedOptionDeleteIndicator(2);
        await componentPage.clickInput();
        await componentPage.fillInput('t');

        await componentPage.expectOptionsCount(3, loopErrorContext);
        await componentPage.expectOptionToHaveText('test2', loopErrorContext);
      }
    });

    test('available items remain shown after selecting item with clicking when configured @component', async ({
      page,
    }) => {
      const testUrls = [urls.multiAutoShowOptions];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.pressInput('ArrowDown');
        await componentPage.clickOption(1);

        await componentPage.expectOptionsContainerToBeVisible(loopErrorContext);
        await componentPage.expectOptionsCount(3, loopErrorContext);
      }
    });

    test('available items remain shown after selecting item with enter when configured @component', async ({
      page,
    }) => {
      const testUrls = [urls.multiAutoShowOptions];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('Enter');

        await componentPage.expectOptionsContainerToBeVisible(loopErrorContext);
        await componentPage.expectOptionsCount(3, loopErrorContext);
      }
    });

    test('input icon indicator should work when there is a selected value @component', async ({ page }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.multiNoForceSelection];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.fillInput('testing new value');
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('Enter');
        await componentPage.clickInputIconIndicator();

        await componentPage.testSelectedValue('testing new value', isMultiMode, loopErrorContext);
        await componentPage.expectInputToBeFocused(loopErrorContext);
      }
    });
  });

  test.describe('show selected option in list of options', () => {
    test('selected value still show up in list of options @component', async ({ page }) => {
      const testUrls = [urls.multiFormattedSelectables];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();

        await componentPage.expectOptionsCount(0, loopErrorContext);

        await componentPage.clickInput();
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('Enter');
        await componentPage.pressInput('ArrowDown');

        await componentPage.expectOptionToHaveText('test1', loopErrorContext);
        await componentPage.expectManualSelectedOptionToHaveText('test1', loopErrorContext);
      }
    });

    test('selecting an already selected value removes that value from being selected in multi-select mode @component', async ({
      page,
    }) => {
      const testUrls = [urls.multiFormattedSelectables];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();

        await componentPage.expectOptionsCount(0, loopErrorContext);

        await componentPage.clickInput();
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('Enter');
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('Enter');

        await componentPage.expectManualSelectedOptionToHaveText('test1', loopErrorContext, 0);
      }
    });

    test('selecting an already selected value removes that value from being selected in single-select mode @component', async ({
      page,
    }) => {
      const testUrls = [urls.singleFormattedSelectablesRemoveDuplicateSelect];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();

        await componentPage.expectOptionsCount(0, loopErrorContext);

        await componentPage.clickInput();
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('Enter');
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('Enter');

        await componentPage.testNoSelectedValue(false, loopErrorContext);
      }
    });
  });

  test.describe('async item retrieval', () => {
    test('no option does not show up while the debounce is wait to be processed @component', async ({ page }) => {
      const testUrls = [urls.singleAsync, urls.multiAsync];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.fillInput('t');

        await componentPage.expectNoOptionsFoundNotToBeVisible(loopErrorContext);
      }
    });

    test('shows before threshold option @component @slow', async ({ page }) => {
      // we need a higher timeout for this test because we are testing code that has a built-in delay of 1 second
      // for each iteration to test the async functionality
      test.setTimeout(30000);

      const testUrls = [urls.singleAsync, urls.multiAsync];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.fillInput('t');

        await componentPage.expectAsyncDataLoadingIndicatorNotToBeVisible(loopErrorContext);

        // we delay in order to make sure the debounce happens, and we are still showing the before threshold content
        await playwrightUtils.pauseTest(500);

        await componentPage.expectAsyncDataBeforeThresholdIndicatorToBeVisible(loopErrorContext);
      }
    });

    test('shows async data after threshold is meet @component @slow', async ({ page }) => {
      // we need a higher timeout for this test because we are testing code that has a built-in delay of 1 second
      // for each iteration to test the async functionality
      test.setTimeout(30000);

      const testUrls = [urls.singleAsync, urls.multiAsync];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.fillInput('tes');

        await componentPage.expectAsyncDataLoadingIndicatorToBeVisible(loopErrorContext);
        await componentPage.expectOptionsCount(4, loopErrorContext);
      }
    });
  });

  test.describe('in form', () => {
    // this needs to be testing in a form context as Enter has special meaning for an input when in a form
    test('multi select selects item with enter and keeps input focused without typing @component', async ({ page }) => {
      const testUrls = [urls.multiInForm, urls.multiInFormAutoShowOptions];
      const componentPage = new ComboboxPage(page);

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await componentPage.goto(testUrls[i]);

        await componentPage.clickInput();
        await componentPage.pressInput('ArrowDown');
        await componentPage.pressInput('Enter');

        await componentPage.expectSelectedOptionsCount(1, loopErrorContext);
        await componentPage.expectInputValue('', loopErrorContext);
        await componentPage.expectInputToBeFocused(loopErrorContext);
      }
    });
  });
});
