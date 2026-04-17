import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, logoutUser, setLoading } = authSlice.actions;
export default authSlice.reducer;