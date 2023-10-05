import { Route, Routes as SolidRoutes, Navigate } from '@solidjs/router';
import { lazy } from 'solid-js';

import AuthenticatedRoute from '$web/components/routing/authenticated-route';
import UnauthenticatedRoute from '$web/components/routing/unauthenticated-route';

const HomeView = lazy(() => import('$web/views/home'));
const LoginView = lazy(() => import('$web/views/login'));
const LoginRedirect = lazy(() => import('$web/views/login-redirect'));
const AuthenticatedDataView = lazy(() => import('$web/views/authenticated-data'));

const Routes = () => {
  return (
    <SolidRoutes>
      <Route
        path="/login"
        element={
          <UnauthenticatedRoute>
            <LoginView />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path="/login/redirect"
        element={
          <UnauthenticatedRoute>
            <LoginRedirect />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <AuthenticatedRoute>
            <HomeView />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/authentication-data"
        element={
          <AuthenticatedRoute>
            <AuthenticatedDataView />
          </AuthenticatedRoute>
        }
      />
      <Route path="*" element={<Navigate href="home" />} />
    </SolidRoutes>
  );
};

export default Routes;
