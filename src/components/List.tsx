import React, {useContext, useEffect, useState} from 'react';
import { Button, Col, Row, Spin, Typography } from 'antd';
import {AppContext} from './../context/appContext'
import './../asset/style.scss';
import { CardComponent } from './CardComponent';
import { useNavigate } from 'react-router-dom';
import ErrorWrapper from './ErrorWrapper';

const {Title} = Typography

 const List: React.FC = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');

  const { listData, topPositionUpdate, pageUpdate, listUpdate } = useContext(AppContext);
  const {data, limit, scrollPostitionTop, pageNumber, } = listData; 
  
  const getListCollection =  async (pageNumber, limit) => {
    if(data.length === (pageNumber * limit) ){
      return false;
    }


    const baseUrl = `https://jsonplaceholder.typicode.com/albums/1/photos?_page=${pageNumber};_limit=${limit}`;
    setLoader(true);
    try {
      const res = await fetch(baseUrl);
      const result = await res.json();

      if(result.length > 0){
        listUpdate(result);
      }
      else {
        throw Error("No page available");
      }
      setLoader(false);
    } 
    catch (error) {
      console.warn(error);
      setError(error.message);
      setLoader(false);
    }
  }

  const fetchApiOnScroll = () => {
     if(window.innerHeight + document.documentElement.scrollTop + 1 >=  document.documentElement.scrollHeight){
       pageUpdate();
    }
  };


  useEffect(  () => { 
    if(scrollPostitionTop > 0){
      document.documentElement.scrollTop = scrollPostitionTop;
    }
     if(data.length === ((pageNumber - 1) * limit)){
        getListCollection(pageNumber, limit);
     }
  }, [pageNumber])

  useEffect(() => {
      window.addEventListener('scroll', fetchApiOnScroll);
      return () => {
          window.removeEventListener('scroll', fetchApiOnScroll);
      };
  }, []);

  const backButton = () => {
    topPositionUpdate(document.documentElement.scrollTop);
    navigate('/');  
  } 

  return ( <ErrorWrapper>
    <div className='list-page'>
  <Button type='primary' className='btn' onClick={ backButton }>Back</Button>
  {error && <p className='text-danger'>Something went wrong</p>}
  <Title level={2}>Collection of Cards</Title>

  <Row gutter={16}>
    {
    data.map( (list) => (<Col key={list.id} className="gutter-row" span={6}>
        <CardComponent list={list} pageType='list' />
      </Col>
      )  
    )
   }
  {loader && <Col span={24}><div className='text-center'> <Spin /></div></Col>}
  </Row>
  
  </div>
  </ErrorWrapper>
)
};

export default List;
 