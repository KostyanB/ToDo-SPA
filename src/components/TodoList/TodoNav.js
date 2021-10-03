import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import env from '../../env.json';
import { TrashIcon, CheckIcon, UncheckIcon } from '../Icons/Icons';

import { deleteTodo, toggleStatus } from '../store/todoSlice';

const Nav = styled.nav`
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
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
        background: ${env.colors.valid};
        position: absolute;
        top: 10px;
        left: -10px;
    }
`;

const TodoNav = ({ id, text, completed }) => {

    const { valid, placeholder } = env.colors;

    const dispatch = useDispatch();

    const remover = () => dispatch(deleteTodo(id));
    const completer = () => dispatch(toggleStatus(id));
    // const editor = (id, text) => dispatch(editTodo({ id: id, text:  text }));

    return (
    <Nav key={id}>
        {/* <Btn onClick={editor}>
            <PencilIcon name="Редактировать" color1={valid} width={30} height={30}/>
        </Btn> */}
        <Btn onClick={completer}>
            {completed ?
                <CheckIcon name="Отменить" color1={valid} color2={placeholder} width={30} height={30}/>
                :
                <UncheckIcon name="Выполнить" color1={valid} width={30} height={30}/>
            }
        </Btn>
        <Btn onClick={remover}>
            <TrashIcon name="Удалить" color1={valid} width={30} height={30}/>
        </Btn>
    </Nav>
    );
}
export default TodoNav;
