import { Button, Divider, Heading, Stack } from '@chakra-ui/react';
import type { Prisma } from '@prisma/client';
import type { LoaderFunction } from 'remix';
import { Link, useLoaderData } from 'remix';
import { z } from 'zod';

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
      <Heading as="h3" size="sm">
        Biografía
      </Heading>
      <Divider mb={3} />
      {participant?.biography ? (
        <MarkdownEditor
          initialContent={participant.biography}
          editable={false}
        />
      ) : (
        <p>No hay biografía para el participante</p>
      )}
      <Stack direction="row" mt={6} justifyContent="center" width="full">
        <Link to={`edit`}>
          <Button colorScheme="blue">Editar</Button>
        </Link>
      </Stack>
    </>
  );
}
