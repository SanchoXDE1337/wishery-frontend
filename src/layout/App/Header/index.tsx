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
import {Dropdown} from 'semantic-ui-react'
import axios from "axios";

interface IState {
    token?: string
    isAuth: boolean
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
        this.state = {token: props.token, isAuth: false}
    }

      static getDerivedStateFromProps(nextProps: Readonly<IProps>, prevState: IState) {
          const {token} = nextProps
          if(!token) return {...prevState, isAuth: false}
          return (token !== prevState.token) ? {...prevState, token} : null
      }

    authenticate = async () => {
        const {token} = this.props
        const isAuth = (await axios(`http://localhost:8080/user/isAuth`, {headers: {'auth-token': token}})).data
        if (isAuth !== this.state.isAuth) {
            if (isAuth) {
                this.setState({isAuth})
            } else {
                this.setState({isAuth: false})
            }
        }
    }

    async componentDidMount() {
        await this.authenticate()
    }


    async componentDidUpdate(prevProps: Readonly<IProps>, prevState: IState) {
        await this.authenticate()
    }

    handleClickToLogo = () => historyService.history!.push('/');

    render() {
        const {login, logout} = this.props;
        return (
            <div className={styles.root}>
                <div onClick={this.handleClickToLogo} className={styles.title}>WISHERY</div>
                <div className={styles.buttonSet}>
                    <Dropdown text='Account'>
                        <Dropdown.Menu direction={'left'}>
                            {this.state.isAuth
                                ? <>
                                    <Dropdown.Item>
                                        <PrivateButton/>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        {logout && <LogoutButton logout={logout}/>}
                                    </Dropdown.Item>
                                </>
                                : <>
                                    <Dropdown.Item>
                                        {login && <LoginDialog login={login}/>}
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <RegisterDialog/>
                                    </Dropdown.Item>
                                </>}
                        </Dropdown.Menu>
                    </Dropdown>
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
