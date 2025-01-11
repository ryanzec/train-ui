import EmptyIndicator from '$/components/empty-indicator';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/EmptyIndicator',
};

export const WithAction = () => {
  const handleTriggerAction = () => {
    console.log('trigger action');
  };

  return (
    <SandboxExamplesContainer>
      <EmptyIndicator label="This is the label content." actionLabel="Action" onTriggerAction={handleTriggerAction} />
    </SandboxExamplesContainer>
  );
};

export const WithoutAction = () => {
  return (
    <SandboxExamplesContainer>
      <EmptyIndicator label="This is the label content." />
    </SandboxExamplesContainer>
  );
};
