import { type Locator, type Page, test } from '@playwright/test';

// @todo generic
// biome-ignore lint/suspicious/noExplicitAny: response can be anything
const mockApi = async (page: Page, url: string, responseData: Record<string, any>) => {
  await page.route(url, async (route) => {
    await route.fulfill({ json: responseData });
  });
};

type DragAndDropParams = {
  page: Page;
  dragLocator: Locator;
  dropLocator: Locator;
};

// based on this article
// https://reflect.run/articles/how-to-test-drag-and-drop-interactions-in-playwright/
const dragAndDrop = async ({ page, dragLocator, dropLocator }: DragAndDropParams) => {
  if (!dragLocator || !dropLocator) {
    test.fail(!dragLocator, 'can not do drag and drop because drag element was not located');
    test.fail(!dropLocator, 'can not do drag and drop because drop element was not located');

    // this is just a cleaner way make typescript not complain below instead of having to do null checks
    return;
  }

  const dragBoundingBox = await dragLocator.boundingBox();
  const dropBoundingBox = await dropLocator.boundingBox();

  if (!dragBoundingBox || !dropBoundingBox) {
    test.fail(!dragBoundingBox, 'can not do drag and drop because dragging bounding box was not located');
    test.fail(!dropBoundingBox, 'can not do drag and drop because dropping bounding box element was not located');

    // this is just a cleaner way make typescript not complain below instead of having to do null checks
    return;
  }

  // we want to target the center of the elements for the drag and drop
  const dragCenterX = dragBoundingBox.x + dragBoundingBox.width / 2;
  const dragCenterY = dragBoundingBox.y + dragBoundingBox.height / 2;
  const dropCenterX = dropBoundingBox.x + dropBoundingBox.width / 2;
  const dropCenterY = dropBoundingBox.y + dropBoundingBox.height / 2;

  // // moving the mouse to the center of the drag HTML element
  await page.mouse.move(dragCenterX, dragCenterY);
  await page.mouse.down();
  await page.mouse.move(dropCenterX, dropCenterY);
  await page.mouse.up();
};

const pauseTest = async (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

type BuildUrlOptions = {
  includeApiMocks?: boolean;
};

const defaultBuildUrlOptions = {
  includeApiMocks: false,
};

const buildUrl = (baseUrl: string, optionOverrides: BuildUrlOptions = {}) => {
  const options = structuredClone(Object.assign({}, defaultBuildUrlOptions, optionOverrides));
  const url = baseUrl;
  const searchParams = new URLSearchParams();

  if (!options.includeApiMocks) {
    searchParams.set('disable_api_mocks', 'true');
  }

  return `${url}?${searchParams.toString()}`;
};

const goto = async (page: Page, url: string) => {
  await page.goto(url);
};

export const playwrightUtils = {
  mockApi,
  dragAndDrop,
  pauseTest,
  buildUrl,
  goto,
};
