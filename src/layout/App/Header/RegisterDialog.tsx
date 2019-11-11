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
    username: string
}


export default class RegisterDialog extends React.Component<IProps, IState> {
    state = {visible: false, email: '', pass: '', username: ''};

    handleOpenDialog = () => this.setState({visible: true});

    handleCloseDialog = () => this.setState({visible: false});

    handleChangePass = ({target: {value: pass}}: React.ChangeEvent<HTMLInputElement>) => this.setState({pass});

    handleChangeEmail = ({target: {value: email}}: React.ChangeEvent<HTMLInputElement>) => this.setState({email});

    handleChangeUsername = ({target: {value: username}}: React.ChangeEvent<HTMLInputElement>) => this.setState({username});

    handleSubmit = async () => {
        const {email, pass: password, username} = this.state;
        const res = await axios.post('http://localhost:8080/user/register', {email, password, username});
        console.log(res)
    }

    render() {
        const {email, pass, visible, username} = this.state;

        return <>
            <Button onClick={this.handleOpenDialog}>Register</Button>
            <Dialog
                title={'Register'}
                onClose={this.handleCloseDialog}
                visible={visible}
                footer={
                    <div className={styles.row}>
                        <Button onClick={this.handleSubmit}>Register</Button>
                    </div>}
            >
                <div className={styles.dialogBody}>
                    <div className={styles.row}>
                        <p>Username</p>
                        <input onChange={this.handleChangeUsername} className={styles.input} value={username}/>
                    </div>
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
