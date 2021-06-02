import * as React from 'react';
import { ITodoData } from '../types';

interface IState {
  toDos: ITodoData[];
  searchString: string
};

interface IActionCreator {
  type: string;
  data: any;
};

type IDispatch = ({ type, data }: IActionCreator) => null | void;

type IReducer = (state: IState, action: IActionCreator) => IState;

interface IActionType {
  ADD_NEW_CARD: string;
  SET_TODOS: string;
  SET_SEARCH: string;
  UPDATE_CARD_COLUMN: string;
};

const getTodos = (): ITodoData[] => {
    const todoString = localStorage.getItem('toDos');
    let todos: ITodoData[] = [];
    if(todoString) {
        todos = JSON.parse(todoString);
    };
    return todos;
}

const setTodos = (data: ITodoData[]) => localStorage.setItem('toDos', JSON.stringify(data));

const initialState: IState = {
  toDos: getTodos(),
  searchString: ''
};

export const actionType: IActionType = {
  ADD_NEW_CARD: 'ADD_NEW_CARD',
  UPDATE_CARD_COLUMN: 'UPDATE_CARD_COLUMN',
  SET_TODOS: 'SET_TODOS',
  SET_SEARCH: 'SET_SEARCH'
};

const reducer: IReducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_TODOS:
      setTodos(action.data)
      return {
        ...state,
        toDos: action.data,
      };
    case actionType.UPDATE_CARD_COLUMN:
      const toDosCopy = Array.from(state.toDos);
      const cardToUpdate = toDosCopy[action.data.originalIdx].rows[action.data.cardIdx]
      toDosCopy[action.data.originalIdx].rows.splice(action.data.cardIdx, 1)
      toDosCopy[action.data.nextIdx].rows.unshift(cardToUpdate)
      setTodos(toDosCopy)
      return {
        ...state,
        toDos: toDosCopy,
      };
    case actionType.ADD_NEW_CARD:
      const cloned = Array.from(state.toDos);
      const itemIndex = action.data.columnIndex;
      const updatedColumn = cloned[itemIndex];
      updatedColumn.rows.push(action.data.newCard);
      cloned[itemIndex] = updatedColumn;
      setTodos(cloned)
      return {
        ...state,
        toDos: cloned
      };
    case actionType.SET_SEARCH:
      return {
        ...state,
        searchString: action.data
      };
    default:
      return state;
  }
};

export const AppStateContext = React.createContext<IState | undefined>(initialState);
export const AppDispatchContext = React.createContext<IDispatch | undefined>(
  undefined
);

export function useAppState() {
  const state = React.useContext(AppStateContext);

  if (state === undefined) {
    throw new Error('You can only use useAppState inside a context provider');
  }

  return state;
};

export function useAppDispatch() {
  const dispatch = React.useContext(AppDispatchContext);

  if (dispatch === undefined) {
    throw new Error(
      'You can only use useAppDispatch inside a context provider'
    );
  };

  return dispatch;
};

export function AppProvider({ children }: { children: any }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};
