import React from 'react'
import styles from './styles.scss'
import {Header} from './Header'
import VisibleTodoList from './VisibleTodoList'
import AddTodo from './AddTodo'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Private from './Private/Private'


interface IInjectedProps {
    accountStore?: any
}

interface IProps extends IInjectedProps {
}

interface IState {
    // token: string
}

class App extends React.Component<IProps, IState> {
    /*state = {token: ''}

    async componentDidMount() {
        const token = localStorage.getItem('token')
        if (token) {
            await this.setState({token: token})
            console.log(this.state)
        }
    }*/

    render() {
        return (
            <BrowserRouter>
                <div className={styles.root}>
                    <Header/>
                    <div className={styles.content}>
                        <Switch>
                            <Route path="/private">
                                <Private/>
                            </Route>
                            <Route path="/">
                                <AddTodo/>
                                <VisibleTodoList/>
                            </Route>
                        </Switch>
                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        )
    }
};


export default App

const Footer: React.FC = () => <div className={styles.footer}>© wishery</div>;
