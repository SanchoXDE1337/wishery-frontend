import {Comment} from "semantic-ui-react";
import React from "react";


interface IProps {
    author?: string
    text?: string
    time?: string
}

const Commentary: React.FC<IProps> = ({author, text, time}) => (
    <Comment>
        <Comment.Content>
            <Comment.Author as='a'>{author}</Comment.Author>
            <Comment.Metadata>
                <div>{time}</div>
            </Comment.Metadata>
            <Comment.Text>{text}</Comment.Text>
        </Comment.Content>
    </Comment>
)
export default Commentary