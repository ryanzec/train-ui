import { describe, expect, it } from 'vitest';

import { applicationConfiguration } from '$web/utils/application';

describe('application utils', () => {
  describe('getGlobalVariable', () => {
    it('getting base api url works', () => {
      const results = applicationConfiguration.baseApiUrl;

      expect(results).to.equal('https://example.com');
    });
  });
});
