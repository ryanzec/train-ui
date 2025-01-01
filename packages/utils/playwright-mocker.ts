import type { ResponseStructure } from '$/apis/utils';
import type { User } from '$/data-models/user';
import { asyncUtils } from '$/utils/async';
import type { Page } from '@playwright/test';

export type PlaywrightMockEndpointOptions = {
  delay?: number;
  objectCount?: number;
};

const mockGetUsersEndpoint = async (page: Page, options: PlaywrightMockEndpointOptions = {}) => {
  await page.route('http://localhost:3000/api/v1/users', async (route) => {
    await asyncUtils.sleep(options.delay || 0);
    const json: ResponseStructure<User[]> = { data: [] };

    if (json.data) {
      for (let i = 1; i <= (options.objectCount || 3); i++) {
        json.data.push({
          id: `${i}`,
          firstName: 'Test',
          lastName: i === 1 ? 'Admin1' : `User${i}`,
          email: `user${i}@example.com`,
          password: 'password',
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

export const playwrightMockerUtils = {
  mockGetUsersEndpoint,
  mockGetUsersNoResultsEndpoint,
};
