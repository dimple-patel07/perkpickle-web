import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  loading: false,
  message: "",
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: INITIAL_STATE,
  reducers: {
    handleStartLoading: (state) => ({
      ...state,
      loading: true,
    }),
    handleStopLoading: (state) => ({
      ...state,
      loading: false,
    }),
    showMessage: (state, { payload }) => ({
      ...state,
      loading: false,
      message: payload,
    }),
    hideMessage: (state) => ({
      ...state,
      loading: false,
      message: undefined,
    }),
  },
});

export const loaderSelector = (state) => state?.Loader;

export const {
  handleStartLoading,
  handleStopLoading,
  showMessage,
  hideMessage,
} = loadingSlice.actions;

export default loadingSlice.reducer;
