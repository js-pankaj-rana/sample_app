import { createContext } from 'react';

export interface IList {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

export interface IListData {
    data: IList[],
    pageNumber: number,
    limit: number,
    scrollPostitionTop: number,
    favorite: number[],
    screenHeight: number,
}

export interface AppContextType {
  listData: IListData;
  listUpdate: (list: IList[]) => void;  
  pageUpdate: () => void;  
  topPositionUpdate: (pos: number) => void;  
  favoriteUpdate: (list: number) => void;  
}

const defaultAppContext: AppContextType = {
  listData: {
    data: [],
    pageNumber: 1,
    limit: 10,
    scrollPostitionTop: 0,
    favorite: [],
    screenHeight: 0, 
  },
  listUpdate: (list) => {},
  pageUpdate: () => {},  
  topPositionUpdate: (pos) => {},
  favoriteUpdate: (list) => {},
  
};

export const AppContext = createContext<AppContextType>(defaultAppContext);
