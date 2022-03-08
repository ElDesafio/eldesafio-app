import createCache from '@emotion/cache';

export default function createEmotionCache() {
  const cache = createCache({ key: 'css' });
  cache.compat = true;
  return cache;
}
