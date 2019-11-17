import React from 'react'
import styles from './styles.scss'
import Header from './Header'
import {Switch, Route} from 'react-router-dom'
import Private from './Private/Private'
import Home from './Home/Home'
import Post from './Post/Post'

interface IInjectedProps {
    accountStore?: any
}

interface IProps extends IInjectedProps {
}

interface IState {
}

class App extends React.Component<IProps, IState> {

    render() {
        return (
            <div className={styles.root}>
                <Header/>
                <div className={styles.body}>
                    <div className={styles.content}>
                        <Switch>
                            <Route path="/private">
                                <Private/>
                            </Route>
                            <Route exact path="/">
                                <Home/>
                            </Route>
                           {/* <Route path="/posts/:id">
                                <Post/>
                            </Route>*/}
                            <Route path="/posts/:id" component={Post}/>
                        </Switch>
                    </div>
                    <Footer/>
                </div>
            </div>
        )
    }
};


export default App

const Footer: React.FC = () => <div className={styles.footer}>© wishery</div>;
