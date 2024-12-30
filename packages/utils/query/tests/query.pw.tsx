import { test, expect, Page } from '@playwright/test';

import { playwrightUtils } from '$/utils/playwright';

const urls = {
  cachingData: '/utils/query/caching-data',
  dynamicQueryParameters: '/utils/query/dynamic-query-parameters',
  getDataWithDelay: '/utils/query/get-data-with-delay',
  mutationManual: '/utils/query/mutation-manual',
  mutationQuery: '/utils/query/mutation-query',
  mutationQueryOptimistic: '/utils/query/mutation-query-optimistic',
  noInitialFetch: '/utils/query/no-initial-fetch',
};

const locators = {
  item: '[data-id="item"]',
  loadingIndicator: '[data-id="loading-indicator"]',
  initiallyFetchedIndicator: '[data-id="initially-fetched-indicator"]',
  refetchDataTrigger: '[data-id="refetch-data-trigger"]',
  addItemTrigger: '[data-id="add-item-trigger"]',
  filterInput: '[data-id="filter-input"]',
  createInput: '[data-id="create-input"]',
  createFailedIndicator: '[data-id="create-failed-indicator"]',
  creatingIndicator: '[data-id="creating-indicator"]',
};

test.describe('query', () => {
  test.describe('core', () => {
    test('getting data @component', async ({ page }) => {
      await page.goto(playwrightUtils.buildUrl(urls.getDataWithDelay, { includeApiMocks: true }));

      await expect(page.locator(locators.loadingIndicator)).toHaveCount(1);
      await expect(page.locator(locators.initiallyFetchedIndicator)).toContainText('true');

      await expect(page.locator(locators.item)).toHaveCount(2);
      await expect(page.locator(locators.loadingIndicator)).toHaveCount(0);
    });

    test('dynamic query parameters does not cause extra data fetching @component', async ({ page }) => {
      await page.goto(playwrightUtils.buildUrl(urls.dynamicQueryParameters, { includeApiMocks: true }));

      await expect(page.locator(locators.item)).toHaveCount(2);

      await page.locator(locators.filterInput).type('filter');

      await expect(page.locator(locators.loadingIndicator)).toHaveCount(0);

      await page.locator(locators.refetchDataTrigger).click();

      await expect(page.locator(locators.loadingIndicator)).toHaveCount(1);
      await expect(page.locator(locators.item)).toHaveCount(3);
      await expect(page.locator(locators.item).nth(2)).toContainText('filter');
    });

    test('deferred initial fetch for data @component', async ({ page }) => {
      await page.goto(playwrightUtils.buildUrl(urls.noInitialFetch, { includeApiMocks: true }));

      await expect(page.locator(locators.item)).toHaveCount(0);
      await expect(page.locator(locators.loadingIndicator)).toHaveCount(0);
      await expect(page.locator(locators.initiallyFetchedIndicator)).toContainText('false');

      await page.locator(locators.refetchDataTrigger).click();

      await expect(page.locator(locators.loadingIndicator)).toHaveCount(1);
      await expect(page.locator(locators.initiallyFetchedIndicator)).toContainText('true');

      await expect(page.locator(locators.item)).toHaveCount(2);
      await expect(page.locator(locators.loadingIndicator)).toHaveCount(0);
    });
  });

  test.describe('cache', () => {
    test('loads direct from cache when available @component', async ({ page }) => {
      await page.goto(playwrightUtils.buildUrl(urls.cachingData, { includeApiMocks: true }));

      // we have to wait for the refetch data trigger to be available to know that the cache timer has started
      await expect(page.locator(locators.refetchDataTrigger)).toHaveCount(1);

      await page.locator(locators.refetchDataTrigger).click();
    });

    test('loads from api when the cache has expired @component @flaky', async ({ page }) => {
      await page.goto(playwrightUtils.buildUrl(urls.cachingData, { includeApiMocks: true }));

      // we have to wait for the refetch data trigger to be available to know that the cache timer has started
      await expect(page.locator(locators.refetchDataTrigger)).toHaveCount(1);

      // cache is 2 seconds long
      await playwrightUtils.pauseTest(2100);

      await page.locator(locators.refetchDataTrigger).click();

      await expect(page.locator(locators.loadingIndicator)).toHaveCount(1);
    });
  });

  test.describe('mutation', () => {
    test('can mutate the cached data directly @component', async ({ page }) => {
      await page.goto(playwrightUtils.buildUrl(urls.mutationManual, { includeApiMocks: true }));

      await page.locator(locators.addItemTrigger).click();

      await expect(page.locator(locators.item)).toHaveCount(3);
      await expect(page.locator(locators.item).nth(2)).toHaveText('ID: 3', { timeout: 10 });
    });

    test('can mutate the cached data as part of a mutation query @component', async ({ page }) => {
      await page.goto(playwrightUtils.buildUrl(urls.mutationQuery, { includeApiMocks: true }));

      await page.locator(locators.createInput).type('create');
      await page.locator(locators.addItemTrigger).click();

      await expect(page.locator(locators.creatingIndicator)).toHaveCount(1);
      await expect(page.locator(locators.item)).toHaveCount(3);
      await expect(page.locator(locators.item).nth(2)).toHaveText('ID: create');
      await expect(page.locator(locators.creatingIndicator)).toHaveCount(0);
    });

    test('can mutate the cached data as part of a mutation query optimistically when it succeeds @component', async ({
      page,
    }) => {
      await page.goto(playwrightUtils.buildUrl(urls.mutationQueryOptimistic, { includeApiMocks: true }));

      await page.locator(locators.createInput).fill('create');
      await page.locator(locators.addItemTrigger).click();

      await expect(page.locator(locators.item)).toHaveCount(3);

      // use short timeout to make sure the item is added immediately
      await expect(page.locator(locators.item).nth(2)).toHaveText('ID: create (creating...)', { timeout: 10 });

      // make sure it completes successfully
      await expect(page.locator(locators.item).nth(2)).toHaveText('ID: create');
    });

    test('can mutate the cached data as part of a mutation query optimistically and vert when it fails @component', async ({
      page,
    }) => {
      await page.goto(playwrightUtils.buildUrl(urls.mutationQueryOptimistic, { includeApiMocks: true }));

      await page.locator(locators.createInput).type('mockerror|test|');
      await page.locator(locators.addItemTrigger).click();

      await expect(page.locator(locators.item)).toHaveCount(3);

      // use short timeout to make sure the item is added immediately
      await expect(page.locator(locators.item).nth(2)).toHaveText('ID: mockerror|test| (creating...)', { timeout: 10 });

      // make sure the new it was removed becuase of the failure
      await expect(page.locator(locators.item)).toHaveCount(2);
      await expect(page.locator(locators.createFailedIndicator)).toHaveCount(1);
    });
  });
});
