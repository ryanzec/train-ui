import Button from '$/components/button';
import { authenticationStore } from '$web/stores/authentication.store';

const HomeView = () => {
  return (
    <div>
      <Button
        onClick={() => {
          authenticationStore.logout();
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default HomeView;
