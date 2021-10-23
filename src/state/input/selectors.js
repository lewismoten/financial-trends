import { createSelector } from 'reselect';

const slice = ({ input = {}}) => input;

export const up = createSelector(slice, ({ up }) => !!up);
export const down = createSelector(slice, ({ down }) => !!down);
export const left = createSelector(slice, ({ left }) => !!left);
export const right = createSelector(slice, ({ right }) => !!right);
