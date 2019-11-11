import React from 'react';
import styles from './styles.scss';
import 'rc-dialog/assets/index.css'
import LoginDialog from './LoginDialog'
import RegisterDialog from "./RegisterDialog";

interface IState {
}

interface IProps {

}

export class Header extends React.Component<IProps, IState> {

    render() {
        return <div className={styles.root}>
            <b>WISHERY</b>
            <div className={styles.buttonSet}>
                <LoginDialog/>
                <RegisterDialog/>
            </div>
        </div>
    }
}


