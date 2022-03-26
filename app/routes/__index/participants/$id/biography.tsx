import { Button, Divider, Heading, Stack } from '@chakra-ui/react';
import type { Prisma } from '@prisma/client';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';
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

export type GetParticipant = Prisma.PromiseReturnType<typeof getParticipant>;

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  return await getParticipant(+id);
};

export default function ParticipantHealth() {
  const participant = useLoaderData<GetParticipant>();

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
