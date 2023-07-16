export type TradingBookEntry = {
  price: number;
  count: number;
  amount: number;
  total?: number;
};

export type Props = {
  data: number[][];
};

export type RawData = number[][] | number[];
