import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import config from "../config/config";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (categoryId: string, { getState }) => {
    const response = await axios.get(`${config.apiUrl}/items`);
    let keyword = (getState() as RootState).keyword;
    keyword = keyword.trim().toLowerCase();
    let items = response.data.data;

    if (categoryId) {
      const categoryIdAsNumber = Number(categoryId);
      if (categoryIdAsNumber > 0) {
        items = items.filter(
          (item: any) => item.category_id === categoryIdAsNumber,
        );
      }
    }

    if (keyword !== "") {
      items = items.filter(
        (item: any) =>
          item.description.toLowerCase().includes(keyword) ||
          item.name.toLowerCase().includes(keyword),
      );
    }

    return { ...response.data, data: items };
  },
);

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(`${config.apiUrl}/categories`);
    return response.data;
  },
);

export const fetchItemById = createAsyncThunk(
  "items/fetchByIdStatus",
  async (id: string) => {
    const response = await axios.get(`${config.apiUrl}/items/${id}`);
    return response.data;
  },
);

const dataSlice = createSlice({
  name: "task",
  initialState: {
    isLoading: false,
    items: [],
    item: null,
    categories: [],
    category_id: -1,
    keyword: "",
    error: null,
    pending: true,
    completed: true,
    toggle: false,
  },
  reducers: {
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.category_id = action.payload;
    },
    setToggle: (state, action: PayloadAction<boolean>) => {
      state.toggle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //category
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchItemById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setKeyword, setCategoryId, setToggle } = dataSlice.actions;

export default dataSlice.reducer;
