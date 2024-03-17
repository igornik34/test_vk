import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { apiFactCats } from "./services/apiFactCats";
import { apiAgeOfPerson } from "./services/apiAgeOfPerson";
import persons from '../features/persons/persons.slice'
const store = configureStore({
  reducer: {
    [apiFactCats.reducerPath]: apiFactCats.reducer,
    [apiAgeOfPerson.reducerPath]: apiAgeOfPerson.reducer,
    persons
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiFactCats.middleware)
      .concat(apiAgeOfPerson.middleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
