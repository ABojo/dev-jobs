import { useState } from "react";
import FormState from "../../types/FormState";
import FormAction from "../../types/FormAction";
import styles from "./MobileFilterForm.module.scss";

interface MobileFilterFormProps {
  formState: FormState;
  formDispatch: React.Dispatch<FormAction>;
  runFilter: () => void;
}

function MobileFilterForm({ formState, formDispatch, runFilter }: MobileFilterFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleIsOpen() {
    setIsOpen((prev) => !prev);
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        runFilter();
      }}
    >
      <div className={styles.form__input}>
        <input
          onChange={(e) => {
            formDispatch({ type: "SET_TITLE", payload: e.target.value });
          }}
          value={formState.title}
          type="text"
          placeholder="Filter by title..."
          aria-label="Job title"
        />
        <div className={styles.form__buttons}>
          <button onClick={toggleIsOpen} type="button" className={styles.form__filter} aria-label="Open Filter Options">
            <img src="/images/mobile/icon-filter.svg" alt="" />
          </button>
          <button className={styles.form__submit} aria-label="Search">
            <img src="/images/desktop/icon-search.svg" alt="" />
          </button>
        </div>
      </div>
      {isOpen && (
        <div
          className={styles.form__overlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              toggleIsOpen();
            }
          }}
        >
          <div className={styles.modal}>
            <div className={styles.modal__input}>
              <img src="/images/desktop/icon-location.svg" alt="" />
              <input
                value={formState.location}
                onChange={(e) => {
                  formDispatch({ type: "SET_LOCATION", payload: e.target.value });
                }}
                type="text"
                placeholder="Filter by location"
              />
            </div>
            <div className={styles.modal__bottom}>
              <div className={styles.modal__full}>
                <input
                  onChange={(e) => {
                    formDispatch({ type: "SET_FULL_TIME", payload: e.target.checked });
                  }}
                  checked={formState.fullTime}
                  id="full-time"
                  className={styles.modal__check}
                  type="checkbox"
                />
                <label htmlFor="full-time"></label>
                <p>Full Time Only</p>
              </div>
              <button
                onClick={() => {
                  runFilter();
                  toggleIsOpen();
                }}
                type="submit"
                className={styles.modal__submit}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default MobileFilterForm;
