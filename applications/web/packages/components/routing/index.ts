import AuthenticatedRoute from '$web/components/routing/authenticated-route';
import Routes from '$web/components/routing/routes';
import UnauthenticatedRoute from '$web/components/routing/unauthenticated-route';

export default Object.assign(Routes, {
  AuthenticatedRoute,
  UnauthenticatedRoute,
});
