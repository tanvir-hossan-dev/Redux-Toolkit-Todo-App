import { configureStore } from "@reduxjs/toolkit";
import { transactionsSlice } from "../features/transaction/transactionsSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsSlice.reducer,
  },
});
