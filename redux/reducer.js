import { combineReducers } from "redux";
import modalReducer from "./modal/modalSlice";
import dropdowdReducer from "./dropdown/dropdownSlice";
import emailStoreReducer from "./emailStore/emailStoreSlice";
import warnModalReducer from "./warnModel/warnModelSlice";

const reducer = combineReducers({
  // Auth: authReducer,
  Modal: modalReducer,
  Dropdown: dropdowdReducer,
  EmailStore: emailStoreReducer,
  WarnModal: warnModalReducer,
});

export default reducer;
