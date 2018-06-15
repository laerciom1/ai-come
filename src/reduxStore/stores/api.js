import stores from './seed.js'
import menus from '../menus/seed.js'

export function load() {
    return (dispatch) => {
        /*fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
        .then((response) => response.json())
        .then((formatedReponse) => {
            dispatch({ type: 'LOAD_TWEETS', tweets: formatedReponse})
        })*/
        dispatch({ type: 'LOAD_STORES', stores: stores})
    }
}

export function loadStore(id) {
    const store = stores.find((s) => Number(s.id) === Number(id))
    const menu = menus.find((m) => Number(m.store_id) === Number(id))
    const actualStore = {
        ...store,
        menu: menu
    }
    return (dispatch) => {
        dispatch({ type: 'LOAD_STORE', actualStore: actualStore})
    }
}