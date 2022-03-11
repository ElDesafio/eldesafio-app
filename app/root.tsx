import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  ChakraProvider,
  extendTheme,
  Text,
  theme as chakraTheme,
} from '@chakra-ui/react';
import { withEmotionCache } from '@emotion/react';
import NProgress from 'nprogress';
import nProgressStyles from 'nprogress/nprogress.css';
import type React from 'react';
import { useContext, useEffect, useState } from 'react';
import remirrorStyles from 'remirror/styles/all.css';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useTransition,
} from 'remix';
import type { Socket } from 'socket.io-client';
import io from 'socket.io-client';

import favicon from '~/assets/logo.png';
import { theme } from '~/lib/chakra-ui-pro-theme';
import { newrelic } from '~/lib/newrelic';
import styles from '~/styles/styles.css';

import ClientStyleContext from './context.client';
import ServerStyleContext from './context.server';
import { SocketProvider } from './socketContext';
type DocumentProps = {
  children: React.ReactNode;
  title?: string;
};

export function links() {
  return [
    { rel: 'stylesheet', href: remirrorStyles },
    { rel: 'stylesheet', href: nProgressStyles },
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: styles },
    { type: 'text/javascript', src: './lib/newrelic.js' },
  ];
}

const Document = withEmotionCache(
  ({ children, title = `El Desafio` }: DocumentProps, emotionCache) => {
    const serverSyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);
    const transition = useTransition();
    const [socket, setSocket] = useState<Socket>();

    useEffect(() => {
      const socket = io();
      setSocket(socket);
      return () => {
        socket.close();
      };
    }, []);

    useEffect(() => {
      if (!socket) return;
      // socket.on('confirmation', (data) => {
      //   console.log(data);
      // });
    }, [socket]);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData.reset();
    }, []);

    useEffect(() => {
      // when the state is idle then we can to complete the progress bar
      if (transition.state === 'idle') NProgress.done();
      // and when it's something else it means it's either submitting a form or
      // waiting for the loaders of the next location so we start it
      else NProgress.start();
    }, [transition.state]);

    // Theme is customized here: app/lib/chakra-ui-pro-theme/index.ts
    const myTheme = extendTheme(
      {
        colors: {
          ...chakraTheme.colors,
          'bg-surface': {
            default: 'white',
            _dark: 'gray.800',
          },
          brand: chakraTheme.colors.blue,
        },
      },
      theme,
    );

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <link rel="icon" href={favicon} type="image/x-icon" />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
          {serverSyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(' ')}`}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
          <script
            dangerouslySetInnerHTML={{
              __html: newrelic,
            }}
          />
        </head>

        <body>
          <SocketProvider socket={socket}>
            <ChakraProvider theme={myTheme}>
              {children}
              <ScrollRestoration />
              <Scripts />
              {process.env.NODE_ENV === 'development' && <LiveReload />}
            </ChakraProvider>
          </SocketProvider>
          <script
            src="https://upload-widget.cloudinary.com/global/all.js"
            type="text/javascript"
          />
        </body>
      </html>
    );
  },
);

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Document title="Error!">
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Error
        </AlertTitle>
        <AlertDescription maxWidth="sm">{error.message}</AlertDescription>
      </Alert>
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <Text>
          Oops! Estás tratando de acceder a una página a la cual no tenés
          acceso.
        </Text>
      );
      break;
    case 404:
      message = <Text>Oops! La pagina que estás buscando no existe.</Text>;
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} - ${caught.statusText}`}>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          {caught.status}: {caught.statusText}
        </AlertTitle>
        <AlertDescription maxWidth="sm">{message}</AlertDescription>
      </Alert>
    </Document>
  );
}
