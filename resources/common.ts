import { RawData, TradingBookEntry } from "@/resources/types";

export const isValidResponse = (response: RawData): boolean => {
  return response && response.length > 0;
};

export const isOrderBookSnapshot = (data: RawData): boolean => {
  return data[0].constructor === Array;
};

export const buildOrderBookObject = (data: number[]): TradingBookEntry => {
  return {
    price: data[0],
    count: data[1],
    amount: Math.abs(data[2]),
  };
};

export const generateOrderBookTotal = (
  data: TradingBookEntry[]
): TradingBookEntry[] => {
  let currentTotal = 0;
  data.forEach((row: TradingBookEntry) => {
    const total = row.amount + currentTotal;
    row.total = total;
    currentTotal = total;
  });
  return data;
};
