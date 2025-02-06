import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestService from "../services/requestService";
import IInitialStatesRequestSlice from "../interfaces/InitialStatesRequestSlice";
import IRequest from "../interfaces/Request";
import { RootState } from "../store";

const initialState: IInitialStatesRequestSlice = {
  requests: [],
  request: null,
  error: "",
  success: false,
  loading: false,
  message: null,
};

export const insertRequest = createAsyncThunk(
  "request/post",
  async (reqData: IRequest, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const user = state.auth.user;

    if (!user) {
      return thunkAPI.rejectWithValue("Usuário não autenticado.");
    }

    const token = user.token;

    const data = await requestService.insertRequest(reqData, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const getUserRequests = createAsyncThunk(
  "request/getUser",
  async (id: string | undefined, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const user = state.auth.user;

    if (!user) {
      return thunkAPI.rejectWithValue("Usuário não autenticado.");
    }

    const token = user.token;

    const data = await requestService.getUserRequests(id, token);

    return data;
  }
);

export const getRequestById = createAsyncThunk(
  "request/getById",
  async (id: string | undefined, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const user = state.auth.user;

    if (!user) {
      return thunkAPI.rejectWithValue("Usuário não autenticado.");
    }

    const token = user.token;

    const data = await requestService.getRequestById(id, token);

    return data;
  }
);

export const deleteRequest = createAsyncThunk(
  "request/delete",
  async (id: string | undefined, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const user = state.auth.user;

    if (!user) {
      return thunkAPI.rejectWithValue("Usuário não autenticado.");
    }

    const token = user.token;

    const data = await requestService.deleteRequest(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    resetMessageRequest: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(insertRequest.pending, (state) => {
        state.error = "";
        state.loading = true;
        state.success = false;
      })
      .addCase(insertRequest.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(insertRequest.fulfilled, (state, action) => {
        state.error = "";
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message;
      })
      .addCase(getUserRequests.pending, (state) => {
        state.error = "";
        state.loading = true;
        state.success = false;
      })
      .addCase(getUserRequests.fulfilled, (state, action) => {
        state.error = "";
        state.loading = false;
        state.success = true;
        state.requests = action.payload;
      })
      .addCase(getRequestById.pending, (state) => {
        state.error = "";
        state.loading = true;
        state.success = false;
      })
      .addCase(getRequestById.fulfilled, (state, action) => {
        state.error = "";
        state.loading = false;
        state.success = true;
        state.request = action.payload;
      })
      .addCase(deleteRequest.pending, (state) => {
        state.error = "";
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.error = "";
        state.loading = false;
        state.success = true;
        state.request = null;
        state.requests = state.requests?.filter(
          (req) => req._id !== action.payload?.id
        );
        state.message = action.payload?.message;
      });
  },
});

export const { resetMessageRequest } = requestSlice.actions;

export default requestSlice.reducer;
