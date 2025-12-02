export interface Player {
  id: number;
  name: string;
  number: number;
  position: '前锋' | '中场' | '后卫' | '门将';
  nationality: string;
  image: string;
  bio: string;
  stats: {
    goals: number;
    assists: number;
    appearances: number;
  };
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  summary: string;
  image: string;
  author: string;
}

export interface Match {
  opponent: string;
  date: string;
  time: string;
  venue: '主场' | '客场';
  price: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}