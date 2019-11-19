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
    date: string
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
            title: '',
            date: ''
        },
        comments: []
    }

    async componentDidMount() {
        const data = (await axios(`http://localhost:8080/posts/${this.props.match.params.id}`)).data
        this.setState({data: data})
    }

    render() {
        const {author, description, title, date} = this.state.data
        return (
            <>
                <h4>Post</h4>
                <h5>{this.state.data._id}</h5>
                <CardExampleLinkCard
                    author={author}
                    description={description}
                    title={title}
                    date={date}
                />
                <Comments postId={this.props.match.params.id}/>
            </>
        )
    }
}

export default Post