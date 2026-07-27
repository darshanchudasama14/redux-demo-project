import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';
import { loginApi } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isGuest: false,
  loading: false,
  error: null,
};

export const loginUserWithAsnc = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await loginApi(email, password);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Login failed. Please check credentials.');
    }
  }
);
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await loginApi(email, password);

      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));

      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAsGuest(state) {
      state.user = {
        id: 'usr-guest',
        email: 'guest@plie.com',
        name: 'Renzo',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      };
      state.token = 'guest-token-123';
      state.isAuthenticated = true;
      state.isGuest = true;
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isGuest = false;
      state.error = null;
      state.token=null;
      state.user=null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isGuest = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.token=null;
        state.user=null;
        state.error = (action.payload as string) || 'Authentication failed';
      });
  },
});

export const { loginAsGuest, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
