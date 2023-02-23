import { createSelector } from '@ngrx/store';
import { IReactionProps } from 'src/app/components/reaction/reaction.model';
import { AppState } from '../app.reducer';

export interface IReaction extends IReactionProps {
  id: string;
}

export interface IDayReactions {
  [index: string]: IReaction[];
}

export interface State {
  reactions: IDayReactions;
}

export const initialState: State = {
  reactions: {},
};

export const selectReactionTimelineFeature = (state: AppState) =>
  state.reactionTimeline;

export const selectReactions = createSelector(
  selectReactionTimelineFeature,
  (state: State): IDayReactions => state.reactions
);
