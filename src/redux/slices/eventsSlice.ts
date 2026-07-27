import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Event, EventsState } from '../../types';
import { getEventsApi } from '../../services/api';

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: 'All',
};

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (token: string | undefined, { rejectWithValue }) => {
    try {
      const data = await getEventsApi(token);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch events list.');
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    clearFilters(state) {
      state.searchQuery = '';
      state.selectedCategory = 'All';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.loading = false;
        state.events = action.payload;
        state.error = null;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Could not load events';
      });
  },
});

export const { setSearchQuery, setSelectedCategory, clearFilters } = eventsSlice.actions;
export default eventsSlice.reducer;
