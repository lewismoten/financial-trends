import { createRoutine } from 'redux-saga-routines';
import actionsFor from '../actionsFor';
const go = actionsFor('input');

export const keyUp = createRoutine(go`key up`);
export const keyDown = createRoutine(go`key down`);
export const keyPress = createRoutine(go`key press`);
export const initialize = createRoutine(go`initialize`);
export const destroy = createRoutine(go`destroy`);
