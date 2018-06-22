import * as actionTypes from './actionTypes'

export const loadCart = () => {
  return {
    type: actionTypes.LOAD_CART
  }
}

export const addItemCart = (item) => {
  const title = item.taste.name
  const size = item.size
  const tasteName = item.taste.name
  const tasteDescription = item.taste.description
  const tasteValue = item.size === "xl" ? item.taste.xl_value : (item.size === "l" ? item.taste.l_value : (item.size === "m" ? item.taste.m_value : item.taste.s_value))
  const borderName = item.border.name
  const borderValue = item.border.value
  const pastaName = item.pasta.name
  const pastaValue = item.pasta.value
  const newItem = {
    title: title,
    size: size,
    taste: {
      name: tasteName,
      description: tasteDescription,
      value: tasteValue
    },
    border: {
      name: borderName,
      value: borderValue
    },
    pasta: {
      name: pastaName,
      value: pastaValue
    },
    totalValue: borderValue + pastaValue + tasteValue
  }
  return {
    type: actionTypes.ADD_ITEM_CART,
    newItem: newItem,
    storeId: item.storeId,
    storeName: item.storeName
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
