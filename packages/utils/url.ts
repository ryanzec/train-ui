const parseUrlObject = (tryUrl: string) => {
  let urlObject: URL | null = null;

  try {
    urlObject = new URL(tryUrl);
  } catch (error) {
    // typescript does not support types catch error so this seems like the most straight forward solution to that
    const typedError = error as Error;

    // we only want to re-throw the error if it is not an invalid url error (which is expected)
    if (!typedError.toString().includes('Invalid URL')) {
      throw error;
    }

    urlObject = null;
  }

  return urlObject;
};

// allowing undefined for the hostname to support the URL.hostname property
const parseDomainName = (hostname?: string) => {
  if (!hostname) {
    return hostname;
  }

  const hostnameParts = hostname.split('.');

  // weird urls (like when viewing extension managemnet) can sometimes only have 1 part
  if (hostnameParts.length <= 2) {
    return hostname;
  }

  return `${hostnameParts[1]}.${hostnameParts[2]}`;
};

export const urlUtils = {
  parseUrlObject,
  parseDomainName,
};
