import React from 'react';
import { useDispatch } from 'react-redux';
import env from '../../env.json';
import Btn from './NavBtnStyle';
import { TrashIcon } from '../Icons/Icons';
import { deleteTodo } from '../store/todoSlice';

const NavBtnDelete = ({ id }) => {
    const dispatch = useDispatch();
    const remover = () => dispatch(deleteTodo(id));

    return (
        <Btn onClick={remover}>
            <TrashIcon name="Удалить" color1={env.colors.valid} width={30} height={30}/>
        </Btn>
    );
}
export default NavBtnDelete;