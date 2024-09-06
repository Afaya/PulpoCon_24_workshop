import styles from "./TravelDetail.module.scss";
import Image from "next/image";

export default function TravelDetail() {
  return (
    <>
      <main className={styles.travelDetail}>
        <div className={styles.travelDetail__actions}>
          <button className={styles.travelDetail__actionsEdit}>Edit</button>
        </div>

        <Image
          src="/city.webp"
          alt="Imagen de viaje"
          className={styles.travelDetail__image}
          width="500"
          height="500"
        />

        <div className={styles.travelDetail__textWrapper}>
          <span className={styles.travelDetail__mainText}>Country:</span>
          <span>EEUU</span>
        </div>

        <div className={styles.travelDetail__textWrapper}>
          <span className={styles.travelDetail__mainText}>City:</span>
          <span>Nueva York</span>
        </div>

        <div className={styles.travelDetail__textWrapper}>
          <span className={styles.travelDetail__mainText}>Date:</span>
          <span>21-01-2020</span>
        </div>

        <div
        className={`${styles.travelDetail__textWrapper}${styles.travelDetail__textWrapperDescription}`}>
          <span className={styles.travelDetail__mainText}>Description:</span>
          <span
            >Viaje sorpresa a Nueva York en Enero para descubrir la ciudad. En el
            viaje no nos nevó y pudimos visitar varios museos: el de Ciencias
            Naturales, el MOMA, el MET. También pudimos ver la Estatua de La
            Libertad e ir de compras.</span
          >
        </div>
        
      </main>
    </>
  );
}
