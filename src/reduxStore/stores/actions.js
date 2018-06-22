import stores from './seed.js'
import menus from '../menus/seed.js'
import * as actionTypes from './actionTypes'

export const load = () => {
  return {
    type: actionTypes.LOAD_STORES,
    stores: stores
  }
}

export const loadStore = (id) => {
  const store = stores.find((s) => Number(s.id) === Number(id))
  const menu = menus.find((m) => Number(m.store_id) === Number(id))
  const actualStore = {
    ...store,
    menu: menu
  }
  return {
    type: actionTypes.LOAD_STORE,
    actualStore: actualStore
  }
}