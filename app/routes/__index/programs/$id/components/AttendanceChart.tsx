import { Box, Flex, Spinner } from '@chakra-ui/react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useRef } from 'react';
import { useFetcher, useParams } from 'remix';

import { formatAttendanceChartData } from '~/util/utils';

export function AttendanceChart() {
  const { id } = useParams();
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const routeData = useFetcher<{ id: number; name: string }[]>();

  console.log(routeData);

  useEffect(() => {
    routeData.load(`/programs/${id}/attendance?month=0`);
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
    <Box width="full" height="600px">
      <HighchartsReact
        highcharts={Highcharts}
        options={formatAttendanceChartData(routeData.data.classes)}
        ref={chartComponentRef}
      />
    </Box>
  );
}
