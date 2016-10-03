import actionTypes from '../actions/types';

export const carriers = function (state = [], action) {
    switch (action.type) {
        case actionTypes.GET_FLIGHTS:
            return action.payload.flights
                .map(i => i.carrier)
                .filter((elem, pos, arr) => arr.indexOf(elem) == pos);
        default:
            return state;
    }
};

class Flight {
    constructor(data) {
        return {
            carrier: data.carrier,
            from: data.direction.from,
            to: data.direction.to,
            arrival: data.arrival,
            departure: data.departure,
            _show: false

        }
    }
    get show () {
        return _show;
    }
    set show (value) {
        this._show = value;
    }
}

export const flights = function (state = [], action) {
    switch (action.type) {
        case actionTypes.GET_FLIGHTS:
            return action.payload.flights
                .map(i => new Flight(i));
        case actionTypes.SELECTED_CARRIER:
            return state.map(i=> {
                i.show = action.payload == 'All' || action.payload == i.carrier;
                return i;
            });
        default:
            return state;
    }
};

