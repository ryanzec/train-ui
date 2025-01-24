import Skeleton from '$/components/skeleton';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/Skeleton',
};

export const Default = () => {
  return (
    <SandboxExamplesContainer>
      <Skeleton />
    </SandboxExamplesContainer>
  );
};

export const TenBars = () => {
  return (
    <SandboxExamplesContainer>
      <Skeleton barCount={10} />
    </SandboxExamplesContainer>
  );
};

export const VariableLength = () => {
  return (
    <SandboxExamplesContainer>
      <Skeleton barCount={20} variableLength />
    </SandboxExamplesContainer>
  );
};
