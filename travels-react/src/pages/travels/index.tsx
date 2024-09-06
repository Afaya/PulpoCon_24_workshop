import TravelDetail from "@/components/travelDetail/index";
import styles from "./Travels.module.scss";

export default function Travels() {
  return (
    <>
      <main className={styles.travelList}>
        <button className={styles.travelList__add}>New Travel</button>

        <div className={styles.travelList__wrapper}>
          <div className={styles.travelList__travel}>
            <TravelDetail></TravelDetail>
          </div>
        </div>
      </main>
    </>
  );
}
