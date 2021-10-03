import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

import { useSelector } from 'react-redux';
import { selectAllTodos } from '../store/todoSlice';

const Container = styled.div`
    width: 100%;
    padding: 15px;
    margin-top: 80px;
`;
const List = styled.ul`
    width: 100%;

    :after {
        width: 100%;
        display: block;
        text-align: center;
        font-size: 12px;
        color: #aaa;
    }
`;
const MainList = styled(List)`

    :empty:after {
        content: 'Нет задач';
        margin: 15px 0 0 0;
    }
`;
const CompleteList = styled(List)`
    position: relative;
    padding: 60px 0 0 0;
    :before {
        content: '';
        width: 150px;
        height: 1px;
        background: #d8e5e0;
        position: absolute;
        top: 30px;
        left: 50%;
        margin: 0 0 0 -75px;
    }
    :empty:after {
        content: 'Нет выполненых задач';
    }
`;
//*********************************
const TodoList = () => {
    const todos = useSelector(selectAllTodos);
    const noCompletedTodos = todos.filter(item => !item.completed);
    const completedTodos = todos.filter(item => item.completed);

    return (
        <Container>
            <MainList>
                {noCompletedTodos.map(item =>
                    <TodoItem key={item.id} id={item.id} text={item.title} completed={false}/>
                )}
            </MainList>
            <CompleteList>
                {completedTodos.map(item =>
                    <TodoItem key={item.id} id={item.id} text={item.title} completed={true}/>
                )}
            </CompleteList>
        </Container>
    );
}
export default TodoList;