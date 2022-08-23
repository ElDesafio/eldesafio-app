import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Form,
  useActionData,
  useLoaderData,
  useSearchParams,
  useTransition,
} from '@remix-run/react';

import { Logo } from '~/components/Logo';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';
import { getSession } from '~/services/session.server';

export let loader = async ({ request }: LoaderArgs) => {
  await authenticator.isAuthenticated(request, { successRedirect: '/' });
  const session = await getSession(request.headers.get('Cookie'));

  const url = new URL(request.url);
  const magicLinkSent = url.searchParams.get('magicLinkSent');
  const error = session.get('auth:error');

  return json({ magicLinkSent: !!magicLinkSent, error });
};

export let action = async ({ request }: ActionArgs) => {
  const clonedRequest = request.clone();
  const formData = Object.fromEntries(await clonedRequest.formData());

  const user = await db.user.findUnique({
    where: {
      email: formData.email as string,
    },
  });

  if (!user) {
    return json({
      message: 'user not found',
    });
  }

  if (user.status === 'INACTIVE') {
    return json({
      message: 'user deactivated',
    });
  }

  // The success redirect is required in this action, this is where the user is
  // going to be redirected after the magic link is sent, note that here the
  // user is not yet authenticated, so you can't send it to a private page.
  await authenticator.authenticate('email-link', request, {
    successRedirect: '/login?magicLinkSent=true',
    // If this is not set, any error will be throw and the ErrorBoundary will be
    // rendered.
    failureRedirect: '/login',
  });
};

export default function Login() {
  let { magicLinkSent, error } = useLoaderData<typeof loader>();
  let response = useActionData<{ message: string }>();
  let [searchParams, setSearchParams] = useSearchParams();

  const transition = useTransition();

  const isSaving = transition.state === 'submitting';

  return (
    <Box
      bgGradient={{ sm: 'linear(to-r, blue.600, blue.100)' }}
      py={{ base: '12', md: '24' }}
      height="100vh"
    >
      <Container
        maxW="md"
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        bg={useBreakpointValue({ base: 'transparent', sm: 'white' })}
        boxShadow={{ base: 'none', sm: 'xl' }}
        borderRadius={{ base: 'none', sm: 'xl' }}
      >
        <Stack spacing="8">
          <Stack spacing="6" align="center">
            <Logo color="blue" />
            <Stack spacing="3" textAlign="center">
              <Heading size="md">Accedé a tu cuenta</Heading>
              {/* <Text color="muted">Start making your dreams come true</Text> */}
            </Stack>
          </Stack>
          <Form method="post" reloadDocument>
            <Stack spacing="6">
              <Stack spacing="4">
                <Input
                  id="email"
                  name="email"
                  placeholder="Correo electrónico"
                  onFocus={() => {
                    const magicLinkSentValueParam =
                      searchParams.get('magicLinkSent');
                    if (!!magicLinkSentValueParam) {
                      searchParams.delete('magicLinkSent');
                    }
                    setSearchParams(searchParams, { replace: false });
                  }}
                />
                <Button type="submit" colorScheme="blue" isLoading={isSaving}>
                  Continuar
                </Button>
              </Stack>
            </Stack>
          </Form>
          {magicLinkSent && (
            <Alert status="success" colorScheme="blue">
              <AlertIcon />
              Correo enviado! Revisa tu casilla 😃
            </Alert>
          )}
          {response?.message === 'user not found' && (
            <Alert status="error">
              <AlertIcon />
              No existe un usuario con ese correo
            </Alert>
          )}
          {error?.message ===
            'Sign in link invalid. Please request a new one.' && (
            <Alert status="error">
              <AlertIcon />
              El link no es válido. Probá abriendo el link del correo en el
              mismo navegador desde donde lo solicitaste o volvé a solicitar uno
              nuevo.
            </Alert>
          )}
          {(error?.message === 'User is inactive' ||
            response?.message === 'user deactivated') && (
            <Alert status="error">
              <AlertIcon />
              Tu cuenta está desactivada y ya no podés acceder a la app.
            </Alert>
          )}
          <Stack spacing="0.5" align="center">
            <Text fontSize="sm" color="muted">
              ¿Problemas para acceder?
            </Text>
            <Button variant="link" colorScheme="blue" size="sm">
              <a href="mailto:app@eldesafio.org">Contactanos</a>
            </Button>
          </Stack>
          <Text fontSize="xs" color="subtle" textAlign="center">
            Al darle click a &quot;Continuar&quot; vas a recibir un correo
            electrónico con un link para acceder a la app.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
