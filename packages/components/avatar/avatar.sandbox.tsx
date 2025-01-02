import Avatar from '$/components/avatar';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/Avatar',
};

export const Default = () => {
  return (
    <SandboxExamplesContainer>
      <Avatar label="SJ" />
      <Avatar src="https://avatars.githubusercontent.com/u/444206?v=4">SJ</Avatar>
    </SandboxExamplesContainer>
  );
};

export const Count = () => {
  return (
    <SandboxExamplesContainer>
      <Avatar count={12} />
      <Avatar count={123} />
    </SandboxExamplesContainer>
  );
};

export const Stack = () => {
  return (
    <Avatar.Stack>
      <Avatar count={123} />
      <Avatar label="SJ" />
      <Avatar src="https://avatars.githubusercontent.com/u/444206?v=4">SJ</Avatar>
      <Avatar label="SJ" />
      <Avatar count={12} />
    </Avatar.Stack>
  );
};
