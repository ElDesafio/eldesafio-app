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
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';
import { ClientOnly } from 'remix-utils';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { LinkED } from '~/components/LinkED';
import { MarkdownEditor } from '~/components/MarkdownEditor/markdown-editor';
import type { GetUserDiaryEvent } from '~/services/users.service';
import { getLoggedInUser, getUserDiaryEvent } from '~/services/users.service';
import { getFormattedDate, getUserDiaryTypeProps } from '~/util/utils';

export const loader: LoaderFunction = async ({ params, request }) => {
  const { eventId } = z.object({ eventId: zfd.numeric() }).parse(params);

  const user = await getLoggedInUser(request);

  const event = await getUserDiaryEvent({ eventId });

  return { event, timezone: user.timezone };
};

export default function UserDiaryEvent() {
  const { event, timezone } = useLoaderData<{
    event: GetUserDiaryEvent;
    timezone: string;
  }>();

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
                variant={getUserDiaryTypeProps(event.type).variant}
                colorScheme={getUserDiaryTypeProps(event.type).tagColor}
              >
                {getUserDiaryTypeProps(event.type).text}
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
