import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPerson } from "../../interfaces/person";
import { personsApi } from "../../app/services/persons";

export interface IPersonsState {
  persons: IPerson[];
  error?: {
    message: string;
    existingPerson: IPerson;
  };
}

const initialState: IPersonsState = {
  persons: [],
};

export const personsSlice = createSlice({
  name: "persons",
  initialState,
  reducers: {
    setError: (
      state,
      action: PayloadAction<{ message: string; existingPerson: IPerson }>
    ) => {
      const { message, existingPerson } = action.payload;
      state.error = { message, existingPerson };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      personsApi.endpoints.getPersonByName.matchFulfilled,
      (state, action) => {
        console.log("fulfilled");
        state.persons.push(action.payload);
      }
    );
    builder.addMatcher(
      personsApi.endpoints.getPersonByName.matchPending,
      (state, action) => {
        console.log("pending");
      }
    );
    builder.addMatcher(
      personsApi.endpoints.getPersonByName.matchRejected,
      (state, action) => {
        console.log("rejected");
      }
    );
  },
});

export default personsSlice.reducer;
export const personsActions = personsSlice.actions;
