import React from 'react';
import axios from "axios";
import CardExampleLinkCard from "../../../components/Card/Card";
import historyServicse from "../../../services/historyService";
import {IStore} from "../../../store/reducers";
import {connect} from "react-redux";

/*
import styles from "./styles.scss";
import Button from "../../../components/Button";
import axios from "axios";
*/

interface IProps {
    id?: string,
    token?: string
}

type TDataItem = {
    author: string
    description: string
    title: string
}

interface IState {
    data: TDataItem[] | null
}


class _Private extends React.Component<IProps, IState> {
    state = {
        data: []
    }

    componentDidMount() {
        const {id, token} = this.props
        if (!id || !token) return this.setState({data: null})

        axios(`http://localhost:8080/private/${id}`, {headers: {'auth-token': token}})
            .then(res => {
                historyServicse.history!.push('/private')
                this.setState({data: res.data || []})
            })
            .catch(e => {
                this.setState({data: null})
            })


    }

    render() {
        if (this.state.data == null) return <h1>403 forbidden</h1>
        return (
            <>
                <h1>Hello world</h1>
                {this.state.data.map((obj: TDataItem) =>
                    <CardExampleLinkCard
                        author={obj.author}
                        description={obj.description}
                        title={obj.title}
                        key={obj.author + obj.description}
                    />
                )}
            </>
        )
    }
}

const mapStateToProps = ({accountStore: {id, token}}: IStore) => ({id, token})

const Private = connect(mapStateToProps)(_Private)

export default Private
