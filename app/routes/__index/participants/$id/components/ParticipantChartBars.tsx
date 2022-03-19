import { Box, Flex, Skeleton, SkeletonCircle, Spinner } from '@chakra-ui/react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useRef } from 'react';
import { useFetcher, useParams } from 'remix';

import { AlertED } from '~/components/AlertED';
import type { ClassForChart } from '~/util/utils';
import { formatAttendanceChartBarsData } from '~/util/utils';

export function ParticipantChartBars({
  allProgramsIds,
  hideProgramsIds,
}: {
  allProgramsIds: number[];
  hideProgramsIds: number[];
}) {
  const { id } = useParams();
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const routeData = useFetcher<ClassForChart[]>();

  const params = new URLSearchParams();

  allProgramsIds.forEach((programId) => {
    if (!hideProgramsIds.includes(programId)) {
      params.append('programId', programId.toString());
    }
  });

  useEffect(() => {
    routeData.load(`/api/participant/${id}/attendance/?${params.toString()}`);
  }, [params.toString()]);

  return (
    <Box width="full" mt={8}>
      <Skeleton width="full" isLoaded={!!routeData.data} minHeight="400px">
        {routeData?.data ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={formatAttendanceChartBarsData(routeData.data)}
            ref={chartComponentRef}
          />
        ) : (
          <AlertED
            status="error"
            description="Hubo un error al cargar las asistencias"
          />
        )}
      </Skeleton>
    </Box>
  );
}
