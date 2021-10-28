import { takeLatest, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';

import {
  REQUEST_CREATE_AUCTION,
  REQUEST_AUCTIONS,
  receiveAuctions,
} from './actions';

import {
  findAuctions,
  createAuction,
} from './api';

function* callFindAuctions(action) {
  const { error, response } = yield call(findAuctions, action.payload);
  console.log(response);
  yield put(receiveAuctions(response.data));
}

export function* findAuctionsSaga() {
  yield takeLatest(REQUEST_AUCTIONS, callFindAuctions);
}

function* callCreateAuction(action) {
  const { error, response } = yield call(createAuction, action.payload);
  console.log(response);
  if (!error) {
    Actions.viewAuctions({});
  }
}

export function* createAuctionSaga() {
  yield takeLatest(REQUEST_CREATE_AUCTION, callCreateAuction);
}
