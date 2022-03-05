import {
  Box,
  ChakraProvider,
  Divider,
  extendTheme,
  Heading,
  Text,
  theme as chakraTheme,
} from '@chakra-ui/react';
import { withEmotionCache } from '@emotion/react';
import NProgress from 'nprogress';
import nProgressStyles from 'nprogress/nprogress.css';
import type React from 'react';
import { useContext, useEffect } from 'react';
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

import { theme } from '~/lib/chakra-ui-pro-theme';
import styles from '~/styles/styles.css';

import ClientStyleContext from './context.client';
import ServerStyleContext from './context.server';

type DocumentProps = {
  children: React.ReactNode;
  title?: string;
};

export function links() {
  return [
    { rel: 'stylesheet', href: remirrorStyles },
    { rel: 'stylesheet', href: nProgressStyles },
    { rel: 'stylesheet', href: styles },
  ];
}

const Document = withEmotionCache(
  ({ children, title = `El Desafio` }: DocumentProps, emotionCache) => {
    const serverSyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);
    const transition = useTransition();

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
        colors: { ...chakraTheme.colors, brand: chakraTheme.colors.blue },
      },
      theme,
    );

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
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
        </head>
        <body>
          <ChakraProvider theme={myTheme}>
            {children}
            <ScrollRestoration />
            <Scripts />
            {process.env.NODE_ENV === 'development' && <LiveReload />}
          </ChakraProvider>
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
      <Box>
        <Heading as="h1">There was an error</Heading>
        <Text>{error.message}</Text>
        <Divider />
        <Text>
          Hey, developer, you should replace this with what you want your users
          to see.
        </Text>
      </Box>
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
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </Text>
      );
      break;
    case 404:
      message = (
        <Text>
          Oops! Looks like you tried to visit a page that does not exist.
        </Text>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} - ${caught.statusText}`}>
      <Heading as="h1">
        {caught.status}: {caught.statusText}
      </Heading>
      {message}
    </Document>
  );
}
