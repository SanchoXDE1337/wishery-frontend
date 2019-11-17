import React from 'react'
import { Card } from 'semantic-ui-react'

interface IProps {
    url?: string
    title: string
    author: string
    description?:string
}
const CardExampleLinkCard: React.FC<IProps> = ({title, author, description, url}) => (
    <Card
        href={url}
        header={title}
        meta={author}
        description={description}
        fluid
    />
)

export default CardExampleLinkCard
