import Button from "../../../components/Button";
import React from "react";
import historyServicse from "../../../services/historyService";

interface IProps {
}

interface IState {
}

export default class LogoutButton extends React.Component<IProps, IState> {
    logout = () => {
        if (window.confirm('Are you sure you wish to logout?')) {
            localStorage.removeItem('token');
            historyServicse.history!.push('/');
        }
    }

    render() {
        return <Button onClick={this.logout}>Logout</Button>
    }
}

