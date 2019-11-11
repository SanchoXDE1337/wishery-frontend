import React from 'react';
import Dialog from "rc-dialog";
import styles from "./styles.scss";
import Button from "../../../components/Button";
import axios from "axios";

interface IProps {

}

interface IState {
    visible: boolean
    email: string
    pass: string
}


export default class LoginDialog extends React.Component<IProps, IState> {
    state = {visible: false, email: '', pass: ''};

    handleOpenLoginDialog = () => this.setState({visible: true});

    handleCloseLoginDialog = () => this.setState({visible: false});

    handleChangePass = ({target: {value: pass}}: React.ChangeEvent<HTMLInputElement>) => this.setState({pass});

    handleChangeEmail = ({target: {value: email}}: React.ChangeEvent<HTMLInputElement>) => this.setState({email});

    handleLogin = async () => {
        const {email, pass: password} = this.state;
        const res = await axios.post('http://localhost:8080/user/login', {email, password});
        console.log(res)
    }

    render() {
        const {email, pass, visible} = this.state;

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
                        <p>Email</p>
                        <input onChange={this.handleChangeEmail} className={styles.input} value={email}/>
                    </div>
                    <div className={styles.row}>
                        <p>Password</p>
                        <input onChange={this.handleChangePass} className={styles.input} value={pass}/>
                    </div>
                </div>
            </Dialog>
        </>

    }
}
