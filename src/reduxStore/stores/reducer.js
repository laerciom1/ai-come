export default function (state = { stores: [], actualStore: {} }, action) {
  switch (action.type) {
    case 'LOAD_STORES':
      return {
        ...state,
        stores: action.stores
      }

    case 'LOAD_STORE':
      return {
        ...state,
        actualStore: action.actualStore
      }
      
    default:
      return state
  }
}