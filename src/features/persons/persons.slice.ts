import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPerson } from "../../interfaces/person";
import { personsApi } from "../../app/services/persons";

export interface IPersonsState {
  persons: IPerson[];
  errorDuplicateNames: string | null;
  errorResponse: string | null;
}

const initialState: IPersonsState = {
  persons: [],
  errorDuplicateNames: null,
  errorResponse: null,
};

export const personsSlice = createSlice({
  name: "persons",
  initialState,
  reducers: {
    setErrorDuplicateNames: (state, action: PayloadAction<string>) => {
      state.errorDuplicateNames = action.payload;
    },
    clearErrorDuplicateNames: (state) => {
      state.errorDuplicateNames = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      personsApi.endpoints.getPersonByName.matchFulfilled,
      (state, action) => {
        if (state.errorResponse) {
          state.errorResponse = null;
        }
        state.persons.push(action.payload);
      }
    );
    builder.addMatcher(
      personsApi.endpoints.getPersonByName.matchRejected,
      (state, action) => {
        if (action.error.message) {
          state.errorResponse = action.error.message;
        }
      }
    );
  },
});

export default personsSlice.reducer;
export const personsActions = personsSlice.actions;
