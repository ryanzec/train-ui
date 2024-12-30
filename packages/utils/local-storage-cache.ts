export interface LocalStorageCacheData {
  // biome-ignore lint/suspicious/noExplicitAny: any is being used as we do want to be able to store any kind of data here
  value: any;
  expires: number | boolean;
}

const get = (key: string) => {
  const now = new Date().getTime();
  const rawData = localStorage.getItem(key);

  if (!rawData) {
    return null;
  }

  // @todo(feature) handle when data is not valid json
  const storedData = JSON.parse(rawData);

  // biome-ignore lint/suspicious/noExplicitAny: any is being used as we do want to be able to store any kind of data here
  let returnData: any;

  if (storedData?.expires && storedData.expires <= now) {
    //clean up expired data
    localStorage.removeItem(key);
  } else if (storedData) {
    returnData = storedData.value;
  }

  return returnData;
};

// biome-ignore lint/suspicious/noExplicitAny: any is being used as we do want to be able to store any kind of data here
const set = (key: string, value: any, expireIn = 0) => {
  const expires = new Date().getTime();

  const data: LocalStorageCacheData = {
    value: value,
    expires: expireIn > 0 ? expires + expireIn : false,
  };

  return localStorage.setItem(key, JSON.stringify(data));
};

const remove = (key: string) => {
  localStorage.removeItem(key);
};

const clear = () => {
  localStorage.clear();
};

export const localStorageCacheUtils = {
  get,
  set,
  remove,
  clear,
};
