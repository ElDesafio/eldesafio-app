import { Container, Progress } from '@chakra-ui/react';
import { useNProgress } from '@tanem/react-nprogress';

export function ProgressBar({ isAnimating }: { isAnimating: boolean }) {
  const { isFinished, progress } = useNProgress({
    isAnimating,
    incrementDuration: 500,
  });

  if (isFinished) return null;

  return (
    <Container
      position="fixed"
      padding={0}
      top={0}
      width="100vw"
      minWidth="100vw"
      zIndex={1000000}
    >
      <Progress
        value={progress * 100}
        colorScheme="yellow"
        size="xs"
        height="2px"
        backgroundColor="transparent"
        sx={{
          '& > div:first-child': {
            transitionProperty: 'width',
          },
        }}
      />
    </Container>
  );
}
