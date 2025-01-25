import { Router } from '@solidjs/router';

import { asyncUtils } from '$/utils/async';
import { type HttpRequest, httpUtils } from '$/utils/http';
import ApplicationContainer from '$web/components/application/application-container';
import Routes from '$web/components/routing';
import { onCleanup, onMount } from 'solid-js';

const ApplicationRouter = () => {
  onMount(() => {
    const responseAuthenticationInterceptor = async (
      // biome-ignore lint/suspicious/noExplicitAny: this handles generic requests so it needs to allow for any
      requestOptions: HttpRequest<any>,
      // biome-ignore lint/suspicious/noExplicitAny: this handles generic requests so it needs to allow for any
      response: any,
      rawResponse: Response,
    ) => {
      console.log(response);
      console.log(rawResponse);

      // @todo(!!!) logout with 401 error response
      return response;
    };

    httpUtils.addHttpResponseInterceptor(responseAuthenticationInterceptor);

    onCleanup(() => {
      httpUtils.removeHttpResponseInterceptor(responseAuthenticationInterceptor);
    });
  });
  return (
    <Router root={ApplicationContainer}>
      <Routes />
    </Router>
  );
};

export default ApplicationRouter;
