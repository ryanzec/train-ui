import { type Page, expect, test } from '@playwright/test';

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

const locators = {
  resetSelectedButton: '[data-id="reset-selected-button"]',
  setSelectedButton: '[data-id="set-selected-button"]',
  comboboxInput: '[data-id="combobox"] [data-id="input"]',
  comboboxOptionsContainer: '[data-id="combobox"] [data-id="options"]',
  comboboxOptions: '[data-id="combobox"] [data-id="options"] [data-id*="option"]',
  firstComboboxOption: '[data-id="combobox"] [data-id="options"] [data-id*="option"]:nth-child(1)',
  comboboxHighlightedOption: '[data-id="combobox"] [data-id="options"] [data-id*="highlighted-option"]',
  checkSelectedComboboxValue: '[data-id="check-selected-combobox-value"]',
  checkFormValue: '[data-id="check-form-value"]',
  selectedOptions: '[data-id="combobox"] [data-id="selected-option"]',
  secondSelectedOptionDeleteIndicator:
    '[data-id="combobox"] [data-id="selected-option"]:nth-child(2) [data-id="delete-indicator"]',
  asyncDataLoadingIndicator: '[data-id="combobox"] [data-id="async-options-loading"]',
  asyncDataBeforeThreshold: '[data-id="combobox"] [data-id="async-options-before-threshold"]',
  noOptionsFound: '[data-id="combobox"] [data-id*="no-options-found"]',
  inputIconIndicator: '[data-id="combobox"] [data-id="input-icon-indicator"]',
  clearIconTrigger: '[data-id="combobox"] [data-id="clear-icon-trigger"]',
  manualSelectedOptions: '[data-id="manual-selected-options"]',
};

const testSelectedValue = async (page: Page, checkValue: string, isMultiSelect: boolean, errorContext?: string) => {
  if (isMultiSelect) {
    await expect(page.locator(locators.selectedOptions), errorContext).toContainText(checkValue);

    return;
  }

  await expect(page.locator(locators.checkSelectedComboboxValue), errorContext).toContainText(checkValue);
};

const testNoSelectedValue = async (page: Page, isMultiSelect: boolean, errorContext?: string) => {
  if (isMultiSelect) {
    await expect(page.locator(locators.selectedOptions), errorContext).toHaveCount(0);

    return;
  }

  await expect(page.locator(locators.checkSelectedComboboxValue), errorContext).toHaveCount(0);
};

