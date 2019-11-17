import React from 'react'
import {Button, Comment, Form, Header} from 'semantic-ui-react'
import Commentary from './Comment'

type TDataItem = {
    _id: string
    author: string
    description?: string
    title: string
}

interface IProps {
}

interface IState {
    // data: TDataItem[] | null
}


class Comments extends React.Component<IProps, IState> {

    render() {
        return (
            <Comment.Group>
                <Header as='h3' dividing>
                    Comments
                </Header>
                <Commentary/>
                <Form reply>
                    <Form.TextArea/>
                    <Button content='Add Reply' labelPosition='left' icon='edit' primary/>
                </Form>
            </Comment.Group>
        )
    }
}


export default Comments