import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import env from '../../env.json';
import { TrashIcon, CheckIcon, UncheckIcon, EditIcon, ShareIcon } from '../Icons/Icons';

import { deleteTodo, toggleStatus } from '../store/todoSlice';

const Nav = styled.nav`
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding-left: 15px;
`;
const Btn = styled.button`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
`;

const TodoNav = ({ id, completed, handleDisableEdit, disableEdit, handleEdit }) => {

    const { valid, placeholder } = env.colors;

    const dispatch = useDispatch();

    const remover = () => dispatch(deleteTodo(id));
    const completer = () => dispatch(toggleStatus(id));

    return (
    <Nav key={id}>
        { disableEdit &&
            <Btn onClick={handleDisableEdit}>
                <EditIcon name="Редактировать" color1={valid} width={30} height={30}/>
            </Btn>
        }
        { !disableEdit &&
            <Btn type="submit" form="todo_form" onClick={handleEdit}>
                <ShareIcon name="Отправить" color1={valid} width={30} height={30}/>
            </Btn>
        }
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
