import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";
import IProfileStates from "../interfaces/ProfileStates";
import { RootState } from "../store";
import IUserUpdate from "../interfaces/UserUpdate";

const initialState: IProfileStates = {
  user: null,
  error: "",
  success: false,
  loading: false,
  message: null,
};

export const getUserDetails = createAsyncThunk(
  "user/getDetails",
  async (id: string | undefined) => {
    const data = await userService.getUserDetails(id);

    return data;
  }
);

export const updateProfile = createAsyncThunk(
  "user/update",
  async (updateData: IUserUpdate, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const user = state.auth.user;

    if (!user) {
      return thunkAPI.rejectWithValue("Usuário não autenticado.");
    }

    const token = user.token;

    const data = await userService.updateProfile(updateData, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const deleteProfile = createAsyncThunk(
  "user/delete",
  async (id: string | undefined, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const user = state.auth.user;

    if (!user) {
      return thunkAPI.rejectWithValue("Usuário não autenticado.");
    }

    const token = user.token;

    const data = await userService.deleteProfile(id, token);

    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessageUser: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.success = true;
        state.user = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.success = true;
        state.user = action.payload;
        state.message = "Usuário atualizado com sucesso!";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = state.user;
      })
      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
        state.success = true;
        state.user = null;
      });
  },
});

export const { resetMessageUser } = userSlice.actions;
export default userSlice.reducer;
