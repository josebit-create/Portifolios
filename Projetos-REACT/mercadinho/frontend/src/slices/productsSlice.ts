import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsService from "../services/productsService";
import IProductsState from "../interfaces/ProductsState";

const initialState: IProductsState = {
  products: [],
  error: "",
  success: false,
  loading: false,
  message: null,
};

export const getProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    const data = await productsService.getProducts();

    return data;
  }
);

export const getProductsBySection = createAsyncThunk(
  "products/getBySection",
  async (section: string | undefined) => {
    const data = await productsService.getProductsBySection(section);

    return data;
  }
);

export const searchProducts = createAsyncThunk(
  "products/search",
  async (query: string | undefined) => {
    const data = await productsService.searchProducts(query);

    return data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.success = true;
        state.products = action.payload;
      })
      .addCase(getProductsBySection.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getProductsBySection.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.success = true;
        state.products = action.payload;
      })
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.success = true;
        state.products = action.payload;
      });
  },
});

export const { resetMessage } = productsSlice.actions;
export default productsSlice.reducer;
