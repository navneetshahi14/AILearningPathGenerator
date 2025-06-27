import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  clerkUserId: string;
  name: string;
  email: string;
  imageUrl: string;
}

const initialState: userState | null = null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<userState>) => {
      return action.payload;
    },
    clearUser: () => {
      return null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
