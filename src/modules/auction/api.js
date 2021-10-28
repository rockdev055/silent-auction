import {
  users,
  auctionsService,
} from '../index';

export async function findAuctions(params) {
  try {
    const response = await auctionsService.find(params);
    return {
      error: false,
      response,
    };
  } catch (err) {
    return {
      error: true,
      response: err,
    };
  }
}

export async function createAuction(params) {
  try {
    const response = await auctionsService.create(params);
    return {
      error: false,
      response,
    };
  } catch (err) {
    return {
      error: true,
      response: err,
    };
  }
}

export async function bid(id) {
  try {
    const response = await auctionsService.patch(id, { current_price: 5 });
    return {
      error: false,
      response,
    };
  } catch (err) {
    return {
      error: true,
      response: err,
    };
  }
}
