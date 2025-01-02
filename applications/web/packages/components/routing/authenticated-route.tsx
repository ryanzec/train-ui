import { Navigate } from '@solidjs/router';
import type { JSX } from 'solid-js';

import { authenticationStore } from '$web/stores/authentication.store';

const AuthenticatedRoute = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
  if (!authenticationStore.isAuthenticated()) {
    return <Navigate href="/login" />;
  }

  return props.children;
};

export default AuthenticatedRoute;
