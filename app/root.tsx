import { Box, ChakraProvider, Divider, Heading, Text } from '@chakra-ui/react';
import { withEmotionCache } from '@emotion/react';
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
} from 'remix';

import ClientStyleContext from './context.client';
import ServerStyleContext from './context.server';

type DocumentProps = {
  children: React.ReactNode;
  title?: string;
};

export function links() {
  return [{ rel: 'stylesheet', href: remirrorStyles }];
}

const Document = withEmotionCache(
  ({ children, title = `El Desafio` }: DocumentProps, emotionCache) => {
    const serverSyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

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
          <ChakraProvider>
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
