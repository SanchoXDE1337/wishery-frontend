import React from 'react';
import axios from "axios";
import CardExampleLinkCard from "../../../components/Card/Card";
import Comments from './Comments';

interface IProps {
    match?: any
}

type TDataItem = {
    _id: string
    author: string
    description?: string
    title: string
}
type TCommentItem = {
    _id?: string
    author?: string
    text?: string
}

interface IState {
    data: TDataItem | null,
    comments: TCommentItem[] | null
}


class Post extends React.Component<IProps, IState> {
    state = {
        data: {
            _id: '',
            author: '',
            description: '',
            title: ''
        },
        comments: []
    }

    async componentDidMount() {
        const rawData = await axios(`http://localhost:8080/posts/${this.props.match.params.id}`)
        const data = rawData.data
        this.setState({data: data})
        console.log(this.state.data)
    }

    render() {
        const {author, description, title} = this.state.data
        return (
            <>
                <h1>Post {this.props.match.params.id}</h1>
                <CardExampleLinkCard
                    author={author}
                    description={description}
                    title={title}
                />
                <Comments/>
            </>
        )
    }
}

export default Post