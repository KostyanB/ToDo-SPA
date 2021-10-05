import React from 'react';
import { useDispatch } from 'react-redux';
import env from '../../env.json';
import Btn from './NavBtnStyle';
import { CheckIcon, UncheckIcon } from '../Icons/Icons';
import { toggleStatus } from '../store/todoSlice';


const NavBtnComplete = ({ id, completed }) => {
    const { valid, placeholder } = env.colors;
    const dispatch = useDispatch();
    const completer = () => dispatch(toggleStatus(id));

    return (
        <Btn onClick={completer}>
            {completed ?
                <CheckIcon name="Отменить" color1={valid} color2={placeholder} width={30} height={30}/>
                :
                <UncheckIcon name="Выполнить" color1={valid} width={30} height={30}/>
            }
        </Btn>
    );
}
export default NavBtnComplete;