import { type ParentProps, Suspense } from 'solid-js';

import GlobalNotificationsList from '$/components/global-notifications-list';
import Loading from '$/components/loading';
import { globalNotificationsStore } from '$/stores/global-notifications';
import ApplicationFrame from '$sandbox/components/application-frame';
import { dynamicRoutesStore } from '$sandbox/stores/dynamic-routes';

const ApplicationWrapper = (props: ParentProps) => {
  return (
    <>
      <ApplicationFrame isLoading={dynamicRoutesStore.isLoading()} navigation={dynamicRoutesStore.navigation()}>
        <Suspense fallback={<Loading />}>{props.children}</Suspense>
      </ApplicationFrame>
      <GlobalNotificationsList notifications={globalNotificationsStore.notifications()} />
    </>
  );
};

export default ApplicationWrapper;
