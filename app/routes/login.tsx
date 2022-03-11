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
import type { ActionFunction, LoaderFunction } from 'remix';
import {
  Form,
  json,
  useActionData,
  useLoaderData,
  useSearchParams,
  useTransition,
} from 'remix';

import { Logo } from '~/components/Logo';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';

export let loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, { successRedirect: '/' });

  const url = new URL(request.url);
  const magicLinkSent = url.searchParams.get('magicLinkSent');
  const error = url.searchParams.get('error');

  return json({ magicLinkSent: !!magicLinkSent, error });
};

export let action: ActionFunction = async ({ request }) => {
  const clonedRequest = request.clone();
  const formData = Object.fromEntries(await clonedRequest.formData());

  const user = await db.user.findUnique({
    where: {
      email: formData.email as string,
    },
  });

  console.log('user', user);

  if (!user) {
    return json({
      message: 'user not found',
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
  let { magicLinkSent, error } =
    useLoaderData<{ magicLinkSent: boolean; error: string | undefined }>();
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
            <Logo />
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
          {error === 'magic-link' && (
            <Alert status="error">
              <AlertIcon />
              Ocurrió un error. Probá abriendo el link del correo en el mismo
              navegador desde donde lo solicitaste o volvé a solicitar un nuevo
              correo.
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
