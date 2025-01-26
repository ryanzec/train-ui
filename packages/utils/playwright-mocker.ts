import type { ResponseStructure } from '$/apis/utils';
import { asyncUtils } from '$/utils/async';
import { type User, UserRoleName, UserRoleSource } from '$api/types/user';
import type { Page } from '@playwright/test';

export type PlaywrightMockEndpointOptions = {
  delay?: number;
  objectCount?: number;
};

// there needs to be a slight default delay to ensure any loading states have time to render and be detected
// by the tests
const DEFAULT_RESPONSE_DELAY = 100;

const mockGetUsersEndpoint = async (page: Page, options: PlaywrightMockEndpointOptions = {}) => {
  await page.route('http://localhost:3000/api/v1/users', async (route) => {
    await asyncUtils.sleep(options.delay || 0);
    const json: ResponseStructure<User[]> = { data: [] };

    if (json.data) {
      for (let i = 1; i <= (options.objectCount || 3); i++) {
        json.data.push({
          id: `${i}`,
          name: `Test ${i === 1 ? 'Admin1' : `User${i}`}`,
          email: `user${i}@example.com`,
          roles: [
            {
              id: UserRoleName.STYTCH_MEMBER,
              sources: [UserRoleSource.DIRECT_ASSIGNMENT],
            },
          ],
          hasPassword: true,
          createdAt: '2021-01-01T00:00:00.000Z',
          updatedAt: '2021-01-01T00:00:00.000Z',
        });
      }
    }

    await route.fulfill({ json });
  });
};

const mockGetUsersNoResultsEndpoint = async (page: Page, options: PlaywrightMockEndpointOptions = {}) => {
  await page.route('http://localhost:3000/api/v1/users', async (route) => {
    await asyncUtils.sleep(options.delay || 0);
    const json = { data: [] };
    await route.fulfill({ json });
  });
};

const mockGetSandboxQueryEndpoint = async (page: Page, options: PlaywrightMockEndpointOptions = {}) => {
  await page.route('http://localhost:3000/sandbox/query**', async (route, request) => {
    const method = request.method();

    if (method === 'POST') {
      const postData = request.postData();

      if (postData?.includes('mockerror')) {
        await asyncUtils.sleep(100);
        await route.fulfill({
          status: 500,
        });

        return;
      }

      const postDataJson = JSON.parse(request.postData() ?? '{}');

      await asyncUtils.sleep(100);
      await route.fulfill({ json: { query: { id: postDataJson.id } } });

      return;
    }

    const url = new URL(route.request().url());
    const queryData = [{ id: '1' }, { id: '2' }];
    const filter = url.searchParams.get('filter');

    if (filter) {
      queryData.push({ id: `filter given: ${filter}` });
    }

    await asyncUtils.sleep(options.delay || 0);
    const json = { query: queryData };
    await route.fulfill({ json });
  });
};

export const playwrightMockerUtils = {
  mockGetUsersEndpoint,
  mockGetUsersNoResultsEndpoint,
  mockGetSandboxQueryEndpoint,
};
