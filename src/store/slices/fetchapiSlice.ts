import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type Product } from "../../type/Product";
import {
  fetchAllProducts as fetchAllProductsService,
  fetchCategories as fetchCategoriesService,
  fetchProductById as fetchProductByIdService,
  fetchProductsByCategory as fetchProductsByCategoryService,
} from "../../services/product.services";

// Async Thunks
export const fetchAllProducts = createAsyncThunk("products/fetchAll", () => {
  return fetchAllProductsService();
});

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  (category: string) => {
    return fetchProductsByCategoryService(category);
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  (id: string) => {
    return fetchProductByIdService(id);
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  () => {
    return fetchCategoriesService();
  }
);

//Status Type
type Status = "idle" | "loading" | "succeeded" | "error";

// Slice state interface
interface FetchApiState {
  product: { data: Product[]; status: Status };
  productById: { data: Product[]; status: Status };
  productByCategory: { data: Product[]; status: Status };
  categories: {
    data: string[];
    status: Status;
  };
}

// Slice
const fetchApiSlice = createSlice({
  name: "fetchApi",
  initialState: {
    product: { data: [], status: "idle" },
    productById: { data: [], status: "idle" },
    productByCategory: { data: [], status: "idle" },
    categories: { data: [], status: "idle" },
  } as FetchApiState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All products
      .addCase(fetchAllProducts.pending, (state) => {
        state.product.status = "loading";
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.product.status = "error";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.product.status = "succeeded";
        state.product.data = action.payload;
      })

      // Products by category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.productByCategory.status = "loading";
      })
      .addCase(fetchProductsByCategory.rejected, (state) => {
        state.productByCategory.status = "error";
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.productByCategory.status = "succeeded";
        state.productByCategory.data = action.payload;
      })

      // Product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.productById.status = "loading";
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.productById.status = "error";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productById.status = "succeeded";
        state.productById.data = action.payload;
      })

      // Categories
      .addCase(fetchCategories.pending, (state) => {
        state.categories.status = "loading";
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categories.status = "error";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories.status = "succeeded";
        state.categories.data = action.payload;
      });
  },
});

export default fetchApiSlice.reducer;
