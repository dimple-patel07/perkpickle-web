import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  loading: false,
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
  },
});

export const loaderSelector = (state) => state?.Loader;

export const { handleStartLoading, handleStopLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
