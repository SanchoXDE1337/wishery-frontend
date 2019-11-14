import React from 'react';
import styles from './styles.scss';
import 'rc-dialog/assets/index.css'
import LoginDialog from './LoginDialog'
import RegisterDialog from "./RegisterDialog";
import LogoutButton from './LogoutButton'
import PrivateButton from "./PrivateButton";
import {Link} from 'react-router-dom'

interface IState {
    token: string
}

interface IProps {

}

export class Header extends React.Component<IProps, IState> {
    state = {token: ''}

    async componentDidMount() {
        const token = localStorage.getItem('token')
        if (token) {
            await this.setState({token: token})
        }
        /*window.addEventListener('storage', async () => {
            const token = localStorage.getItem('token')
            if (token) {
                await this.setState({token: token})
                console.log(this.state)
            }
        })*/
    }


    render() {
        return (
            <div className={styles.root}>
                <Link to={'/'}>
                    <div className={styles.title}>WISHERY</div>
                </Link>
                <div className={styles.buttonSet}>
                    {this.state.token ?
                        <>
                            <PrivateButton/>
                            <LogoutButton/>
                        </>
                        :
                        <>
                            <LoginDialog/>
                            <RegisterDialog/>
                        </>
                    }
                </div>
            </div>
        )
    }
}


