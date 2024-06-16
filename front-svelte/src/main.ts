import './app.css'
import App from './App.svelte'

export interface IMovie {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  genre: string;
}
export enum ETestType {
  STATIC,
  LIST,
  TREE
}

export interface IState {
  isShow: boolean;
  testType: ETestType;
  itemsCount: number;
}

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
export const LOAD_MOVIES_COUNT = 128;
export const MAX_ITEMS_COUNT = 50000;

export const MAX_TREE_DEEP = 14;

const app = new App({
  target: document.getElementById('app')!,
})

export default app
