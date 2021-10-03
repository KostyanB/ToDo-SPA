import React from 'react';
import styled from 'styled-components';
import env from '../../env.json';

import TodoNav from './TodoNav';

// styled components
const Item = styled.li`
    width: 100%;
    min-height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: #444;
    line-height: 22px;
    background: #fff;
    border-radius: 5px;
    position: relative;
    box-shadow: 0 1px 2px ${env.colors.valid};
    margin: 0 0 10px 0;
    padding: 14px;
    word-break: break-word;

    :last-of-type {
        margin: 0;
    }
`;
//********************************
const TodoItem = ({ id, text, completed }) => {

    return (
        <Item>
            <span>{text}</span>
            <TodoNav id={id} text={text} completed={completed}/>
        </Item>

    );
}
export default TodoItem;