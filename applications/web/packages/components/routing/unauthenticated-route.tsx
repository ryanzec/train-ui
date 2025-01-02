import { Navigate } from '@solidjs/router';
import type { JSX } from 'solid-js';

import { authenticationStore } from '$web/stores/authentication.store';

const UnauthenticatedRoute = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
  if (authenticationStore.isAuthenticated()) {
    // @todo(!!!) look for redirect in query string
    return <Navigate href="/home" />;
  }

  return props.children;
};

export default UnauthenticatedRoute;
