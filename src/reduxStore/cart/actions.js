import * as actionTypes from './actionTypes'

export const loadCart = () => {
  return {
    type: actionTypes.LOAD_CART
  }
}

export const addItemCart = (item) => {
  const tasteValue = item.size === "xl" ? item.taste.xl_value : (item.size === "l" ? item.taste.l_value : (item.size === "m" ? item.taste.m_value : item.taste.s_value))
  const borderValue = item.border.value
  const pastaValue = item.pasta.value
  const newItem = {
    ...item,
    qt: 1,
    value: borderValue + pastaValue + tasteValue,
    totalValue: (borderValue + pastaValue + tasteValue)
  }
  return {
    type: actionTypes.ADD_ITEM_CART,
    item: newItem
  }
}

export const changeQtCart = (id, qt) => {
  if (qt > 0) {
    return {
      type: actionTypes.CHANGE_QT_CART,
      itemId: id,
      qt: qt
    }
  } else {
    return {
      type: actionTypes.REMOVE_ITEM_CART,
      itemId: id
    }
  }
}

export const finalizeCart = () => {
  return {
    type: actionTypes.FINALIZE_CART
  }
}
