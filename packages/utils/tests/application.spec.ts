import { describe, expect, it } from 'vitest';

import { GlobalVariable, applicationUtils } from '$web/utils/application';

describe('application utils', () => {
  describe('getGlobalVariable', () => {
    it('getting base api url works', () => {
      const results = applicationUtils.getGlobalVariable(GlobalVariable.BASE_API_URL);

      expect(results).to.equal('https://example.com');
    });
  });
});
