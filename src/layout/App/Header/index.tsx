import React from 'react';
import styles from './styles.scss';
import 'rc-dialog/assets/index.css'
import LoginDialog from './LoginDialog'
import RegisterDialog from "./RegisterDialog";
import LogoutButton from './LogoutButton'
import PrivateButton from "./PrivateButton";
import historyService from "../../../services/historyService";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {login, logout} from "../../../store/actions";
import {IStore} from "../../../store/reducers";

interface IState {
    token?: string
}

interface IProps {
    id?: string
    token?: string
    login?: (token: string, id: string) => void
    logout?: () => void
}


class _Header extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {token: props.token}
    }



    static getDerivedStateFromProps(nextProps: Readonly<IProps>, prevState: IState) {
        const {token} = nextProps;
        return (token !== prevState.token) ? {...prevState, token} : null
    }

    handleClickToLogo = () => historyService.history!.push('/');

    render() {
        const {login, logout} = this.props;
        return (
            <div className={styles.root}>
                <div onClick={this.handleClickToLogo} className={styles.title}>WISHERY</div>
                <div className={styles.buttonSet}>
                    {this.state.token
                        ? <>
                            <PrivateButton/>
                            {logout && <LogoutButton logout={logout}/>}
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
    logout: () => dispatch(logout()),
})

const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)

export default Header
