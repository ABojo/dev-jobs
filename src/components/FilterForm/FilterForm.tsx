import FormState from "../../types/FormState";
import FormAction from "../../types/FormAction";
import styles from "./FilterForm.module.scss";

interface FilterFormProps {
  formState: FormState;
  formDispatch: React.Dispatch<FormAction>;
  runFilter: () => void;
}

function FilterForm({ formState, formDispatch, runFilter }: FilterFormProps) {
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        runFilter();
      }}
    >
      <div className={`${styles.form__input} ${styles["form__input--title"]}`}>
        <img className={styles.form__icon} src="/images/desktop/icon-search.svg" alt="" />
        <input
          onChange={(e) => {
            formDispatch({ type: "SET_TITLE", payload: e.target.value });
          }}
          value={formState.title}
          type="text"
          placeholder="Filter by title..."
          aria-label="Job title"
        />
      </div>
      <div className={`${styles.form__input} ${styles["form__input--location"]}`}>
        <img className={styles.form__icon} src="/images/desktop/icon-location.svg" alt="" />
        <input
          onChange={(e) => {
            formDispatch({ type: "SET_LOCATION", payload: e.target.value });
          }}
          value={formState.location}
          type="text"
          placeholder="Filter by location..."
          aria-label="Location"
        />
      </div>
      <div className={styles.form__third}>
        <div className={styles.form__full}>
          <input
            onChange={(e) => {
              formDispatch({ type: "SET_FULL_TIME", payload: e.target.checked });
            }}
            checked={formState.fullTime}
            id="full-time"
            className={styles.form__check}
            type="checkbox"
          />
          <label htmlFor="full-time"></label>
          <p>
            Full Time <span className={styles.form__only}>Only</span>
          </p>
        </div>
        <button className={styles.form__submit}>Search</button>
      </div>
    </form>
  );
}

export default FilterForm;
