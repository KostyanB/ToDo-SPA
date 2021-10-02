import React, { useEffect } from 'react';
import './App.scss';
import { GlobalStyle } from './components/Styled/GlobalStyle';
import { Context } from './components/functions/Context';
import { useDispatch, useSelector } from 'react-redux';
// import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';

import Header from './components/Header';
import Main from './components/Main';


import { fetchTodos,
    selectTodosEntities,
    selectAllTodos,
    addNewTodo,
    deleteTodo,
    editTodo,
    toggleStatus,
    updateTodo
  } from './components/store/todoSlice';


function App() {
  const dispatch = useDispatch();
  const entities = useSelector(selectTodosEntities);

  // get todos
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // todo handlers
  const remover = () => dispatch(deleteTodo(4));
  const adder = () => dispatch(addNewTodo('new todo text'));
  const completer = () => dispatch(toggleStatus(1));
  // const completer = () => dispatch(updateTodo({id: 1, changes: { completed: !entities[1].completed }}));
  const editor = () => dispatch(editTodo({ id: 1, text:  'new text todododo' }));
  //const editor = () => dispatch(updateTodo({ id: 1, changes: { title: 'new text todododo' } }))

  return (
    <Context.Provider value={{

    }}>
      <GlobalStyle/>
      <div className="App">
        <Header/>
        <button onClick={remover}>delete</button>
        <button onClick={adder}>add</button>
        <button onClick={completer}>complete</button>
        <button onClick={editor}>edit</button>

      </div>
    </Context.Provider>
  );
}
export default App;
