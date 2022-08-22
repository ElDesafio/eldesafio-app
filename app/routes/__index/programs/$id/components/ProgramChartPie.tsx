import { Box, Flex, Heading, Spinner } from '@chakra-ui/react';
import { useFetcher, useParams } from '@remix-run/react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useRef } from 'react';

import type { GetProgramClasses } from '~/services/classes.service';
import { formatProgramChartPieData } from '~/util/utils';

export function ProgramChartPie() {
  const { id } = useParams();
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const routeData = useFetcher<{ classes: GetProgramClasses }>();

  useEffect(() => {
    routeData.load(
      `/programs/${id}/attendance?month=0&include="ACTIVE"&include="INACTIVE"`,
    );
  }, []);

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
        options={formatProgramChartPieData(routeData.data.classes)}
        containerProps={{ style: { maxHeight: '100%' } }}
        ref={chartComponentRef}
      />
    </Box>
  );
}
