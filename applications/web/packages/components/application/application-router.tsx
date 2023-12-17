import { Router } from '@solidjs/router';

import ApplicationWrapper from '$web/components/application/application-wrapper';
import Routes from '$web/components/routing';

const ApplicationRouter = () => {
  return (
    <Router root={ApplicationWrapper}>
      <Routes />
    </Router>
  );
};

export default ApplicationRouter;
