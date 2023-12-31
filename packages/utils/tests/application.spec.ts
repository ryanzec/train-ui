import { expect, describe, it } from 'vitest';

import { applicationUtils, GlobalVariable } from '$web/utils/application';

describe('application utils', () => {
  describe('getGlobalVariable', () => {
    it('getting base api url works', () => {
      const results = applicationUtils.getGlobalVariable(GlobalVariable.BASE_API_URL);

      expect(results).to.equal('https://example.com');
    });
  });
});
