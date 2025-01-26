import Button from '$/components/button';
import { websocketManagerStore } from '$/stores/websocket-manager.store';
import Page from '$web/components/page';
import { authenticationStore } from '$web/stores/authentication.store';

const HomeView = () => {
  const handleLogout = () => {
    authenticationStore.logout();
  };

  const handleWebsocket = () => {
    websocketManagerStore.send('test');
  };

  return (
    <Page>
      <Page.Header>Home</Page.Header>
      <Button onClick={handleLogout}>Logout</Button>
      {/* @todo remove */}
      <Button onClick={handleWebsocket}>Send To Websocket</Button>
    </Page>
  );
};

export default HomeView;
