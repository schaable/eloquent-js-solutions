const fetchAs = async (url, mediaType) => {
  const response = await fetch(url, {
    headers: {
      Accept: mediaType,
    },
  });
  if (response.status !== 200) {
    throw new Error(`[${response.status}]: ${response.statusText}`);
  }
  return mediaType === 'application/json' ? response.json() : response.text();
};

(async () => {
  try {
    const contentAsPlainText = await fetchAs('https://eloquentjavascript.net/author', 'text/plain');
    console.log(contentAsPlainText);
    const contentAsHtml = await fetchAs('https://eloquentjavascript.net/author', 'text/html');
    console.log(contentAsHtml);
    const contentAsJson = await fetchAs('https://eloquentjavascript.net/author', 'application/json');
    console.log(contentAsJson);
    const contentAsRainbowsUnicorns = await fetchAs(
      'https://eloquentjavascript.net/author',
      'application/rainbows+unicorns'
    );
    console.log(contentAsRainbowsUnicorns);
  } catch (e) {
    console.log(e);
  }
})();
