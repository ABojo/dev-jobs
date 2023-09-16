import FormState from "../../types/FormState";
import FormAction from "../../types/FormAction";
import styles from "./FilterForm.module.scss";
import Checkbox from "../Checkbox/Checkbox";

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
        <Checkbox
          id="full-time"
          isChecked={formState.fullTime}
          onChange={(e) => {
            formDispatch({ type: "SET_FULL_TIME", payload: e.target.checked });
          }}
        >
          <p className={styles.form__full}>
            Full-Time<span className={styles.form__only}> Only</span>
          </p>
        </Checkbox>
        <button className={styles.form__submit}>Search</button>
      </div>
    </form>
  );
}

export default FilterForm;
