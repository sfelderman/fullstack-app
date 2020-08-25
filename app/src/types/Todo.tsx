import { Key } from 'react';

export interface Todo {
  _id: Key;
  text: string;
  completed: boolean;
}
