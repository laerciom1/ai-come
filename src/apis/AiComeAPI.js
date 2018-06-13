import stores from '../sampleObjects/stores.js'

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

export function loadMenu(id) {
    return (dispatch) => {
        /*fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
        .then((response) => response.json())
        .then((formatedReponse) => {
            dispatch({ type: 'LOAD_TWEETS', tweets: formatedReponse})
        })*/
        dispatch({ type: 'LOAD_STORE', id: id})
    }
}

export function add(newTweet) {
    return (dispatch) => {
        fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'POST',
            body: JSON.stringify({conteudo : newTweet})
        })
        .then(response => response.json())
        .then(jsonResponse => {
            dispatch({ type: 'ADD_TWEET', tweet: jsonResponse})
        })
    }
}

export function remove(tweetId/*, { redirect }*/) {
    return (dispatch) => {
        fetch(`http://localhost:3001/tweets/${tweetId}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'DELETE'
        })
        .then((response) => {
            /*if (!response.ok) {
                throw response.json()
            }*/
            return response.json()
        })
        .then((jsonResponse) => {
            if(jsonResponse.removidos > 0) {
                dispatch({ type: 'REMOVE_TWEET', tweetId: tweetId })
                dispatch({ type: 'SHOW_NOTIFICATION', message: 'REMOVIDO'})
            }/* else {
                redirect({
                    pathname:'/error',
                    message: 'Acao nao registrada no servidor'
                })
            }  */          
        })
        /*.catch((error) => {
            redirect({
                pathname:'/error',
                message: 'Erro de comunicacao com o server. Acao nao registrada no servidor'
            })
        })*/
    }
}

export function like(tweetId) {
    return (dispatch) => {
        fetch(`http://localhost:3001/tweets/${tweetId}/like?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'POST'
        })
        .then((response) => {
            /*if (!response.ok) {
                // TODO tratar se eh um json ou nao
                throw response.json()
            }*/
            return response.json()
        })
        .then((jsonResponse) => {
            if(jsonResponse.status === 201 || jsonResponse.status === 'removido') {
                dispatch({ type: 'LIKE_TWEET', tweetId: tweetId })
                dispatch({ type: 'SHOW_NOTIFICATION', message: 'LIKEADO'})
            } /*else {
                this.props.history.push({
                    pathname:'/error',
                    message: 'Acao nao registrada no servidor'
                })
            }*/      
        })
        /*.catch((error) => {
            this.props.history.push({
                pathname:'/error',
                message: 'Erro de comunicacao com o server. Acao nao registrada no servidor'
            })
        })*/
    }
}