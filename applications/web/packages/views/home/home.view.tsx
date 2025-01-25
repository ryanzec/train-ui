import Button from '$/components/button';
import { websocketManagerStore } from '$/stores/websocket-manager.store';
import { authenticationStore } from '$web/stores/authentication.store';

const HomeView = () => {
  const handleLogout = () => {
    authenticationStore.logout();
  };

  const handleWebsocket = () => {
    websocketManagerStore.send('test');
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
      {/* @todo remove */}
      <Button onClick={handleWebsocket}>Send To Websocket</Button>
    </div>
  );
};

export default HomeView;
