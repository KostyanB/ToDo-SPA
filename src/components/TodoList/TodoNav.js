import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import env from '../../env.json';
import Icons from '../Styled/Icons';

import { deleteTodo, editTodo, toggleStatus } from '../store/todoSlice';


const Nav = styled.nav`
    width: 120px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Btn = styled.button`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    :first-of-type:before {
        content: '';
        width: 2px;
        height: 30px;
        background: #edf0f1;
        position: absolute;
        top: 10px;
        left: -10px;
    }
`;

const TodoNav = ({ id, text, completed }) => {

    const dispatch = useDispatch();
    const removeBtn = useRef(),
        completeBtn = useRef(),
        editBtn = useRef();

    const remover = () => dispatch(deleteTodo(id));
    const completer = () => {
        dispatch(toggleStatus(id));
    }
        const editor = (id, text) => dispatch(editTodo({ id: id, text:  text }));

    return (
    <Nav key={id}>
        <Btn onClick={editor}><Icons name="pencil" width={30} height={30}/></Btn>
        <Btn onClick={completer}><Icons name={completed ? "check" : "uncheck"} width={30} height={30}/></Btn>
        <Btn onClick={remover}><Icons name="trash" width={30} height={30}/></Btn>
    </Nav>
    );
}
export default TodoNav;
