import React from 'react';
import axios from "axios";
import CardExampleLinkCard from "../../../components/Card/Card";

interface IProps {
}

type TDataItem = {
    _id: string
    author: string
    description?: string
    title: string
    date?: string
}

interface IState {
    data: TDataItem[] | null
}


class Home extends React.Component<IProps, IState> {
    state = {
        data: []
    }

    async componentDidMount() {
        const data = (await axios(`http://localhost:8080/`)).data
        data.reverse()
        this.setState({data})
    }

    render() {
        return (
            <>
                {this.state.data.map((obj: TDataItem) =>
                    <CardExampleLinkCard
                        author={obj.author}
                        url={`/posts/${obj._id}`}
                        // date={obj.date}
                        title={obj.title}
                        key={obj.author + obj.description + obj.title}
                    />
                )}
            </>
        )
    }
}

export default Home