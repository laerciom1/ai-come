import * as actionTypes from './actionTypes'

const initialState = {
  cart: {
    actualItemId: 0
  }
}

const updateCartTotalValues = (newCart) => {
  var subTotal = 0;
  for (let it of newCart.itens) {
    subTotal += (it.totalValue * it.qt)
  }

  newCart.subTotal = subTotal
  newCart.total = subTotal + newCart.deliveryCost
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.LOAD_CART: {
      return state
    }

    case actionTypes.ADD_ITEM_CART:
      if (state.cart.storeId) {
        if (action.storeId === state.cart.storeId) {
          const item = state.cart.itens.find(it => action.newItem.size.id === it.size.id
            && action.newItem.border.id === it.border.id
            && action.newItem.pasta.id === it.pasta.id
            && action.newItem.taste.id === it.taste.id);

          var newItens
          var actualItemId = state.cart.actualItemId
          if (item) {
            newItens = state.cart.itens.map((i) => {
              if(i.id === item.id) {
                i.qt = i.qt + 1
              }
              return i
            })
          } else {
            actualItemId = actualItemId + 1
            action.newItem = {
              ...action.newItem,
              id: actualItemId,
              qt: 1
            }
            newItens = [...state.cart.itens, action.newItem]
          }
          
          const newCart = {
            actualItemId: actualItemId,
            itens: newItens,
            storeId: state.cart.storeId,
            storeName: state.cart.storeName,
            deliveryCost: 10,
            estimatedTime: "30-40 min"
          }
          updateCartTotalValues(newCart);
          return {
            ...state,
            cart: newCart
          }
        } else {
          alert("Loja diferente, vai azedar")
        }
      } else { // primeiro item
        const actualItemId = state.cart.actualItemId + 1
        action.newItem = {
          ...action.newItem,
          id: actualItemId
        }

        const newCart = {
          ...state.cart,
          storeId: action.storeId,
          storeName: action.storeName,
          actualItemId: actualItemId,
          subTotal: action.newItem.totalValue,
          deliveryCost: 10,
          estimatedTime: "30-40 min"
        }

        action.newItem = {
          ...action.newItem,
          qt:1
        }
        newCart.itens = [action.newItem]

        updateCartTotalValues(newCart);

        return {
          ...state,
          cart: newCart
        }
      }
      break

    case actionTypes.REMOVE_ITEM_CART: {
      if (!state.cart.itens) {
        return state;
      }

      if (state.cart.itens.length === 1) {
        return {
          ...state,
          cart: { actualItemId: 0 }
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

      if (item) {
        const newCart = {
          ...state.cart,
          itens: state.cart.itens.map(
            (it, i) => action.itemId === it.id ? { ...it, qt: action.qt } : it
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
