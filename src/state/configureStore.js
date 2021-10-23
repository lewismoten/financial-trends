import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducer from './index';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState = {}) => {
  const applied = applyMiddleware(sagaMiddleware);
  const composed = composeWithDevTools({})(applied);

  const store = createStore(
    reducer,
    initialState,
    composed
  );
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {};
  if(module.hot) {
    module.hot.accept('./index', () => {
        const newReducer = require('./index').default;
        store.replaceReducer(newReducer)
    });
  }
  sagaMiddleware.run(saga)
  return store;
}

export default configureStore;
