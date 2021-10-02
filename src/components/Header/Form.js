import React, { useRef, useContext } from 'react';
import styled from 'styled-components';
import env from '../../env.json';
import Icons from '../Styled/Icons';
import { HeaderContext } from './HeaderContext';
import { useDispatch } from 'react-redux';
import { addNewTodo } from '../store/todoSlice';

const FormWrap = styled.form`
    width: 100%;
    padding: 15px;
`;
const Input = styled.input`
    width: 100%;
    height: 50px;
    color: ${env.colors.placeholder};
    font-size: 15px;
    font-weight: 400;
    text-indent: 18px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px 25px 25px 5px;
    border: 0;
    box-shadow: none;
    outline: none;

    -webkit-appearance: none;
    -moz-appearance: none;

    ::-webkit-input-placeholder {
        color: ${env.colors.placeholder};
    }

    :-ms-input-placeholder {
        color: ${env.colors.placeholder};
    }
`;
const Button = styled.button`
    width: 40px;
    height: 40px;
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 2;
    border-radius: 25px;
    border: 0;
    background: none;

    svg {
        fill: ${env.colors.valid};
    }
`;

const Form = () => {

    const { initTitle, initHolder, emptyHolder } = env.formElem;
    const inputRef = useRef();
    const dispatch = useDispatch();
    const {
        emptyColor: { setEmptyColor },
        userForm: { form, setForm }
    } = useContext(HeaderContext);

    const handleSubmit = e => {
        e.preventDefault();
        const { title } = form;
        if (!title.trim()) {
            setForm({...form, holder: emptyHolder });
            setEmptyColor('empty');
            return;
        } else {
            setEmptyColor('');
        }
        // input value  -> store
        dispatch(addNewTodo(title));
        // reset input
        setForm({title: initTitle, holder: initHolder});
    };

    const changeInputHandler = input => {
        // e.persist();
        setForm(prev => ({...prev, ...{
            //динамический ключ
            [input.current.name]: input.current.value
        }}));
    };

    return (
        <FormWrap onSubmit={handleSubmit}>
                <Input type="text"
                    id="title"
                    placeholder={form.holder}
                    value={form.title}
                    name="title"
                    onChange={() => changeInputHandler(inputRef)}
                    ref={inputRef}
                />
            <Button>
                <Icons name="plus" width={40} height={40}/>
            </Button>
        </FormWrap>
    );
}
export default Form;