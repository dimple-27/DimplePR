// src/redux/slices/philosophySlice.ts
import { BASE_URL } from '@/app/utils/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchPhilosophyData = createAsyncThunk(
  'philosophy/fetchData',
  async ({ id, pageSize }: { id: string; pageSize: number }, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/glimps/philosophy/${id}?pageSize=${pageSize}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const philosophySlice = createSlice({
  name: 'philosophy',
  initialState: {
    data: null,
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhilosophyData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchPhilosophyData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPhilosophyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default philosophySlice.reducer;
