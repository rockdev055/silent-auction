import { createAction } from 'redux-actions';

export const REQUEST_AUCTIONS = 'REQUEST_AUCTIONS';
export const REQUEST_CREATE_AUCTION = 'REQUEST_CREATE_AUCTION';
export const RECEIVE_AUCTIONS = 'RECEIVE_AUCTIONS';
export const AUCTION_CREATED = 'AUCTION_CREATED';
export const AUCTION_UPDATED = 'AUCTION_UPDATED';
export const AUCTION_DELETED = 'AUCTION_DELETED';
export const UPDATE_TIME = 'UPDATE_TIME';
export const REQUEST_BID = 'REQUEST_BID';
export const REQUEST_REMOVE_AUCTION = 'REQUEST_REMOVE_AUCTION';
export const REQUEST_UPDATE_AUCTION = 'REQUEST_UPDATE_AUCTION';

export const updateTime = createAction(UPDATE_TIME);
export const receiveAuctions = createAction(RECEIVE_AUCTIONS);
export const requestAuctions = createAction(REQUEST_AUCTIONS);
export const auctionCreated = createAction(AUCTION_CREATED);
export const auctionUpdated = createAction(AUCTION_UPDATED);
export const auctionDeleted = createAction(AUCTION_DELETED);
export const requestCreateAuction = createAction(REQUEST_CREATE_AUCTION);
export const requestBid = createAction(REQUEST_BID);
export const removeAuction = createAction(REQUEST_REMOVE_AUCTION);
export const requestUpdateAuction = createAction(REQUEST_UPDATE_AUCTION);
