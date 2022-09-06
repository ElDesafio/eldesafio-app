import { Box, Flex, Spinner } from '@chakra-ui/react';
import { useFetcher, useParams } from '@remix-run/react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useRef } from 'react';

import type { GetProgramClasses } from '~/services/classes.service';
import { formatAttendanceChartBarsData } from '~/util/utils';

export function AttendanceChartBars() {
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
      <Flex justifyContent="center" mt={8}>
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
    <Box width="full" mb={8}>
      <HighchartsReact
        highcharts={Highcharts}
        options={formatAttendanceChartBarsData(routeData.data.classes)}
        ref={chartComponentRef}
      />
    </Box>
  );
}
