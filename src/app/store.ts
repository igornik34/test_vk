import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { apiFactCats } from "./services/apiFactCats";
import { apiAgeOfPerson } from "./services/apiAgeOfPerson";
import persons from "../features/persons/persons.slice";
import uniqueNamePerson from "../middleware/uniqueNamePerson";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  [apiFactCats.reducerPath]: apiFactCats.reducer,
  [apiAgeOfPerson.reducerPath]: apiAgeOfPerson.reducer,
  persons,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(uniqueNamePerson)
      .concat(apiFactCats.middleware)
      .concat(apiAgeOfPerson.middleware),
});

setupListeners(store.dispatch)

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
