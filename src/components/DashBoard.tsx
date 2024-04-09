import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Button, Col, Row, Typography } from 'antd';
import { CardComponent } from './CardComponent';
import { AppContext } from '../context/appContext';
import ErrorWrapper from './ErrorWrapper';


const DashBoard: React.FC = () => {
    
    const {Title} = Typography;
    const {listData} = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, [listData])

    return (
        <ErrorWrapper>
            <>
        <Button type="primary" onClick={() => navigate('/list')}>Go to List Page</Button>
        
        <Title level={2}>List of Favorite Cards</Title>
        <Row gutter={16} style={{minHeight: '60vh'}}>
            {
                listData.data.length > 0 && listData.data.map( (list) =>
                    {
                        const {id} = list;
                        if(listData.favorite.includes(id)){
                            return (<Col key={id} className="gutter-row" span={6}>
                            <CardComponent list={list} pageType='dash' />
                            </Col>
                            )
                        }
                        return;
                }  
                )}
                { listData.data.length === 0 && <Col span={24}><p>No favorite list found</p></Col>}
        </Row>
        </>
    </ErrorWrapper>  
    
  );
};

export default DashBoard;