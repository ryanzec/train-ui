import ErrorIndicator from '$/components/error-indicator';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/ErrorIndicator',
};

export const Default = () => {
  const handleTriggerAction = () => {
    console.log('trigger action');
  };

  return (
    <SandboxExamplesContainer>
      <ErrorIndicator label="This is the label content." actionLabel="Action" onTriggerAction={handleTriggerAction} />
    </SandboxExamplesContainer>
  );
};
