export default function (state = { cart: { actualItemId: 0 } }, action) {
  switch (action.type) {
    case 'LOAD':
      return state

    case 'ADD_ITEM':
      if (true) {
        const actualItemId = state.cart.actualItemId + 1
        action.item = {
          ...action.item,
          id: state.cart.actualItemId
        }
        if (state.cart.itens) {
          const item = state.cart.itens.find((i) =>
            action.item.size === i.size &&
            action.item.border.name === i.border.name &&
            action.item.pasta.name === i.pasta.name)

          if (item) {
            const subTotal = state.cart.subTotal - item.totalValue + (item.value * (item.qt+1))
            const total = state.cart.total - item.totalValue + (item.value * (item.qt+1))
            const itens = state.cart.itens.filter((i) => {
              if (i !== item) {
                return i
              }
              i.qt = i.qt+1
              i.totalValue = i.value * i.qt
              return i
            })
            return {
              cart: {
                ...state.cart,
                subTotal: subTotal,
                deliveryCost: 10,
                total: total,
                estimatedTime: "30-40 min",
                itens: itens
              }
            }
          } else {
            const subTotal = state.cart.subTotal + action.item.totalValue
            const total = state.cart.total + action.item.totalValue
            const itens = state.cart.itens
            state.cart = {
              ...state.cart,
              actualItemId: actualItemId,
              subTotal: subTotal,
              deliveryCost: 10,
              total: total,
              estimatedTime: "30-40 min",
              itens: [...itens, action.item]
            }
          }
        } else {
          state.cart = {
            ...state.cart,
            actualItemId: actualItemId,
            subTotal: action.item.totalValue,
            deliveryCost: 10,
            total: action.item.totalValue + 10,
            estimatedTime: "30-40 min",
            itens: [action.item]
          }
        }
      }
      return state

    case 'REMOVE_ITEM':
      if (true) {
        if (state.cart.itens.length === 1) {
          return {
            cart: { actualItemId: 0 }
          }
        } else {
          const item = state.cart.itens.find((i) => i.id === action.itemId)
          const subTotal = state.cart.subTotal - item.totalValue
          const total = state.cart.total - item.totalValue
          return {
            cart: {
              ...state.cart,
              subTotal: subTotal,
              total: total,
              itens: state.cart.itens.filter((i) => i.id !== action.itemId)
            }
          }
        }
      }
      break

    case 'CHANGE_QT':
      if (true) {
        const item = state.cart.itens.find((i) => i.id === action.itemId)
        const subTotal = state.cart.subTotal - item.totalValue + (item.value * action.qt)
        const total = state.cart.total - item.totalValue + (item.value * action.qt)
        const itens = state.cart.itens.filter((i) => {
          if (i.id !== action.itemId) {
            return i
          }
          i.qt = action.qt
          i.totalValue = i.value * action.qt
          return i
        })
        return {
          cart: {
            ...state.cart,
            subTotal: subTotal,
            deliveryCost: 10,
            total: total,
            estimatedTime: "30-40 min",
            itens: itens
          }
        }
      }
      break

    case 'FINISH':
      return {
        ...state,
        cart: { actualItemId: 0 }
      }

    default:
      return state
  }
}