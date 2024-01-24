import { combineReducers } from "redux";
import modalReducer from "./modal/modalSlice";
import dropdowdReducer from "./dropdown/dropdownSlice"

const reducer = combineReducers({
  // Auth: authReducer,
  Modal: modalReducer,
  Dropdown: dropdowdReducer
});

export default reducer;
