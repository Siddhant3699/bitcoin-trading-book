export const WEBSOCKET_URL = "wss://api-pub.bitfinex.com/ws/2";

export const DATA_LENGTH = 25;

export const WEBSOCKET_MESSAGE = {
  event: "subscribe",
  channel: "book",
  symbol: "tBTCUSD",
  len: DATA_LENGTH.toString(),
};
