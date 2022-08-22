import { Button, HStack } from '@chakra-ui/react';
import type { Prisma } from '@prisma/client';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData, useNavigate, useTransition } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { z } from 'zod';

import { FormRichTextEditor } from '~/components/Form/FormRichTextEditor';
import { FormSubmitButton } from '~/components/Form/FormSubmitButton';
import { authenticator } from '~/services/auth.server';
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
const biographySchema = z.object({
  biography: z.string().nonempty('La biografía no puede estar vacía'),
});

export const biographyValidator = withZod(biographySchema);

export const loader = async ({ params }: LoaderArgs) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  return await getParticipant(+id);
};

// ACTION
export const action = async ({ request, params }: ActionArgs) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) throw json('Unauthorized', { status: 403 });

  const formData = Object.fromEntries(await request.formData());

  const fieldValues = await biographyValidator.validate(formData);

  if (fieldValues.error) return validationError(fieldValues.error);

  const participant = await db.participant.update({
    where: { id: +id },
    data: {
      biography: fieldValues.data.biography,
    },
  });

  return redirect(`/participants/${id}/biography`);
};

export default function ParticipantHealth() {
  const participant = useLoaderData<GetParticipant>();
  let navigate = useNavigate();
  const transition = useTransition();

  const isSaving = transition.state === 'submitting';

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
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <FormSubmitButton isLoading={isSaving} />
        </HStack>
      </ValidatedForm>
    </>
  );
}
