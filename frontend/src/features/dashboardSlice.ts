import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Example async action to fetch data
export const fetchDashboardData = createAsyncThunk('dashboard/fetchData', async () => {
  const response = await fetch('https://api.example.com/dashboard-data');
  return await response.json();
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default dashboardSlice.reducer;
