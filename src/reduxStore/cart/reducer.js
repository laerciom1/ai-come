export default function (state = { cart: {} }, action) {
  switch (action.type) {
    case 'LOAD':
      return state

    case 'ADD_ITEM':
      if (state.cart.itens) {
        console.log(state)
        const subTotal = state.cart.subTotal + action.item.totalValue
        const total = state.cart.total + action.item.totalValue
        const itens = state.cart.itens
        state.cart = {
          subTotal: subTotal,
          deliveryCost: 10,
          total: total,
          estimatedTime: "30-40 min",
          itens: [...itens, action.item]
        }
      } else {
        state.cart = {
          subTotal: action.item.totalValue,
          deliveryCost: 10,
          total: action.item.totalValue + 10,
          estimatedTime: "30-40 min",
          itens: [action.item]
        }
      }
      return state

    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: {
          ...state.cart,
          itens: state.cart.itens.filter((i) => i.id !== action.id)
        }
      }

    case 'CHANGE_QT':
      const itns = this.state.cart.itens.filter((i) => {
        if (i.id !== action.id) {
          return i
        }
        i.qt = action.qt
        return i
      })
      return {
        ...state,
        cart: {
          ...state.cart,
          itens: itns
        }
      }

    case 'FINALIZE':
      return {
        ...state,
        cart: {}
      }

    default:
      return state
  }
}