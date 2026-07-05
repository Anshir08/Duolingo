import { StreamClient } from '@stream-io/node-sdk';

let streamClient: StreamClient | null = null;

export function getStreamServerClient() {
  const apiKey = process.env.STREAM_API_KEY;
  const apiSecret = process.env.STREAM_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error('Missing STREAM_API_KEY or STREAM_API_SECRET');
  }

  if (!streamClient) {
    streamClient = new StreamClient(apiKey, apiSecret);
  }

  return streamClient;
}

export function getStreamApiKey() {
  const apiKey = process.env.STREAM_API_KEY;

  if (!apiKey) {
    throw new Error('Missing STREAM_API_KEY');
  }

  return apiKey;
}
