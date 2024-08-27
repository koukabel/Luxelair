import { RedisClientType, createClient } from "redis";

let cacheClient: RedisClientType | null;

export const getCache = async () => {
  if (!cacheClient) {
    cacheClient = createClient({ url: process.env.CACHE_URL });
    await cacheClient.connect();
  }
  return cacheClient;
};

export const closeCache = async () => {
  if (cacheClient) {
    await cacheClient.quit();
    cacheClient = null;
  }
};
