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
    clearUser: () => {
      return null;
    },
  },
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;
