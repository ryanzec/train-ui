import { Navigate, Route } from '@solidjs/router';
import { lazy } from 'solid-js';

import AuthenticatedRoute from '$web/components/routing/authenticated-route';
import UnauthenticatedRoute from '$web/components/routing/unauthenticated-route';

const HomeView = lazy(() => import('$web/views/home'));
const LoginView = lazy(() => import('$web/views/login'));
const ForgotPasswordView = lazy(() => import('$web/views/forgot-password'));
const ResetPasswordView = lazy(() => import('$web/views/reset-password'));
const AuthenticatedDataView = lazy(() => import('$web/views/authenticated-data'));
const InviteAuthenticateView = lazy(() => import('$web/views/authenticate-invite/authenticate-invite'));
const UsersView = lazy(() => import('$web/views/users'));
const OnboardingView = lazy(() => import('$web/views/onboarding'));

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
        path="/invite-authenticate"
        component={() => (
          <UnauthenticatedRoute>
            <InviteAuthenticateView />
          </UnauthenticatedRoute>
        )}
      />
      <Route
        path="/forgot-password"
        component={() => (
          <UnauthenticatedRoute>
            <ForgotPasswordView />
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
      <Route
        path="/users"
        component={() => (
          <AuthenticatedRoute>
            <UsersView />
          </AuthenticatedRoute>
        )}
      />
      <Route
        path="/onboarding"
        component={() => (
          <AuthenticatedRoute>
            <OnboardingView />
          </AuthenticatedRoute>
        )}
      />
      <Route path="*" component={() => <Navigate href="home" />} />
    </>
  );
};

export default Routes;
