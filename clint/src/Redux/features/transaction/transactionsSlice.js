import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTran, getTrans, editTran, deleteTran } from "./transactionsApi";

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  transactions: [],
  editing: {},
};

const fetchTrans = createAsyncThunk("transactions/fetchTrans", async () => {
  const trans = await getTrans();
  return trans;
});

const addTran = createAsyncThunk("transactions/addTran", async (tranTodo) => {
  const tran = await createTran(tranTodo);
  return tran;
});

const updateTran = createAsyncThunk(
  "transactions/updateTran",
  async ({ id, tranData }) => {
    const trans = await editTran(id, tranData);
    return trans;
  }
);

const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id) => {
    const trans = await deleteTran(id);
    return trans;
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInActive: (state) => {
      state.editing = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrans.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTrans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTrans.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.transactions = [];
      })
      .addCase(addTran.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addTran.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions.push(action.payload);
      })
      .addCase(addTran.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.transactions = [];
      })
      .addCase(updateTran.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateTran.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const indexUpdate = state.transactions.findIndex(
          (item) => item.id === action.payload.id
        );
        state.transactions[indexUpdate] = action.payload;
      })
      .addCase(updateTran.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.transactions = [];
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = state.transactions.filter(
          (item) => item.id !== action.meta.arg
        );
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.transactions = [];
      });
  },
});

export {
  transactionsSlice,
  fetchTrans,
  addTran,
  updateTran,
  deleteTransaction,
};

export const { editInActive, editActive } = transactionsSlice.actions;
