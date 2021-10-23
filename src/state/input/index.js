import { handleActions } from 'redux-actions';
import produce from 'immer';
import * as actions from './actions';

const INITIAL_STATE = {
  up: undefined,
  down: undefined,
  left: undefined,
  right: undefined,
  dependencyIds: []
}

const keyCodeMap = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
}

const onKeyDown = produce((draft, action) => {
  const {keyCode} = action.payload;
  if(keyCode in keyCodeMap) {
    draft[keyCodeMap[keyCode]] = true; // or time since first press?
  }
})
const onKeyUp = produce((draft, action) => {
  const {keyCode} = action.payload;
  if(keyCode in keyCodeMap) {
    draft[keyCodeMap[keyCode]] = undefined;
  }
})

const onInitialize = produce((draft, action) => {
  const {id} = action.payload;
  if(!draft.dependencyIds.includes(id))
    draft.dependencyIds = [...draft.dependencyIds, id];
})

const onDestroy = produce((draft, action) => {
  const {id} = action.payload;
  if(draft.dependencyIds.includes(id))
    draft.dependencyIds = draft.dependencyIds.filter(dependencyId => dependencyId !== id);
})

export default handleActions(
  {
    [actions.keyDown.TRIGGER]: onKeyDown,
    [actions.keyPress.TRIGGER]: onKeyDown,
    [actions.keyUp.TRIGGER]: onKeyUp,
    [actions.initialize.TRIGGER]: onInitialize,
    [actions.destroy.TRIGGER]: onDestroy
  }, INITIAL_STATE
);
