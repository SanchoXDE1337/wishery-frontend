import Button from "../../../components/Button";
import React from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

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
    render() {
        return (
            <Link to={'/private'}>
                <Button>Private Cabinet</Button>
            </Link>
        )
    }
}