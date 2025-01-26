import { Navigate } from '@solidjs/router';
import type { JSX } from 'solid-js';

import { authenticationStore } from '$web/stores/authentication.store';
import { RoutePath } from '$web/utils/application';

const UnauthenticatedRoute = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
  if (authenticationStore.isAuthenticated()) {
    // @todo(!!!) look for redirect in query string
    return <Navigate href={RoutePath.HOME} />;
  }

  return props.children;
};

export default UnauthenticatedRoute;
