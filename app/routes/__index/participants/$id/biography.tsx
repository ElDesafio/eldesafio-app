import { Button, Divider, Heading, Stack } from '@chakra-ui/react';
import type { Prisma } from '@prisma/client';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { z } from 'zod';

import { AlertED } from '~/components/AlertED';
import { LinkED } from '~/components/LinkED';
import { MarkdownEditor } from '~/components/MarkdownEditor/markdown-editor';
import { db } from '~/services/db.server';

export async function getParticipant(id: number) {
  return await db.participant.findUnique({
    where: { id: +id },
    select: {
      id: true,
      biography: true,
    },
  });
}

export const loader = async ({ params }: LoaderArgs) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const participant = await getParticipant(+id);
  return json({ participant });
};

export default function ParticipantHealth() {
  const { participant } = useLoaderData<typeof loader>();

  return (
    <>
      <Heading as="h3" size="md">
        Biografía
      </Heading>
      <Divider mb={3} />
      {participant?.biography ? (
        <MarkdownEditor
          initialContent={participant.biography}
          editable={false}
        />
      ) : (
        <AlertED
          title="Vacía"
          description="No hay biografía para el participante"
        />
      )}
      <Stack direction="row" mt={6} justifyContent="center" width="full">
        <LinkED to="edit">
          <Button colorScheme="blue">Editar</Button>
        </LinkED>
      </Stack>
    </>
  );
}
