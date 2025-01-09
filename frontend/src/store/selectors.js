import { createSelector } from 'reselect';

const selectSpotsState = (state) => state.spot || {}; 

export const selectSpots = createSelector(
  [selectSpotsState],
  (spotState) => Object.values(spotState.spots || {})
);
