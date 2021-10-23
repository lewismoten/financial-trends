import {all, fork} from 'redux-saga/effects';

import input from './input/saga';

function* saga() {
  yield all([fork(input)]);
}

export default saga;
