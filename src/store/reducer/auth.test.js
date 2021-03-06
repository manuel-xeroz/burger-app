import reducer from './auth';
import * as actionTypes from '../actions/actionsTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        });
    });

    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        }, { 
            type: actionTypes.AUTH_SUCCESS,
            userId: 'some-user-id',
            tokenId: 'some-token'
         })).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false,
            authRedirect: '/'
        });
    })
});
