import React from 'react'
import ReactDOM from 'react-dom'
import App from './layout/App/App'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './store/reducers'
// import { createBrowserHistory } from 'history';

const store = createStore(rootReducer)


// autorun(() => {
//         console.dir(mobXStore);
//         saveState(mobXStore.serialize());
//     },
// const history = createBrowserHistory();


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'))
