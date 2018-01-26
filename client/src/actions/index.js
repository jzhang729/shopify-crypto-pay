import axios from 'axios';
import productData from '../mocks/product';
import variantData from '../mocks/variant';

// TODO: Uncomment these when not in DEV environment
// import _ from 'underscore';

import {
  FETCH_PRODUCT,
  FETCH_CURRENCY,
  SET_LOADING,
  SWITCH_CURRENCY,
  SWITCH_VARIANT,
  UPDATE_PROGRESS
} from './types';

export const setLoading = bool => {
  console.log('set loading to ', bool);
  return { type: SET_LOADING, payload: bool };
};

export const fetchCurrency = currencyId => async dispatch => {
  dispatch(setLoading(true));
  const res = await axios.get(`/api/currency/${currencyId}`);
  const payload = res.data[0];
  dispatch(setLoading(false));
  dispatch({ type: FETCH_CURRENCY, payload });
};

export const fetchProduct = productId => async dispatch => {
  // const res = await axios.get(`/api/product/${productId}`);
  // const payload = _.omit(res.data.product, 'body_html');
  const payload = productData.product;
  dispatch({ type: FETCH_PRODUCT, payload });
};

export const switchCurrency = currency => async dispatch => {
  dispatch({ type: SWITCH_CURRENCY, payload: currency });
};

export const switchVariant = variantId => async dispatch => {
  // const res = await axios.get(`/api/variants/${variantId}`);
  // const payload = res.data.variant;
  const payload = variantData.variant;
  dispatch({ type: SWITCH_VARIANT, payload });
};

export const updateProgress = progress => async dispatch => {
  dispatch({ type: UPDATE_PROGRESS, payload: progress });
};
