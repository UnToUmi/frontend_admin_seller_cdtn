import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const categoryAdd = createAsyncThunk(
  "category/categoryAdd",
  async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const { data } = await api.post("/category-add", formData, {
        withCredentials: true,
      });
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

export const get_category = createAsyncThunk(
  "category/get_category",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/category-get?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        { withCredentials: true }
      );
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_category = createAsyncThunk(
  "category/update_category",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/category-update`, info, {
        withCredentials: true,
      });
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const category_image_update = createAsyncThunk(
  "category/category_image_update",
  async (image, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/category-image-update", image, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_category_detail = createAsyncThunk(
  "category/get_category_detail",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      // console.log("info_get_category_detail", info);

      const { data } = await api.get(`/category-get-detail/${info}`, {
        withCredentials: true,
      });
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

export const categoryReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    loaderImage: false,
    categorys: [],
    totalCategory: 0,
    category: {},
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryAdd.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(categoryAdd.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(categoryAdd.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.categorys = [...state.categorys, payload.category];
      })

      .addCase(get_category.fulfilled, (state, { payload }) => {
        state.totalCategory = payload.totalCategory;
        state.categorys = payload.categorys;
      })
      .addCase(get_category_detail.fulfilled, (state, { payload }) => {
        state.category = payload.category;
      })
      .addCase(update_category.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(category_image_update.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.loaderImage = false;
      })
      .addCase(category_image_update.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loaderImage = false;
      })
      .addCase(category_image_update.pending, (state, { payload }) => {
        state.loaderImage = true;
      });
  },
});
export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;
