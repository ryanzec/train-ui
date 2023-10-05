import Button from '$/components/button';
import { authenticationStore } from '$web/stores/authentication.store';

const LoginView = () => {
  return (
    <div>
      <Button
        onClick={() => {
          authenticationStore.login();
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default LoginView;
