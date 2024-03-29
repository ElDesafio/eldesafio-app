import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Spacer,
  Table,
  Tag,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ClientOnly } from 'remix-utils';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { LinkED } from '~/components/LinkED';
import { MarkdownEditor } from '~/components/MarkdownEditor/markdown-editor';
import { getParticipantDiaryEvent } from '~/services/participants.service';
import { getLoggedInUser } from '~/services/users.service';
import { getFormattedDate, getParticipantDiaryTypeProps } from '~/util/utils';

export async function loader({ params, request }: LoaderArgs) {
  const { eventId } = z.object({ eventId: zfd.numeric() }).parse(params);

  const user = await getLoggedInUser(request);

  const event = await getParticipantDiaryEvent({ eventId });

  return json({ event, timezone: user.timezone });
}

export default function ParticipantDiaryEvent() {
  const { event, timezone } = useLoaderData<typeof loader>();

  if (!event) {
    throw new Error("The event doesn't exist");
  }

  return (
    <>
      <Flex alignItems="center">
        <Heading size="md" mb="0">
          {event.title}
        </Heading>
        <Spacer />
        <LinkED to="edit">
          <Button size="sm" colorScheme="blue">
            Editar
          </Button>
        </LinkED>
      </Flex>
      <Divider mt="2" mb="8" />
      <Table className="general-info-table" variant="simple">
        <Tbody>
          <Tr>
            <Td width="" fontWeight="600">
              Fecha:
            </Td>
            <Td>
              <ClientOnly>
                {() =>
                  getFormattedDate({
                    date: event.date,
                    timezone,
                    format: 'DATETIME_FULL',
                  })
                }
              </ClientOnly>
            </Td>
          </Tr>
          <Tr>
            <Td fontWeight="600">Tipo:</Td>
            <Td>
              <Tag
                size="sm"
                variant={getParticipantDiaryTypeProps(event.type).variant}
                colorScheme={getParticipantDiaryTypeProps(event.type).tagColor}
              >
                {getParticipantDiaryTypeProps(event.type).text}
              </Tag>
            </Td>
          </Tr>
          <Tr>
            <Td fontWeight="600">Programas:</Td>
            <Td>
              {' '}
              <HStack spacing={1}>
                {event.programs.map(({ program }) => (
                  <LinkED key={program.id} to={`/programs/${program.id}`}>
                    <Tag size="sm" variant="outline" colorScheme="gray">
                      {program.name}
                    </Tag>
                  </LinkED>
                ))}
              </HStack>
            </Td>
          </Tr>
          <Tr>
            <Td fontWeight="600" verticalAlign="top">
              Descripción:
            </Td>
            <Td>
              <Box
                css={css`
                  .remirror-editor-wrapper {
                    padding-top: 0 !important;
                  }
                `}
              >
                <MarkdownEditor
                  initialContent={event.description ?? undefined}
                  editable={false}
                />
              </Box>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
}
