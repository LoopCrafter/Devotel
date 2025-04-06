import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TableState {
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  perPage: number;
  visibleColumns: string[];
}

const initialState: TableState = {
  sortColumn: null,
  sortDirection: "asc",
  perPage: 5,
  visibleColumns: [],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setSortColumn(state, action: PayloadAction<string | null>) {
      state.sortColumn = action.payload;
    },
    setSortDirection(state, action: PayloadAction<"asc" | "desc">) {
      state.sortDirection = action.payload;
    },
    setPerPage(state, action: PayloadAction<number>) {
      state.perPage = action.payload;
    },
    setVisibleColumns(state, action: PayloadAction<string[]>) {
      state.visibleColumns = action.payload;
    },
  },
});

export const {
  setSortColumn,
  setSortDirection,
  setPerPage,
  setVisibleColumns,
} = tableSlice.actions;

export default tableSlice.reducer;
