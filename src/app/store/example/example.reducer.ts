import { Action } from "@ngrx/store";
import { EXAMPLE_TYPE, ExampleType } from "./example.actions";

const initialState = {
  someProps: [],
};

export function exampleReducer(state = initialState, action: Action) {
  switch (action.type) {
    case EXAMPLE_TYPE: {
      return {
        ...state,
        someProps: [...state.someProps],
      }
    }
  }
}
