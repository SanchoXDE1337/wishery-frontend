import React from 'react'
import { Card } from 'semantic-ui-react'

interface IProps {
    title: string
    author: string
    description:string
}
const CardExampleLinkCard: React.FC<IProps> = ({title, author, description}) => (
    <Card
        // href='/'
        header={title}
        meta={author}
        description={description}
        fluid
    />
)

export default CardExampleLinkCard
