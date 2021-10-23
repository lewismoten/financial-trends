import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

const globalReducer = state => state;

function* rootSaga() {
  console.log('Saga of all sagas');
}
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(globalReducer, applyMiddleware(rootSaga));
sagaMiddleware.run(exampleSaga);
