import React, { useEffect } from 'react';
import './App.scss';
import { Context } from './components/functions/Context';
import { useDispatch, useSelector } from 'react-redux';
// import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';

// import { fetchGoods, selectGoods, selectStatus, selectError } from './components/store/goodsListSlice';
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

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const remover = () => dispatch(deleteTodo(4));

  const adder = () => dispatch(addNewTodo('new todo text'));

  const completer = () => {
    dispatch(toggleStatus(1));
    // dispatch(updateTodo({id: 1, changes: { completed: !entities[1].completed }}));
  }

  const editor = () => {
    dispatch(editTodo({ id: 1, text:  'new text todododo' }));
    // dispatch(updateTodo({ id: 1, changes: { title: 'new text todododo' } }))
  }
  return (
    <Context.Provider value={{

    }}>
      <div className="App">
        <button onClick={remover}>delete</button>
        <button onClick={adder}>add</button>
        <button onClick={completer}>complete</button>
        <button onClick={editor}>edit</button>

      </div>
    </Context.Provider>
  );
}
export default App;
