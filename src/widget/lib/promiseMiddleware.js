import { isFSA } from 'flux-standard-action';

function isPromise(val) {
    return val && typeof val.then === 'function';
}

export default function promiseMiddleware( { dispatch } ) {
    return next => action => {
        if (!isFSA(action) || !isPromise(action.payload)) {
            return next(action);
        }

        const SUCCESS = action.type;
        const REQUEST = action.type + '_REQUEST';
        const FAILURE = action.type + '_FAILURE';

        next(...action, {type: REQUEST});

        return action.payload
            .then(
                result => dispatch({ ...action, payload: result, type: SUCCESS }),
                error =>  {
                    next({ ...action, error, type: FAILURE });
                    //throw new Error(JSON.stringify(error));
                }
            );
    };
}
