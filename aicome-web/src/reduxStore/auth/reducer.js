import * as actionTypes from './actionTypes'

const initialState = {
    auth: {
      access_token: '',
      token_type: '',
      scope: '',
      jti: '',
    }
  }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTH: {
            return {
                ...state,
                auth: action.auth
            }
        }
        case actionTypes.CLEAR_AUTH: {
            return {
                ...state,
                auth: initialState.auth
            }
        }
        default: {
            return state
        }
    }

}

export default reducer;