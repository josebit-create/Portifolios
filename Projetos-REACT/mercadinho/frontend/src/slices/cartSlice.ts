import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "../services/cartService";
import IProdCart from "../interfaces/ProdCart";
import { RootState } from "../store";
import ICartStates from "../interfaces/CartStates";
import IProdCartPut from "../interfaces/ProdCartPut";

const initialState: ICartStates = {
  cartProds: [],
  loading: false,
  error: "",
  success: false,
  message: null,
};

export const insertProdCart = createAsyncThunk(
  "ProdCart/Post",
  async (prodData: IProdCart, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const user = state.auth.user;

    if (!user) {
      return thunkAPI.rejectWithValue("Usuário não autenticado.");
    }

    const token = user.token;

    const data = await cartService.insertProdCart(prodData, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const getProductsCart = createAsyncThunk(
  "ProCar/Get",
  async (id: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const user = state.auth.user;

    if (!user) {
      return;
    }

    const token = user.token;

    const data = await cartService.getProductsCart(id, token);

    return data;
  }
);

export const updateProdCart = createAsyncThunk(
  "ProdCart/Put",
  async (prodData: IProdCartPut, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const user = state.auth.user;

    if (!user) {
      return;
    }

    const token = user.token;

    const data = await cartService.updateProdCart(prodData.id, prodData, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return { ...prodData };
  }
);

export const deleteProdCart = createAsyncThunk(
  "ProdCart/Delete",
  async (id: string | undefined, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const user = state.auth.user;

    if (!user) {
      return;
    }

    const token = user.token;

    const data = await cartService.deleteProdCart(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return { id, message: data.message };
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(insertProdCart.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = "";
      })
      .addCase(insertProdCart.fulfilled, (state, action) => {
        state.error = "";
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(insertProdCart.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(getProductsCart.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = "";
      })
      .addCase(getProductsCart.fulfilled, (state, action) => {
        state.error = "";
        state.loading = false;
        state.success = true;
        state.cartProds = action.payload;
      })
      .addCase(updateProdCart.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = "";
      })
      .addCase(updateProdCart.fulfilled, (state, action) => {
        state.error = "";
        state.loading = false;
        state.success = true;
        state.cartProds = state.cartProds.map((prod) =>
          prod._id === action.payload?.id
            ? { ...prod, amount: Number(action.payload?.amount) }
            : prod
        );
      })
      .addCase(updateProdCart.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProdCart.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = "";
      })
      .addCase(deleteProdCart.fulfilled, (state, action) => {
        state.error = "";
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message;
        state.cartProds = state.cartProds.filter(
          (prod) => prod._id !== action.payload?.id
        );
      })
      .addCase(deleteProdCart.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetMessage } = cartSlice.actions;
export default cartSlice.reducer;
