import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import env from '../../env.json';
// store
import { editTodo } from '../store/todoSlice';
//components
import TodoNav from './TodoNav';

// styled components
const Item = styled.li`
    width: 100%;
    min-height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-radius: 5px;
    position: relative;
    box-shadow: 0 1px 2px ${env.colors.valid};
    margin: 0 0 10px 0;
    padding: 14px;

    :last-of-type {
        margin: 0;
    }
`;
const Text = styled.input`
    width: 100%;
    background: none;
    border: none;
    word-break: break-word;
    font-size: 14px;
    font-weight: 500;
    color: #444;
    line-height: 22px;
`;
const Form = styled.form`
    width: 100%;
`;

//********************************
const TodoItem = ({ id, text, completed }) => {

    const [ disableEdit, setDisableEdit ] = useState(true);
    const [ inputValue, setInputValue ] = useState(text);

    const dispatch = useDispatch();
    const input = useRef();

    useEffect(() => setInputValue(text), [text]);
    // отправка для редактирования
    const handleEdit = e => {
        e.preventDefault();
        const newText = input.current.value;

        if (!newText.trim()) {
            setInputValue(text);
            setDisableEdit(true);
            return;
        };

        dispatch(editTodo({ id: id, text: newText }))
        setDisableEdit(true);
    }

    const changeInput = e => {
        e.persist();
        setInputValue(e.target.value)
    };

    const handleDisableEdit = () => {
        setDisableEdit(false);
    };

    return (
        <Item>
            <Form onSubmit={handleEdit} id="todo_form">
                <Text ref={input}
                    value={inputValue}
                    disabled={disableEdit}
                    onChange={changeInput}
                    onBlur={handleEdit}
                />
            </Form>
            <TodoNav id={id}
                completed={completed}
                handleDisableEdit={handleDisableEdit}
                disableEdit={disableEdit}
                handleEdit={handleEdit}
            />
        </Item>

    );
}
export default TodoItem;