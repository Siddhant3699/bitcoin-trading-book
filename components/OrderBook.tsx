import useWebsocket from "@/hooks/useWebsocket";
import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import Bid from "./Bid";
import Ask from "./Ask";
import styles from "@/styles/OrderBook.module.css";
import { isOrderBookSnapshot, isValidResponse } from "@/resources/common";
import { WEBSOCKET_URL } from "@/resources/constants";

const OrderBook: FunctionComponent = (): ReactNode => {
  const [orderBookData, setOrderBookData] = useState<number[][]>([]);
  const [bidData, setBidData] = useState<number[][]>([]);
  const [askData, setAskData] = useState<number[][]>([]);
  const response = useWebsocket(WEBSOCKET_URL);

  useEffect((): void => {
    if (isValidResponse(response)) {
      if (isOrderBookSnapshot(response)) {
        setOrderBookData(response as number[][]);
        setBidAndAskData();
      } else {
        updateTradingBook(response as number[]);
      }
    }
  }, [response]);

  const addOrUpdateBids = (data: number[], price: number): void => {
    const bidDataCopy = [...bidData];
    const index = bidDataCopy.findIndex(
      (row: number[]): boolean => row[0] === price
    );
    if (index === -1) {
      bidDataCopy.push(data);
    } else {
      bidDataCopy[index] = data;
    }
    setBidData([...bidDataCopy]);
  };

  const addOrUpdateAsks = (data: number[], price: number): void => {
    const askDataCopy = [...askData];
    const index = askDataCopy.findIndex(
      (row: number[]): boolean => row[0] === price
    );
    if (index === -1) {
      askDataCopy.push(data);
    } else {
      askDataCopy[index] = data;
    }
    setAskData([...askDataCopy]);
  };

  const removeFromBids = (price: number): void => {
    setBidData((previousBidData: number[][]) => {
      return previousBidData.filter((data: number[]) => data[0] !== price);
    });
  };

  const removeFromAsks = (price: number): void => {
    setAskData((previousAskData: number[][]) => {
      return previousAskData.filter((data: number[]) => data[0] !== price);
    });
  };

  const updateTradingBook = (data: number[]): void => {
    const [price, count, amount] = data;
    if (count > 0) {
      if (amount > 0) {
        addOrUpdateBids(data, price);
      } else {
        addOrUpdateAsks(data, price);
      }
    } else {
      if (amount === 1) {
        removeFromBids(price);
      } else if (amount === -1) {
        removeFromAsks(price);
      }
    }
  };

  const filterBidData = (): number[][] => {
    return orderBookData.filter((data: number[]): boolean => data[2] > 0);
  };

  const filterAskData = (): number[][] => {
    return orderBookData.filter((data: number[]): boolean => data[2] <= 0);
  };

  const setBidAndAskData = (): void => {
    setBidData(filterBidData());
    setAskData(filterAskData());
  };

  if (orderBookData.length === 0) {
    return <h1 className={styles.loading}>Loading data...</h1>;
  }

  return (
    <>
      <h2 className={styles.heading}>Order Book (BTC/USD)</h2>
      <div className={styles.orderBook}>
        <Bid
          data={bidData}
          minLength={Math.min(bidData.length, askData.length)}
        />
        <Ask
          data={askData}
          minLength={Math.min(bidData.length, askData.length)}
        />
      </div>
    </>
  );
};

export default OrderBook;
