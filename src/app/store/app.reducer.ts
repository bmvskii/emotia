import { reactionTimelineReduce } from './reactions-timeline/reactions-timeline.actions';
import * as ReactionTimeline from './reactions-timeline/reactions-timeline.selector';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  reactionTimeline: ReactionTimeline.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  reactionTimeline: reactionTimelineReduce,
};
