import { createAction, props } from '@ngrx/store';
import { IDayReactions } from './reactions-timeline.selector';
import { Reaction } from 'src/app/components/reaction/reaction.model';

export const ADD_REACTION = '[Reactions Timeline] Add Reaction';

export const ADD_REACTIONS = '[Reactions Timeline] Add Reaction';

export const CLEAR_REACTIONS = '[Reactions Timeline] Clear Reactions';

export const AddReaction = createAction(
  ADD_REACTION,
  props<{ date: string; reaction: Reaction; id: string }>()
);

export const AddReactions = createAction(
  ADD_REACTIONS,
  props<{ reactions: IDayReactions }>()
);

export const ClearReactions = createAction(CLEAR_REACTIONS);
