import * as actionTypes from './actionTypes'

const initialState = {
  cart: {
    actualItemId: 0
  }
}

const updateCartTotalValues = (newCart) => {
  var subTotal = 0;
  for(let it of newCart.itens){
    subTotal += (it.value * it.qt)
  }

  newCart.subTotal = subTotal
  newCart.total = subTotal + newCart.deliveryCost
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case actionTypes.LOAD_CART: {
      return state
    }
    case actionTypes.ADD_ITEM_CART: {
      const actualItemId = state.cart.actualItemId + 1
      action.item = {
        ...action.item,
        id: actualItemId
      }

      const newCart = {
        ...state.cart,
        actualItemId: actualItemId, 
        subTotal: action.item.totalValue,
        deliveryCost: 10,
        estimatedTime: "30-40 min"
      }

      if (state.cart.itens) {
        newCart.itens = [...state.cart.itens]
      } else {
        newCart.itens = []
      }        

      const item = newCart.itens.find(it => action.item.size === it.size 
        && action.item.border.name === it.border.name 
        && action.item.pasta.name === it.pasta.name
        && action.item.taste.name === it.taste.name);

      if(item){
        item.qt = item.qt + 1;
      } else {
        newCart.itens = newCart.itens.concat(action.item);
      } 
      
      updateCartTotalValues(newCart);
      
      return {
        ...state,
        cart: newCart
      }
    } 
    case actionTypes.REMOVE_ITEM_CART: {
      if(!state.cart.itens){
        return state;
      }

      if(state.cart.itens.length === 1){
        return {
          ...state,
          cart: { actualItemId: 0}
        }
      }

      const newCart = {
        ...state.cart,
        itens: state.cart.itens.filter((i) => i.id !== action.itemId)
      }

      updateCartTotalValues(newCart);

      return {
        ...state,
        cart: newCart
      }
    }
    case actionTypes.CHANGE_QT_CART: {
      const item = state.cart.itens.find((i) => i.id === action.itemId);
      if(item){
        const newCart = {
          ...state.cart,
          itens: state.cart.itens.map(
            (it, i) => action.itemId == it.id ? {...it, qt: action.qt, totalValue: it.value * action.qt } : it 
          )
        }

        updateCartTotalValues(newCart);

        return {
          ...state,
          cart: newCart
        }

      }
      return state
    }
    case actionTypes.FINALIZE_CART: {
      return {
        ...state,
        cart: { actualItemId: 0 }
      }
    }
    default: {
      return state
    }
  }
}

export default reducer;
