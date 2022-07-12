import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

const pburgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PBURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

const pburgerFailed = (error) => {
    return {
        type: actionTypes.PBURGER_FAILED,
        error: error
    }
}

const pburgerStarting = () => {
    return {
        type: actionTypes.PBURGER_START
    }
}

export const pburgerStart = (orderData, token) => {
    return dispatch => {
        dispatch(pburgerStarting());
        axios.post( '/orders.json?auth=' + token, orderData )
            .then( response => {
                dispatch(pburgerSuccess(response.data.name, orderData));
                console.log(response.data)
            } )
            .catch( error => {
                dispatch(pburgerFailed(error));
            } );
    }

}


export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}


const forderSuccess = (orders) => {
    return {
        type: actionTypes.FORDER_SUCCESS,
        orders: orders
    }
}


const forderFailed = (error) => {
    return {
        type: actionTypes.FORDER_FAILED,
        error: error
    }
}

export const forderStarting = () => {
    return {
        type: actionTypes.FORDER_START
    }
}

export const forderStart = (token, userId) => {
    return dispatch => {
        dispatch(forderStarting())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(forderSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(forderFailed(err));
            });
    }
}