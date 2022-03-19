import { Box, Flex, Heading, Spinner } from '@chakra-ui/react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useRef } from 'react';
import { useFetcher, useParams } from 'remix';

import type { ClassForChart } from '~/util/utils';
import { formatProgramChartPieData } from '~/util/utils';

export function ParticipantChartPie() {
  const { id } = useParams();
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const routeData = useFetcher<ClassForChart[]>();

  useEffect(() => {
    routeData.load(`/api/participant/${id}/attendance/?programId=1`);
  }, []);

  console.log(routeData);

  if (!routeData?.data) {
    return (
      <Flex
        justifyContent="center"
        mt={8}
        width="100%"
        height="100%"
        alignSelf="stretch"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <Box width="100%" height="100%" mb={8}>
      <Heading
        as="h3"
        size="md"
        fontWeight={500}
        textAlign="center"
        mb={4}
        mt={{ base: 6, md: 0 }}
      >
        Asistencia
      </Heading>

      <HighchartsReact
        highcharts={Highcharts}
        options={formatProgramChartPieData(routeData.data)}
        containerProps={{ style: { maxHeight: '100%' } }}
        ref={chartComponentRef}
      />
    </Box>
  );
}
