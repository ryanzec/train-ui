import { Navigate, Route } from '@solidjs/router';
import { lazy } from 'solid-js';

import AuthenticatedRoute from '$web/components/routing/authenticated-route';
import UnauthenticatedRoute from '$web/components/routing/unauthenticated-route';

const HomeView = lazy(() => import('$web/views/home'));
const LoginView = lazy(() => import('$web/views/login'));
const LoginCompleteView = lazy(() => import('$web/views/login-complete'));
const ResetPasswordView = lazy(() => import('$web/views/reset-password'));
const AuthenticateView = lazy(() => import('$web/views/authenticate'));
const AuthenticatedDataView = lazy(() => import('$web/views/authenticated-data'));

const Routes = () => {
  return (
    <>
      <Route
        path="/login"
        component={() => (
          <UnauthenticatedRoute>
            <LoginView />
          </UnauthenticatedRoute>
        )}
      />
      <Route
        path="/authenticate"
        component={() => (
          <UnauthenticatedRoute>
            <AuthenticateView />
          </UnauthenticatedRoute>
        )}
      />
      <Route
        path="/login-complete"
        component={() => (
          <UnauthenticatedRoute>
            <LoginCompleteView />
          </UnauthenticatedRoute>
        )}
      />
      <Route
        path="/reset-password"
        component={() => (
          <UnauthenticatedRoute>
            <ResetPasswordView />
          </UnauthenticatedRoute>
        )}
      />
      <Route
        path="/home"
        component={() => (
          <AuthenticatedRoute>
            <HomeView />
          </AuthenticatedRoute>
        )}
      />
      <Route
        path="/authentication-data"
        component={() => (
          <AuthenticatedRoute>
            <AuthenticatedDataView />
          </AuthenticatedRoute>
        )}
      />
      <Route path="*" component={() => <Navigate href="home" />} />
    </>
  );
};

export default Routes;
