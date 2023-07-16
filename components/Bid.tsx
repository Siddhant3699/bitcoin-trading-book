import {
  buildOrderBookObject,
  generateOrderBookTotal,
} from "@/resources/common";
import { TradingBookEntry, Props } from "@/resources/types";
import styles from "@/styles/Table.module.css";
import { FunctionComponent, ReactNode } from "react";

const Bid: FunctionComponent<Props> = (props: Props): ReactNode => {
  const data = props.data.map(
    (row: number[]): TradingBookEntry => buildOrderBookObject(row)
  );

  const bidData = generateOrderBookTotal(
    data.sort(
      (book1: TradingBookEntry, book2: TradingBookEntry): number =>
        book2.price - book1.price
    )
  ).slice(0, 25);

  const maxTotal = bidData[bidData.length - 1]?.total;

  return (
    <>
      <div className={styles.table}>
        <div className={styles.tableHeading}>
          <div className={styles.tableCell}>COUNT</div>
          <div className={styles.tableCell}>AMOUNT</div>
          <div className={styles.tableCell}>TOTAL</div>
          <div className={styles.tableCell}>PRICE</div>
        </div>
        {bidData.map((row: TradingBookEntry, index: number) => {
          const percentageTotal = (100 * row.total) / maxTotal;
          return (
            <div
              className={styles.tableRow}
              key={index}
              style={{
                background: `linear-gradient(to left, rgb(102, 255, 179) ${0}%, rgb(102, 255, 179) ${percentageTotal}%,  white ${percentageTotal}%, white ${100}%)`,
              }}
            >
              <div className={styles.tableCell}>{row.count}</div>
              <div className={styles.tableCell}>{row.amount.toFixed(4)}</div>
              <div className={styles.tableCell}>{row.total?.toFixed(4)}</div>
              <div className={styles.tableCell}>{row.price}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Bid;
