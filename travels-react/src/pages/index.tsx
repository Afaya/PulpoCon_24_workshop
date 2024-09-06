import styles from "@/styles/Home.module.scss";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className={styles.home}>
      <Image
                src="/Pulpi-React.png"
                alt="Logo de React encima del pulpo de la pulpoConf"
                width="200"
                height="300"
              />

        <q className={styles.home__quote}>La vida, o es una aventura o no es nada</q>
        <p className={styles.home__subquote}>Hellen Keller</p>

        <div className={styles.home__actions}>
          <button className={styles.home__actionsSecondaryBtn}>Nuevo viaje</button>
          <button className={styles.home__actionsBtn}>Ver viajes</button>
        </div>
      </main>
    </>
  );
}
