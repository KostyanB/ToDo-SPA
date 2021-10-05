import React from 'react';
import env from '../../env.json';
import Btn from './NavBtnStyle';
import { EditIcon, ShareIcon } from '../Icons/Icons';

const NavBtnEdit = ({ form, disableEdit, handleDisableEdit }) => (
    <>
    { disableEdit &&
        <Btn onClick={handleDisableEdit}>
            <EditIcon name="Редактировать" color1={env.colors.valid} width={30} height={30}/>
        </Btn>
    }
    { !disableEdit &&
        <Btn type="submit" form={form}>
            <ShareIcon name="Отправить" color1={env.colors.valid} width={30} height={30}/>
        </Btn>
    }
    </>
)
export default NavBtnEdit;