import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import env from '../../env.json';
// import { useDisableEdit } from './useDisableEdit';
// store
import { editTodo } from '../store/todoSlice';
//components
// import TodoNav from './TodoNav';
import NavStyle from './NavStyle';
import NavBtnEdit from './NavBtnEdit';
import NavBtnComplete from './NavBtnComplete';
import NavBtnDelete from './NavBtnDelete';

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

    &:last-of-type {
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
    // const { disableEdit, setDisableEdit } = useDisableEdit();
    // console.log('disableEdit: ', disableEdit);
    const [ disableEdit, setDisableEdit ] = useState(true);
    const [ inputValue, setInputValue ] = useState(text);

    const dispatch = useDispatch();
    const input = useRef(null);

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

    // const focusInput = () => input.current.focus();

    const handleDisableEdit = () => {
        setDisableEdit(false);
        input.current.focus();
        // focusInput();
    };

    return (
        <Item>
            <Form onSubmit={handleEdit} id={`todo_form${id}`}>
                <Text ref={input}
                    value={inputValue}
                    disabled={disableEdit}
                    onChange={changeInput}
                    onBlur={handleEdit}
                />
            </Form>
            {/* <TodoNav id={id}
                completed={completed}
                handleDisableEdit={handleDisableEdit}
                disableEdit={disableEdit}
                form={`todo_form${id}`}
                input={input}
            /> */}
            <NavStyle key={`nav${id}`}>
                <NavBtnEdit form={`todo_form${id}`} input={input} handleDisableEdit={handleDisableEdit} disableEdit={disableEdit}/>
                <NavBtnComplete id={id} completed={completed}/>
                <NavBtnDelete id={id}/>
            </NavStyle>
        </Item>
    );
}
export default TodoItem;