test.describe('auto complete', () => {
  test.describe('core functionality', () => {
    test('focusing the input should not show the list when not configured @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();

        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toHaveCount(0);
      }
    });

    test('focusing the input shows the list when configured @component', async ({ page }) => {
      const testUrls = [urls.singleAutoShowOptions, urls.multiAutoShowOptions];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();

        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toHaveCount(4);
      }
    });

    test('typing filters the list @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).type('1');

        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toHaveCount(1);
        await expect(page.locator(locators.comboboxHighlightedOption), loopErrorContext).toHaveCount(0);
      }
    });

    test('using keyboard highlights item @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).type('t');
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).press('ArrowDown');

        await expect(page.locator(locators.comboboxHighlightedOption), loopErrorContext).toHaveText('test2');
      }
    });

    test('using mouse highlights item @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).type('t');
        await page.locator(locators.firstComboboxOption).hover();

        await expect(page.locator(locators.comboboxHighlightedOption), loopErrorContext).toHaveText('test1');
      }
    });

    test('selecting an item hides the list @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).type('t');
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).press('Enter');

        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toHaveCount(0);
      }
    });

    test('the escape key hides the list @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).type('t');
        await page.locator(locators.comboboxInput).press('Escape');

        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toBeHidden();
      }
    });

    test('the escape key works properly when showing items on focus @component', async ({ page }) => {
      const testUrls = [urls.singleAutoShowOptions, urls.multiAutoShowOptions];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).type('t');
        await page.locator(locators.comboboxInput).press('Escape');

        await expect(page.locator(locators.comboboxInput), loopErrorContext).toBeFocused();
        expect(await page.locator(locators.comboboxInput).inputValue(), loopErrorContext).toBe('');

        await expect(page.locator(locators.comboboxOptionsContainer), loopErrorContext).toBeVisible();
        await page.locator(locators.comboboxInput).press('Escape');

        await expect(page.locator(locators.comboboxInput), loopErrorContext).not.toBeFocused();
        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toBeHidden();
      }
    });

    test('preselection works @component', async ({ page }) => {
      const testUrls = [urls.singlePreselected, urls.multiPreselected];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        if (!isMultiMode) {
          expect(await page.locator(locators.comboboxInput).inputValue(), loopErrorContext).toBe('test1');
        }

        await testSelectedValue(page, 'test1', isMultiMode);
      }
    });

    test('escape clears selection @component', async ({ page }) => {
      const testUrls = [urls.singlePreselected, urls.multiPreselected];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).press('Escape');

        expect(await page.locator(locators.comboboxInput).inputValue(), loopErrorContext).toBe('');

        if (!isMultiMode) {
          await testNoSelectedValue(page, isMultiMode, loopErrorContext);
        }
      }
    });

    test('tab hides the list @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).type('t');
        await page.locator(locators.comboboxInput).press('Tab');

        await expect(page.locator(locators.comboboxInput), loopErrorContext).not.toBeFocused();
        await expect(page.locator(locators.comboboxOptionsContainer), loopErrorContext).toBeHidden();
      }
    });

    test('tab with nothing selected does nothing @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).type('t');
        await page.locator(locators.comboboxInput).press('Tab');

        expect(await page.locator(locators.comboboxInput).inputValue(), loopErrorContext).toBe('');

        await testNoSelectedValue(page, isMultiMode, loopErrorContext);
      }
    });

    test('tab with selection should select that item @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).type('t');
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).press('Tab');

        expect(await page.locator(locators.comboboxInput).inputValue(), loopErrorContext).toBe(
          isMultiMode ? '' : 'test1',
        );

        await testSelectedValue(page, 'test1', isMultiMode, loopErrorContext);
      }
    });

    test('blurring hides the list @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).type('t');
        await page.locator(locators.comboboxInput).blur();

        await expect(page.locator(locators.comboboxInput), loopErrorContext).not.toBeFocused();
        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toBeHidden();
      }
    });

    test('blurring with input value and nothing selected does nothing with force selection @component', async ({
      page,
    }) => {
      const testUrls = [urls.single, urls.multi];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).type('t');
        await page.locator(locators.comboboxInput).blur();

        expect(await page.locator(locators.comboboxInput).inputValue(), loopErrorContext).toBe('');

        await testNoSelectedValue(page, isMultiMode, loopErrorContext);
      }
    });

    test('blurring with input value and nothing selected uses input value without force selection @component', async ({
      page,
    }) => {
      const testUrls = [urls.singleNoForceSelection, urls.multiNoForceSelection];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).type('testing new value');
        await page.locator(locators.comboboxInput).blur();

        expect(await page.locator(locators.comboboxInput).inputValue(), loopErrorContext).toBe(
          isMultiMode ? '' : 'testing new value',
        );

        await testSelectedValue(page, 'testing new value', isMultiMode, loopErrorContext);
      }
    });

    test('blurring with selection should select that value @component', async ({ page }) => {
      const testUrls = [urls.single, urls.multi];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).type('t');
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).blur();

        expect(await page.locator(locators.comboboxInput).inputValue(), loopErrorContext).toBe(
          isMultiMode ? '' : 'test1',
        );

        await testSelectedValue(page, 'test1', isMultiMode, loopErrorContext);
      }
    });

    test('blurring with nothing selected but with previously selected value should keep previous value @component', async ({
      page,
    }) => {
      const testUrls = [urls.singlePreselected, urls.multiPreselected];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).type('Backspace');
        await page.locator(locators.comboboxInput).blur();

        expect(await page.locator(locators.comboboxInput).inputValue(), loopErrorContext).toBe(
          isMultiMode ? '' : 'test1',
        );

        await testSelectedValue(page, 'test1', isMultiMode, loopErrorContext);
      }
    });

    test('blurring with nothing selected but with previously selected value should keep previous value with show items on focused enabled @component', async ({
      page,
    }) => {
      const testUrls = [urls.singleAutoShowOptions, urls.multiAutoShowOptions];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).type('t');
        await page.locator(locators.firstComboboxOption).click();
        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).press('Backspace');
        await page.locator(locators.comboboxInput).blur();

        expect(await page.locator(locators.comboboxInput).inputValue(), loopErrorContext).toBe(
          isMultiMode ? '' : 'test1',
        );

        await testSelectedValue(page, 'test1', isMultiMode, loopErrorContext);
      }
    });

    test('placeholder works @component', async ({ page }) => {
      const testUrls = [urls.singlePlaceholder, urls.multiPlaceholder];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await expect(page.locator(locators.comboboxInput), loopErrorContext).toHaveAttribute(
          'placeholder',
          'placeholder',
        );
      }
    });

    test('setting the selected value form outside the component is reflected in the component @component', async ({
      page,
    }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.single];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.setSelectedButton).click();

        await expect(await page.locator(locators.comboboxInput).inputValue(), loopErrorContext).toBe('tes4');
        await testSelectedValue(page, 'tes4', isMultiMode, loopErrorContext);
      }
    });

    test('clearing the selected value form outside the component is reflected in the component @component', async ({
      page,
    }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.single];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.setSelectedButton).click();
        await page.locator(locators.resetSelectedButton).click();

        await expect(await page.locator(locators.comboboxInput).inputValue(), loopErrorContext).toBe('');
        await testNoSelectedValue(page, isMultiMode, loopErrorContext);
      }
    });

    test('highlight option and then clearing the input and blur should not select that last highlighted option @component @flaky', async ({
      page,
    }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.single];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).type('t');
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).press('Backspace');

        // validate no options are visible which means that nothing should be selected
        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toHaveCount(0);

        await page.locator(locators.comboboxInput).blur();

        await expect(await page.locator(locators.comboboxInput).inputValue(), loopErrorContext).toBe('');
      }
    });

    test('input icon indicator work when there is no value @component', async ({ page }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.singleNoForceSelection, urls.multiNoForceSelection];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.inputIconIndicator).click();

        await expect(page.locator(locators.comboboxInput), loopErrorContext).toBeFocused();
      }
    });

    test('using the keyboard to select when list is not visible should make list visible @component', async ({
      page,
    }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.single, urls.multi];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).press('ArrowDown');

        await expect(page.locator(locators.comboboxInput), loopErrorContext).toBeFocused();
        await expect(page.locator(locators.comboboxOptionsContainer), loopErrorContext).toBeVisible();
      }
    });

    test('disabled @component', async ({ page }) => {
      const testUrls = [urls.singleDisabled, urls.multiDisabled];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await expect(page.locator(locators.comboboxInput), loopErrorContext).toBeDisabled();
      }
    });

    test('if an option has missing data, those options are not displayed @component', async ({ page }) => {
      // we need a higher timeout for this test because we are testing code that has a built-in delay of 1 second
      // for each iteration to test the async functionality
      test.setTimeout(30000);

      const testUrls = [urls.singleWithMissingData, urls.multiWithMissingData];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();

        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toHaveCount(4);
        await expect(page.locator(locators.comboboxOptions, { hasText: 'test1' }), loopErrorContext).toHaveCount(1);
        await expect(page.locator(locators.comboboxOptions, { hasText: 'test2' }), loopErrorContext).toHaveCount(1);
        await expect(page.locator(locators.comboboxOptions, { hasText: 'tes3' }), loopErrorContext).toHaveCount(1);
        await expect(page.locator(locators.comboboxOptions, { hasText: 'tes4' }), loopErrorContext).toHaveCount(1);
      }
    });
  });

  test.describe('single-select mode', () => {
    test('selecting a value should not filter that value out @component', async ({ page }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.singleAutoShowOptions];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).type('t');
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).blur();
        await page.locator(locators.comboboxInput).focus();
        await page.locator(locators.comboboxInput).press('Backspace');

        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toHaveCount(2);
      }
    });

    test('input icon indicator should work when there is a selected value @component', async ({ page }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.singleNoForceSelection];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).type('t');
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).blur();
        await page.locator(locators.clearIconTrigger).click();

        await testNoSelectedValue(page, isMultiMode, loopErrorContext);
        await expect(page.locator(locators.comboboxInput), loopErrorContext).not.toBeFocused();
      }
    });
  });

  test.describe('multi-select mode core functionality', () => {
    test('does not show previously selected items @component', async ({ page }) => {
      const testUrls = [urls.multi];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();

        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toHaveCount(0);

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).press('Enter');
        await page.locator(locators.comboboxInput).press('ArrowDown');

        await expect(page.locator(locators.comboboxOptions, { hasText: 'test1' }), loopErrorContext).toHaveCount(0);
      }
    });

    test('can selected multiple items @component', async ({ page }) => {
      const testUrls = [urls.multi];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();

        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toHaveCount(0);

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).press('Enter');
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).press('Enter');

        await expect(page.locator(locators.selectedOptions), loopErrorContext).toHaveCount(2);
        await expect(page.locator(locators.selectedOptions, { hasText: 'test1' }), loopErrorContext).toHaveCount(1);
        await expect(page.locator(locators.selectedOptions, { hasText: 'test2' }), loopErrorContext).toHaveCount(1);
      }
    });

    test('delete selected item works @component', async ({ page }) => {
      const testUrls = [urls.multi];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();

        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toHaveCount(0);

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).press('Enter');
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).press('Enter');
        await page.locator(locators.secondSelectedOptionDeleteIndicator).click();

        await expect(page.locator(locators.selectedOptions), loopErrorContext).toHaveCount(1);
        await expect(page.locator(locators.selectedOptions, { hasText: 'test1' }), loopErrorContext).toHaveCount(1);
      }
    });

    test('delete selected item shows back in list @component', async ({ page }) => {
      const testUrls = [urls.multi];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();

        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toHaveCount(0);

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).press('Enter');
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).press('Enter');
        await page.locator(locators.secondSelectedOptionDeleteIndicator).click();
        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).type('t');

        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toHaveCount(3);
        await expect(page.locator(locators.comboboxOptions, { hasText: 'test2' }), loopErrorContext).toHaveCount(1);
      }
    });

    test('available items remain shown after selecting item with clicking when configured @component', async ({
      page,
    }) => {
      const testUrls = [urls.multiAutoShowOptions];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.firstComboboxOption).click();

        await expect(page.locator(locators.comboboxOptionsContainer), loopErrorContext).toBeVisible();
        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toHaveCount(3);
      }
    });

    test('available items remain shown after selecting item with enter when configured @component', async ({
      page,
    }) => {
      const testUrls = [urls.multiAutoShowOptions];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).press('Enter');

        await expect(page.locator(locators.comboboxOptionsContainer), loopErrorContext).toBeVisible();
        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toHaveCount(3);
      }
    });

    test('input icon indicator should work when there is a selected value @component', async ({ page }) => {
      // multi select does not display anything in the input when something is selected
      const testUrls = [urls.multiNoForceSelection];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('/multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).type('testing new value');
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).press('Enter');
        await page.locator(locators.inputIconIndicator).click();

        await testSelectedValue(page, 'testing new value', isMultiMode, loopErrorContext);
        await expect(page.locator(locators.comboboxInput)).toBeFocused();
      }
    });
  });

  test.describe('show selected option in list of options', () => {
    test('selected value still show up in list of options @component', async ({ page }) => {
      const testUrls = [urls.multiFormattedSelectables];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();

        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toHaveCount(0);

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).press('Enter');
        await page.locator(locators.comboboxInput).press('ArrowDown');

        await expect(page.locator(locators.comboboxOptions, { hasText: 'test1' }), loopErrorContext).toHaveCount(1);
        await expect(page.locator(locators.manualSelectedOptions, { hasText: 'test1' }), loopErrorContext).toHaveCount(
          1,
        );
      }
    });

    test('selecting an already selected value removes that value from being selected in multi-select mode @component', async ({
      page,
    }) => {
      const testUrls = [urls.multiFormattedSelectables];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();

        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toHaveCount(0);

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).press('Enter');
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).press('Enter');

        await expect(page.locator(locators.manualSelectedOptions, { hasText: 'test1' }), loopErrorContext).toHaveCount(
          0,
        );
      }
    });

    test('selecting an already selected value removes that value from being selected in single-select mode @component', async ({
      page,
    }) => {
      const testUrls = [urls.singleFormattedSelectablesRemoveDuplicateSelect];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();

        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toHaveCount(0);

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).press('Enter');
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).press('Enter');

        await testNoSelectedValue(page, false, loopErrorContext);
      }
    });
  });

  test.describe('async item retrieval', () => {
    test('no option does not show up while the debounce is wait to be processed @component', async ({ page }) => {
      const testUrls = [urls.singleAsync, urls.multiAsync];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).type('t');

        // we need to limit the timeout in the case as the no options found would go away when the debounce
        // async call is executed so we want to make sure the no options is not visible before then
        await expect(page.locator(locators.noOptionsFound), loopErrorContext).toHaveCount(0, { timeout: 50 });
      }
    });

    test('shows before threshold option @component @slow', async ({ page }) => {
      // we need a higher timeout for this test because we are testing code that has a built-in delay of 1 second
      // for each iteration to test the async functionality
      test.setTimeout(30000);

      const testUrls = [urls.singleAsync, urls.multiAsync];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).type('t');

        await expect(page.locator(locators.asyncDataLoadingIndicator), loopErrorContext).toHaveCount(0);

        // we delay in order to make sure that the debounce happen and we are still showing the before threshold content
        await playwrightUtils.pauseTest(500);

        await expect(page.locator(locators.asyncDataBeforeThreshold), loopErrorContext).toHaveCount(1);
      }
    });

    test('shows async data after threshold is meet @component @slow', async ({ page }) => {
      // we need a higher timeout for this test because we are testing code that has a built-in delay of 1 second
      // for each iteration to test the async functionality
      test.setTimeout(30000);

      const testUrls = [urls.singleAsync, urls.multiAsync];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).type('tes');

        await expect(page.locator(locators.asyncDataLoadingIndicator), loopErrorContext).toHaveCount(1);
        await expect(page.locator(locators.comboboxOptions), loopErrorContext).toHaveCount(4);
      }
    });
  });

  test.describe('in form', () => {
    // this needs to be testing in a form context as Enter has special meaning for an input when in a form
    test('multi select selects item with enter and keeps input focused without typing @component', async ({ page }) => {
      const testUrls = [urls.multiInForm, urls.multiInFormAutoShowOptions];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(playwrightUtils.buildUrl(testUrls[i]));

        await page.locator(locators.comboboxInput).click();
        await page.locator(locators.comboboxInput).press('ArrowDown');
        await page.locator(locators.comboboxInput).press('Enter');

        await expect(page.locator(locators.selectedOptions), loopErrorContext).toHaveCount(1);
        await expect(await page.locator(locators.comboboxInput).inputValue(), loopErrorContext).toBe('');
        await expect(page.locator(locators.comboboxInput), loopErrorContext).toBeFocused();
      }
    });
  });

  test.describe('native select replacement', () => {
    test.fixme('TODO: select value still show in list', async ({ page }) => {});

    test.fixme('TODO: scrolls to the selected option', async ({ page }) => {});
  });
});
