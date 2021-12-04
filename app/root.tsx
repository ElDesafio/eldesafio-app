import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import { ChakraProvider } from "@chakra-ui/react";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {/* {title ? <title>{title}</title> : null} */}
        <title>Remix: So great, it's funny!</title>

        <Meta />
        <Links />
      </head>
      <body>
        <ChakraProvider>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </ChakraProvider>
      </body>
    </html>
  );
}
