import React from 'react'
import {Button, Comment, Form, Header} from 'semantic-ui-react'
import axios from 'axios'
import Commentary from './Comment'
import {IStore} from "../../../store/reducers";
import {connect} from "react-redux";

type TDataItem = {
    author: string
    text: string
    date: string
}

interface IProps {
    postId: string
    id?: string,
    token?: string
}


interface IState {
    data: TDataItem[] | null
    textareaValue: string
    isAuth: boolean
}


class _Comments extends React.Component<IProps, IState> {
    state = {
        textareaValue: '',
        data: [],
        isAuth: false
    }

    async componentDidMount() {
        const data = (await axios(`http://localhost:8080/comments/${this.props.postId}`)).data
        if (data !== null) {
            this.setState({data})
        }
        const {token} = this.props
        const isAuth = (await axios(`http://localhost:8080/user/isAuth`, {headers: {'auth-token': token}})).data
        if (isAuth) return this.setState({isAuth})
    }

    handleButtonClick = async () => {
        const {textareaValue} = this.state
        const {token} = this.props
        const res: TDataItem = (await axios.post(`http://localhost:8080/comments/${this.props.postId}`, {
            author: this.props.id,
            text: textareaValue
        }, {headers: {'auth-token': token}})).data
        this.setState({data: [...this.state.data, res], textareaValue: ''})
    }

    handleTextAreaChange = (e: any) => {
        this.setState({textareaValue: e.target.value})
    }

    render() {
        return (
            <Comment.Group>
                <Header as='h3' dividing>
                    Comments
                </Header>
                {this.state.data
                    ? this.state.data.map((comment: TDataItem) => <Commentary key={comment.date}
                                                                              author={comment.author}
                                                                              text={comment.text}
                                                                              date={comment.date}/>)
                    : <p>You will be the first!</p>
                }
                {!this.state.isAuth
                    ? <p>Log In or Sign Up to leave a comment</p>
                    : <Form reply>
                        <Form.TextArea onChange={(e: any) => this.handleTextAreaChange(e)}
                                       value={this.state.textareaValue}
                                       placeholder={'Type your reply here'}
                        />
                        <Button content='Add Reply' labelPosition='left' icon='edit' primary
                                onClick={this.handleButtonClick}
                        />
                    </Form>
                }
            </Comment.Group>
        )
    }
}

const mapStateToProps = ({accountStore: {id, token}}: IStore) => ({id, token})

const Comments = connect(mapStateToProps)(_Comments)

export default Comments