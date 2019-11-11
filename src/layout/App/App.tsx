import React from 'react';
import styles from './styles.scss';
import {Header} from "./Header";
import VisibleTodoList from "./VisibleTodoList";
import AddTodo from './AddTodo'

interface IInjectedPrios {
    accountStore?: any
}

interface IProps extends IInjectedPrios {
}

interface IState {
}

class App extends React.Component<IProps, IState> {
    render() {
        return <div className={styles.root}>
            <Header/>
            <AddTodo />
            <VisibleTodoList />
            <Footer/>
        </div>
    }
};


export default App

const Footer: React.FC =  () => <div className={styles.footer}>© wishery</div>;
