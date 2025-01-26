import { Navigate } from '@solidjs/router';
import type { JSX } from 'solid-js';

import { authenticationStore } from '$web/stores/authentication.store';
import { RoutePath } from '$web/utils/application';

const AuthenticatedRoute = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
  if (!authenticationStore.isAuthenticated()) {
    return <Navigate href={RoutePath.LOGIN} />;
  }

  return props.children;
};

export default AuthenticatedRoute;
