import { createReducer, on } from '@ngrx/store';
import * as ReactionTimelineActions from './reactions-timeline.reducer';
import { initialState } from './reactions-timeline.selector';

export const reactionTimelineReduce = createReducer(
  initialState,
  on(ReactionTimelineActions.AddReaction, (state, { reaction, id, date }) => {
    if (!id) {
      return state;
    }

    const currDateReaction = state.reactions[date] || [];
    return {
      ...state,
      reactions: {
        ...state.reactions,
        [date]: [
          ...currDateReaction,
          {
            ...reaction.toObject(),
            id,
          },
        ],
      },
    };
  }),
  on(ReactionTimelineActions.AddReactions, (state, { reactions }) => {
    return {
      ...state,
      reactions: {
        ...state.reactions,
        ...reactions,
      },
    };
  })
);
