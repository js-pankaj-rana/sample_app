import React, { useContext } from "react"
import { AppContext, IList} from './../context/appContext'
import { HeartFilled } from '@ant-design/icons';
import { Avatar, Button, Card } from 'antd';

const { Meta } = Card;


interface IListProps {
    pageType: string,
    list: IList
}

export const CardComponent: React.FC<IListProps> = ({ pageType, list }) => { 
    const {id, title, thumbnailUrl } = list; 
    const { favoriteUpdate, listData } = useContext(AppContext)
    const {favorite} = listData;
    
    return <Card
                style={{ width: 300 }}
                cover={
                <img alt="example" src={thumbnailUrl} />
                }
                actions={[
                <Button
                    disabled={ pageType === 'dash' }
                    onClick={ () => favoriteUpdate(id)}>    
                    <HeartFilled 
                        style={{
                            color: favorite.includes(id) ? 'red' : ''
                        }}
                    key="favioutie"/>
                </Button>,
                ]}  
            >
                <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title={`Card title ${id}`}
                description={title}
                />
            </Card>}