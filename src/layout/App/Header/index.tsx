import React from 'react';
import styles from './styles.scss';
import 'rc-dialog/assets/index.css'
import LoginDialog from './LoginDialog'
import RegisterDialog from "./RegisterDialog";
import LogoutButton from './LogoutButton'
import PrivateButton from "./PrivateButton";
import historyServicse from "../../../services/historyService";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {login} from "../../../store/actions";
import {IStore} from "../../../store/reducers";

interface IState {
    token?: string
}

interface IProps {
    id?: string
    token?: string
    login?: (token: string, id: string) => void
}


class _Header extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {token: props.token}
    }


    componentWillReceiveProps(nextProps: Readonly<IProps>, nextContext: any): void {
        const {token} = nextProps;
        if(token !== this.props.token) this.setState({token})
    }

    handleClickToLogo = () => historyServicse.history!.push('/');

    render() {
        const {login} = this.props;
        return (
            <div className={styles.root}>
                <div onClick={this.handleClickToLogo} className={styles.title}>WISHERY</div>
                <div className={styles.buttonSet}>
                    {this.state.token
                        ? <>
                            <PrivateButton/>
                            <LogoutButton/>
                        </>
                        : <>
                            {login && <LoginDialog login={login}/>}
                            <RegisterDialog/>
                        </>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({accountStore: {id, token}}: IStore) => ({id, token})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    login: (token: string, id: string) => dispatch(login(token, id)),
})

const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)

export default Header
