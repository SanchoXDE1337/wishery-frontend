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
    theme: string
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

    handleUpdate = (id: string) => {
        historyService.history!.push(`/posts/update/${id}`)
    }

    handleDelete = async (id: string) => {
        let confirmation = window.confirm('Are you sure want to delete this wish?')
        if (confirmation) {
            const result = this.state.data.filter((obj: TDataItem) => obj._id !== id)
            this.setState({data: result})
            await axios.delete(`http://localhost:8080/posts/${id}`)
        }
    }

    render() {
        if (this.state.data == null) return <h1>403 forbidden</h1>
        return (
            <>
                <h2>Here you can Update & Delete your Wishes</h2>
                {this.state.data.map((obj: TDataItem) =>
                    <div className={styles.container} key={obj._id}>
                        <Card
                            style={{marginBottom: 0}}
                            theme={obj.theme}
                            url={`/posts/${obj._id}`}
                            author={obj.author}
                            title={obj.title}
                        />
                        <div className={styles.button}>
                            <button className={styles.delButton} onClick={() => this.handleUpdate(obj._id)}
                                    title={'Update!'}>
                                <i className="material-icons">update</i>
                            </button>
                        </div>
                        <div className={styles.button}>
                            <button className={styles.delButton} onClick={() => this.handleDelete(obj._id)}
                                    title={'Delete!'}>
                                <i className="material-icons-outlined">delete_forever</i>
                            </button>
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
