export function load() {
  return (dispatch) => {
    dispatch({ type: 'LOAD' })
  }
}

export function add(item) {
  const tasteValue = item.size === "xl" ? item.taste.xl_value : (item.size === "l" ? item.taste.l_value : (item.size === "m" ? item.taste.m_value : item.taste.s_value))
  const borderValue = item.border.value
  const pastaValue = item.pasta.value
  const newItem = {
    ...item,
    qt: 1,
    totalValue: borderValue + pastaValue + tasteValue
  }
  return (dispatch) => {
    dispatch({ type: 'ADD_ITEM', item: newItem })
  }
}

export function remove(item) {
  return (dispatch) => {
    dispatch({ type: 'REMOVE_ITEM', item: item })
  }
}

export function changeQt(id, qt) {
  if (qt > 0) {
    return (dispatch) => {
      dispatch({ type: 'CHANGE_QT', itemId: id, qt: qt })
    }
  } else {
    return (dispatch) => {
      dispatch({ type: 'REMOVE_ITEM', itemId: id })
    }
  }
}

export function finalize(item) {
  return (dispatch) => {
    dispatch({ type: 'FINALIZE' })
  }
}

export function getSubtotal() {
  return (dispatch) => {
    dispatch({ type: 'LOAD' })
  }
}