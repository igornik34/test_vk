import { Middleware } from "@reduxjs/toolkit";
import { IPerson } from "../interfaces/person";
import { RootState } from "../app/store";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { personsActions } from "../features/persons/persons.slice";

export interface CustomAction<I> {
  type: string;
  payload: I;
  meta?: {
    requestStatus: QueryStatus;
    requestId: string;
  };
}

const uniqueNamePerson: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    const typedAction = action as CustomAction<IPerson>;
    console.log(typedAction);

    if (typedAction.type.includes("splitApiAgeOfPerson/executeQuery/")) {
      const state = store.getState();
      const person = typedAction.payload;
      if (person) {
        const existingPerson = state.persons.persons.find(
          (p) => p.name === person.name
        );
        if (existingPerson) {
          store.dispatch(
            personsActions.setErrorDuplicateNames(
              `Человек с именем ${person.name} уже запрашивался. Вот его возраст: ${person.age}`
            )
          );
          return;
        }
        if (state.persons.errorDuplicateNames) {
          personsActions.clearErrorDuplicateNames();
        }
      }
    }
    return next(action);
  };

export default uniqueNamePerson;
