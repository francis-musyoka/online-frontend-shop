import { createSlice } from '@reduxjs/toolkit';

const searchQuerySlice = createSlice({
    name: 'searchQuery',
    initialState: {
        searchQuery: '',
        searchResults: [],
        loading: false,
        error: null,
    },
    reducers: {
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        },
        setSearchResults(state, action) {
            state.searchResults = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        clearSearch(state) {
            state.searchQuery = '';
            state.searchResults = [];
            state.loading = false;
            state.error = null;
        },
    },
});

export default searchQuerySlice.reducer;
export const {
    setSearchQuery,
    setSearchResults,
    setLoading,
    setError,
    clearSearch,
} = searchQuerySlice.actions;