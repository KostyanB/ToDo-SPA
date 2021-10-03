import React, { useEffect } from 'react';
import { GlobalStyle } from './components/Styled/GlobalStyle';
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/Header';
import TodoList from './components/TodoList';
import { Preloader, ErrorLoad } from './components/Styled/Preloader';

import { fetchTodos, selectStatus, selectError } from './components/store/todoSlice';


function App() {
  const dispatch = useDispatch(),
    status = useSelector(selectStatus),
    error = useSelector(selectError);
  // get todos
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <>
      <GlobalStyle/>
        <Header/>
        <TodoList/>
        {error && <ErrorLoad>Упс! Ошибка "{error}"</ErrorLoad>}
        {(status === 'loading') && <Preloader/>}
    </>
  );
}
export default App;
