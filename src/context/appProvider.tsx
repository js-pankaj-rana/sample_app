import React, { useState } from 'react';
import { AppContext, IList, IListData } from './appContext';

interface Props {
    children: React.ReactNode;
  }

export const AppProvider: React.FC<Props> = ({ children }) => {

    const [listData, setListData] = useState<IListData>({ 
        data: [],
        pageNumber: 1,
        limit: 10,
        scrollPostitionTop: 0,
        favorite: [],
        screenHeight: document.documentElement.clientHeight,
      });

       const listUpdate = (responseData: IList[]) => {
        setListData({
            ...listData,
            data: [ ...listData.data, ...responseData]
          })
        }
      const pageUpdate = () => {
        setListData( prev => ({
            ...prev,
            pageNumber: prev.pageNumber + 1,
            scrollPostitionTop: document.documentElement.scrollTop
          })
        )
      } 

      const topPositionUpdate = (pos: number) => {
        setListData(
          {
            ...listData,
            scrollPostitionTop: pos
          }
        )
      }

      const favoriteUpdate = (favorite: number ) => {

        if(listData.favorite.includes(favorite) ){
          const updatedFavList = listData.favorite.filter( (id) =>  id !== favorite)
          setListData(
            {
              ...listData,
              favorite: [
                ...updatedFavList
              ]
            }
          )  
        }
        else {
          setListData(
            {
              ...listData,
              favorite: [
                ...listData.favorite,
                favorite
              ]
            }
          )
        }
       }

    return (
      <AppContext.Provider value={{ listData, topPositionUpdate, pageUpdate, listUpdate, favoriteUpdate }}>
        {children}
      </AppContext.Provider>
    );
  };
  