import React from 'react';
import styled from 'styled-components';
import env from '../../env.json';
import { useEmptyColor } from './hooks/useEmptyColor';
import { useForm } from './hooks/useForm';
import { Context } from './Context';
import Form from './Form';

const Wrapper = styled.header`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    background-color: ${env.colors.valid};
    box-shadow: 0 2px 4px ${env.colors.shadow};
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
`;

const Header = () => {
    const emptyColor = useEmptyColor();
    const userForm = useForm();

    return (
        <Context.Provider value={{
            emptyColor,
            userForm
        }}>
            <Wrapper className={emptyColor.emptyColor}>
                <Form/>
            </Wrapper>
        </Context.Provider>
    )
}
export default Header;