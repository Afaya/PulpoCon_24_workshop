import styles from "./TravelEdit.module.scss";

export default function Travels() {
  return (
    <>
      <main className={styles.main}>
        <form className={styles.travelEdit}>
          <div className={styles.travelEdit__row}>
            <label htmlFor="type">Tipo de viaje:</label>

            <select className={styles.travelEdit__rowField} name="select">
              <option value="value1">Cultural</option>
            </select>
          </div>

          <div className={styles.travelEdit__row}>
            <label htmlFor="country">País:</label>

            <input
              className={styles.travelEdit__rowField}
              type="text"
              id="country"
              name="country"
            />
          </div>

          <div className={styles.travelEdit__row}>
            <label htmlFor="city">Ciudad:</label>

            <input className={styles.travelEdit__rowField} type="text" id="city" name="city" />
          </div>

          <div className={styles.travelEdit__row}>
            <label htmlFor="date">Fecha:</label>

            <input className={styles.travelEdit__rowField} type="date" id="date" name="date" />
          </div>

          <div className={styles.travelEdit__row}>
            <label htmlFor="description">Descripción:</label>

            <textarea
              className={styles.travelEdit__rowField}
              id="description"
              name="description"
              rows={20}
            ></textarea>
          </div>

          <div className={styles.travelEdit__actions}>
            <button className={styles.travelEdit__actionsSecondaryBtn} type="reset">
              Cancelar
            </button>
            <button className={styles.travelEdit__actionsBtn} type="submit">Guardar</button>
          </div>
        </form>
      </main>
    </>
  );
}

