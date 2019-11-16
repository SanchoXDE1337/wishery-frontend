import React from 'react'
import ReactDOM from 'react-dom'
import App from './layout/App/App'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './store/reducers'
import {Router} from "react-router-dom";
import historyService from './services/historyService'
import {loadState} from "./utils/localStore";

const initialState = loadState();

const store = createStore(
    rootReducer,
    initialState,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );


// autorun(() => {
//         console.dir(mobXStore);
//         saveState(mobXStore.serialize());
//     },


ReactDOM.render(
    <Provider store={store}>
        <Router history={historyService.history}>
            <App/>
        </Router>
    </Provider>
    , document.getElementById('root'));
