import React from 'react';
import axios from "axios";
import Card from "../../../components/Card/Card";
import historyService from "../../../services/historyService";
import {IStore} from "../../../store/reducers";
import {connect} from "react-redux";
import styles from './styles.scss'


interface IProps {
    id?: string,
    token?: string
}

type TDataItem = {
    author: string
    description: string
    title: string
    _id: string
    date?: string
}

interface IState {
    data: TDataItem[] | null
    // isAuth: boolean
}


class _Private extends React.Component<IProps, IState> {
    state = {
        data: [],
        // isAuth:false
    }



    componentDidMount() {
        const {id, token} = this.props
        if (!id || !token) return this.setState({data: null})

        axios(`http://localhost:8080/private/${id}`, {headers: {'auth-token': token}})
            .then(res => {
                historyService.history!.push('/private')
                this.setState({data: res.data.reverse() || []})
            })
            .catch(e => {
                this.setState({data: null})
            })
    }

    handleDelete = async (id: string) => {
        const result = this.state.data.filter((obj: TDataItem) => obj._id !== id)
        this.setState({data: result})
        await axios.delete(`http://localhost:8080/posts/${id}`)
        console.log('Deleted')
    }

    render() {
        if (this.state.data == null) return <h1>403 forbidden</h1>
        return (
            <>
                <h2>Here you can Update & Delete your Wishes</h2>
                {this.state.data.map((obj: TDataItem) =>
                    <div className={styles.container} key={obj._id}>
                        <Card
                            // date={obj.date}
                            style={{marginBottom: 0}}
                            url={`/posts/update/${obj._id}`}
                            author={obj.author}
                            description={obj.description}
                            title={obj.title}
                        />
                        <div className={styles.button}>
                            <button className={styles.delButton} onClick={() => this.handleDelete(obj._id)}>del</button>
                        </div>
                    </div>
                )}
            </>
        )
    }
}

const mapStateToProps = ({accountStore: {id, token}}: IStore) => ({id, token})

const Private = connect(mapStateToProps)(_Private)

export default Private
