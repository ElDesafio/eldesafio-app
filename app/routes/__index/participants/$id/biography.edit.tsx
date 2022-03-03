import {
  Button,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import type { Prisma } from '@prisma/client';
import type { LoaderFunction } from 'remix';
import { Link, useLoaderData, useNavigate } from 'remix';
import { ValidatedForm, withZod } from 'remix-validated-form';
import { z } from 'zod';

import { FormRichTextEditor } from '~/components/Form/FormRichTextEditor';
import { FormSubmitButton } from '~/components/Form/FormSubmitButton';
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

const biographySchema = z.object({
  biography: z.string(),
});

export const biographyValidator = withZod(biographySchema);

export default function ParticipantHealth() {
  const participant = useLoaderData<GetParticipant>();
  let navigate = useNavigate();

  return (
    <>
      <ValidatedForm
        validator={biographyValidator}
        defaultValues={{ biography: participant?.biography || '' }}
        method="post"
        noValidate
      >
        <FormRichTextEditor name="biography" />
        <HStack width="full" justifyContent="center" mt="8">
          <FormSubmitButton />
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
        </HStack>
      </ValidatedForm>
    </>
  );
}
