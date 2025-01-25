import { Router } from '@solidjs/router';

import ApplicationContainer from '$web/components/application/application-container';
import Routes from '$web/components/routing';

const ApplicationRouter = () => {
  return (
    <Router root={ApplicationContainer}>
      <Routes />
    </Router>
  );
};

export default ApplicationRouter;
