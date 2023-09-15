interface InputAction {
  type: "SET_TITLE" | "SET_LOCATION";
  payload: string;
}

interface CheckAction {
  type: "SET_FULL_TIME";
  payload: boolean;
}

type FormAction = InputAction | CheckAction;

export default FormAction;
