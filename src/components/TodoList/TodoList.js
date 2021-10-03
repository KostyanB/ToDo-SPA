import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import env from '../../env.json';
import TodoItem from './TodoItem';
import { selectAllTodos } from '../store/todoSlice';

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 80px);
    padding: 5px 0;
    overflow: hidden;
    position: relative;
    margin-top: 80px;
    float: left;
`;
const ListWrap = styled.div`
    padding: 15px;
    overflow-y: auto;
    height: 100%;

    ::-webkit-scrollbar {
        width: 15px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${env.colors.valid};
        border-radius: 100px;
    }
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
        height: 2px;
        background: ${env.colors.valid};
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
            <ListWrap>
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
            </ListWrap>
        </Container>
    );
}
export default TodoList;