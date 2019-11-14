import React from 'react';
import axios from "axios";
import CardExampleLinkCard from "./Card";

/*
import styles from "./styles.scss";
import Button from "../../../components/Button";
import axios from "axios";
*/

interface IProps {
}

interface IState {
    successfully: boolean
    data: object[]
}


export default class Private extends React.Component<IProps, IState> {
    state = {
        successfully: false,
        data:[]
    }

    async componentDidMount() {
        const id = localStorage.getItem('id')
        const token = localStorage.getItem('token')
        const res = await axios(`http://localhost:8080/private/${id}`, {headers: {'auth-token': token}})
        if (res) {
            await this.setState({successfully: true, data: res.data})
        }
        console.log(...res.data)
    }

    render() {
        if (this.state.successfully) {
            return (
                <>
                    <h1>Hello world</h1>
                    {this.state.data.map(obj => {
                        // @ts-ignore
                        return <CardExampleLinkCard author={obj.author} description={obj.description} title={obj.title} key={obj.author + obj.description}/>
                    })}
                </>
            )
        } else {
            return (
                <h1>403 Forbidden</h1>
            )
        }
    }
}