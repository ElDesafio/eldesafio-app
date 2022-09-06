// import 'focus-visible/dist/focus-visible';

import { extendTheme } from '@chakra-ui/react';

import * as components from './components';

export const theme: Record<string, any> = extendTheme({
  // ...foundations,
  components: { RadioCard: components.RadioCard },
});
