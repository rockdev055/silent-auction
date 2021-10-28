import { handleActions } from 'redux-actions';
import moment from 'moment';
import {
  RECEIVE_AUCTIONS,
  AUCTION_CREATED,
  UPDATE_TIME,
} from './actions';

const calcTimeLeft = (expiration_date) => {
  const currentTime = moment({});
  const timeDiff = expiration_date.diff(currentTime);
  const duration = moment.duration(timeDiff);
  const hours = duration.asHours();
  if (hours > 0) {
    return Math.floor(hours) + moment(timeDiff).format(':mm:ss');
  }
  return 'complete';
};

const addMoment = (x) => {
  const mTime = moment(x.expiration_date, moment.ISO_8601);
  return {
    ...x,
    timeLeft: calcTimeLeft(mTime),
    mTime,
  };
};

export const auctions = handleActions({
  [RECEIVE_AUCTIONS]: (state, { payload }) => [
    ...payload.map(addMoment),
  ],

  [AUCTION_CREATED]: (state, { payload }) => [addMoment(payload), ...state],

  [UPDATE_TIME]: state => state.map(x => ({
    ...x,
    timeLeft: calcTimeLeft(x.mTime),
  })),
}, []);
