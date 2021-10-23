import { all, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';

// const keyOptions = {capture: false};
// // multiple keys down at the same time freezing logic
// window.addEventListener("keydown", onKeyDownCallback, keyOptions);
// window.addEventListener("keyup", onKeyUpCallback, keyOptions);
// return () => {
//   cancelAnimationFrame(frameRequest.current);
//   window.removeEventListener("keydown", onKeyDownCallback, keyOptions);
//   window.removeEventListener("keyup", onKeyUpCallback, keyOptions);
// }


function* onInitialize(action) {
  // do something...
  // TODO: eventChannel instead?
  yield;
}

function* onDestroy(action) {
  // do something...
  // TODO: eventChannel instead?
  yield;
}


export default function* saga() {
  yield all([
    takeEvery(actions.initialize.TRIGGER, onInitialize),
    takeEvery(actions.destroy.TRIGGER, onDestroy)
  ])
}
