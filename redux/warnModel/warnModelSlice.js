import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../store";

const INITIAL_STATE = {
  isShow: false,
  modelType: "",
  modelMessage: "",
};

const warnModalSlice = createSlice({
  name: "warnModel",
  initialState: INITIAL_STATE,
  reducers: {
    handleShowWarnModal: (state, { payload }) => ({
      ...state,
      isShow: payload.isShow,
      modelType: payload.modelType,
      modelMessage: payload.modelMessage,
    }),
  },
});

export const warnModalSelector = (state) => state?.WarnModal;

export const { handleShowWarnModal } = warnModalSlice.actions;

export default warnModalSlice.reducer;
