import { Action } from "@ngrx/store";

export const EXAMPLE_TYPE = 'ACTION_TYPE';

const ACTION_PAYLOAD = {};

export class ExampleType implements Action {
  readonly type = EXAMPLE_TYPE;
  payload = ACTION_PAYLOAD;
}
