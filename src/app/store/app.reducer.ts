import { reactionTimelineReduce } from './reactions-timeline/reactions-timeline.reducer';
import * as ReactionTimeline from './reactions-timeline/reactions-timeline.selector';
import { ActionReducerMap } from '@ngrx/store';
import * as Auth from './auth/auth.selector';
import { authReducer } from './auth/auth.reducer';

export interface AppState {
  reactionTimeline: ReactionTimeline.State;
  auth: Auth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  reactionTimeline: reactionTimelineReduce,
  auth: authReducer,
};
