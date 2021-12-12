import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import "regenerator-runtime/runtime";
import reducer from './reducer';
import { rootSaga } from './sagas';
import logger from 'redux-logger';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer,applyMiddleware(sagaMiddleware,logger));
sagaMiddleware.run(rootSaga)

export default store