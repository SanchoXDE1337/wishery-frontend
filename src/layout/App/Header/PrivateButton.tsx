import Button from "../../../components/Button";
import React from "react";
import historyServicse from "../../../services/historyService";

interface IProps {
}

interface IState {
}

export default class PrivateButton extends React.Component<IProps, IState> {
    /* handleClick = async () => {
         const id = localStorage.getItem('id')
         const token = localStorage.getItem('token')
         const res = await axios(`http://localhost:8080/private/${id}`, {headers: {'auth-token': token}})
         console.log(...res.data)
     }*/

    handleClick = () => historyServicse.history!.push('/private')

    render() {
        return <Button onClick={this.handleClick}>Private Cabinet</Button>
    }
}
