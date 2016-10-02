import { createAction } from 'redux-actions';
import {get} from '../api/flights';
import types from './types';

export const didMountWidgetOneTwoTrip = createAction(types.GET_FLIGHTS, get);
export const selectedCarrier = createAction(types.SELECTED_CARRIER);