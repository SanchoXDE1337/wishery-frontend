import React from 'react'
import {Card} from 'semantic-ui-react'

interface IProps {
    url?: string
    title: string
    author: string
    description?: string
    date?: string
}

const CardExampleLinkCard: React.FC<IProps> = ({title, author, description, url}) => {
    return (
        <Card
            href={url}
            header={title}
            meta={`${author}`}
            description={description}
            fluid
        />
    )
}

export default CardExampleLinkCard
