import { Navigate } from '@solidjs/router';
import type { ParentProps } from 'solid-js';

import { authenticationStore } from '$web/stores/authentication.store';

const AuthenticatedRoute = (props: ParentProps) => {
  if (!authenticationStore.isAuthenticated()) {
    return <Navigate href="/login" />;
  }

  return props.children;
};

export default AuthenticatedRoute;
