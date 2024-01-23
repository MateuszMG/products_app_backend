import { makeValidator } from 'envalid';

const urlEpression = `(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})`;
const regex = new RegExp(urlEpression);

export const validateUrlsArray = makeValidator((urls) => {
  const urlArray = JSON.parse(urls);
  const booleanArray = urlArray.map((url: string) =>
    Array.isArray(url.match(regex)),
  );
  const isFalsy = booleanArray.includes(false);

  if (!isFalsy) return urls;
  else throw new Error('Expected url');
});
