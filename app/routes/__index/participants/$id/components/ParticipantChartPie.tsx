import {
  Box,
  Flex,
  Heading,
  Skeleton,
  SkeletonCircle,
  Spinner,
} from '@chakra-ui/react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useRef } from 'react';
import { useFetcher, useParams } from 'remix';

import { AlertED } from '~/components/AlertED';
import type { ClassForChart } from '~/util/utils';
import { formatProgramChartPieData } from '~/util/utils';

export function ParticipantChartPie({
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
    return null;
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
      <SkeletonCircle size="300" mx="auto" isLoaded={!!routeData.data}>
        {routeData?.data ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={formatProgramChartPieData(routeData.data)}
            containerProps={{ style: { maxHeight: '100%' } }}
            ref={chartComponentRef}
          />
        ) : (
          <AlertED
            status="error"
            description="Hubo un error al cargar las asistencias"
          />
        )}
      </SkeletonCircle>
    </Box>
  );
}
