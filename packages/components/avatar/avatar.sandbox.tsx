import Avatar from '$/components/avatar';

export default {
  title: 'Components/Avatar',
};

export const Default = () => {
  return (
    <div>
      <Avatar label="SJ" />
      <Avatar src="https://avatars.githubusercontent.com/u/444206?v=4">SJ</Avatar>
    </div>
  );
};

export const Count = () => {
  return (
    <div>
      <Avatar count={12} />
      <Avatar count={123} />
    </div>
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
