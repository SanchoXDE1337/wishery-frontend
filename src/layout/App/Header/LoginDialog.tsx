import React from 'react';
import Dialog from "rc-dialog";
import styles from "./styles.scss";
import Button from "../../../components/Button";
import axios from "axios";

interface IProps {

}

interface IState {
    visible: boolean
    name: string
    password: string
}


export default class LoginDialog extends React.Component<IProps, IState> {
    state = {visible: false, name: '', password: ''}

    handleOpenLoginDialog = () => this.setState({visible: true})

    handleCloseLoginDialog = () => this.setState({visible: false})

    handleChangePass = ({target: {value: password}}: React.ChangeEvent<HTMLInputElement>) => this.setState({password})

    handleChangeEmail = ({target: {value: name}}: React.ChangeEvent<HTMLInputElement>) => this.setState({name})

    handleLogin = async () => {
        const {name, password} = this.state
        const res = await axios.post('http://localhost:8080/user/login', {name, password})
        // console.log(`token: ${res.data}`)
        console.log(res)
        localStorage.setItem('token', res.data[0])
        localStorage.setItem('id', res.data[1])
        // this.handleCloseLoginDialog()
        window.location.reload()
    }

    render() {
        const {name, password, visible} = this.state

        return <>
            <Button onClick={this.handleOpenLoginDialog}>Login</Button>
            <Dialog
                title={'Login'}
                onClose={this.handleCloseLoginDialog}
                visible={visible}
                footer={
                    <div className={styles.row}>
                        <Button onClick={this.handleLogin}>Login</Button>
                    </div>}
            >
                <div className={styles.dialogBody}>
                    <div className={styles.row}>
                        <p>Login</p>
                        <input onChange={this.handleChangeEmail}
                               className={styles.input}
                               value={name}
                               placeholder={'Username or E-mail'}
                        />
                    </div>
                    <div className={styles.row}>
                        <p>Password</p>
                        <input onChange={this.handleChangePass}
                               className={styles.input}
                               value={password}
                               placeholder={'Password'}
                               type={'password'}
                        />
                    </div>
                </div>
            </Dialog>
        </>

    }
}
