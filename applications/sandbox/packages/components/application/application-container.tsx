import { type JSX, Suspense } from 'solid-js';

import GlobalNotifications from '$/components/global-notifications';
import Loading from '$/components/loading';
import ScrollArea from '$/components/scroll-area';
import { globalNotificationsStore } from '$/stores/global-notifications.store';
import ApplicationFrame from '$sandbox/components/application-frame';
import { dynamicRoutesStore } from '$sandbox/stores/dynamic-routes';

const ApplicationContainer = (props: JSX.ButtonHTMLAttributes<HTMLElement>) => {
  return (
    <>
      <ScrollArea>
        <ApplicationFrame isLoading={dynamicRoutesStore.isLoading()} navigation={dynamicRoutesStore.navigation()}>
          <Suspense fallback={<Loading />}>{props.children}</Suspense>
        </ApplicationFrame>
      </ScrollArea>
      <GlobalNotifications notifications={globalNotificationsStore.notifications()} />
    </>
  );
};

export default ApplicationContainer;
