import { Box, Skeleton } from '@chakra-ui/react';
import { useFetcher, useParams } from '@remix-run/react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useRef } from 'react';

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

  if (routeData.data && routeData.data.length === 0) {
    return (
      <AlertED
        mt={8}
        title="Vacío"
        description="No hay clases para el participante. Los gráficos se van a mostrar cuando el participante tenga al menos 1 clase."
      >
        {' '}
      </AlertED>
    );
  }

  return (
    <Box width="full" mt={8}>
      <Skeleton
        width="full"
        isLoaded={!!routeData.data}
        minHeight="400px"
        borderRadius="lg"
      >
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
