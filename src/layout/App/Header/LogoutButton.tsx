import Button from "../../../components/Button";
import React from "react";
import {Link} from "react-router-dom";

interface IProps {
}

interface IState {
}

export default class LogoutButton extends React.Component<IProps, IState> {
    logout = () => {
        if (window.confirm('Are you sure you wish to logout?')) {
            localStorage.removeItem('token')
            window.location.reload()
        }
    }

    render() {
        return (
            <Link to={'/'}>
                <Button onClick={this.logout}>Logout</Button>
            </Link>
        )
    }
}

