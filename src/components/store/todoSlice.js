import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import env from '../../env.json';
//! keyGen для id (+ раскомментировать стр. 106)
// import { keyGen } from '../functions/keyGen';
//! или использовать date now для id (стр. 107)

const { initStatus, initError } = env.todosInitialState;
const { dbUrl, limit } = env.backend;

const todosAdapter = createEntityAdapter();
// получение с сервера
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(`${dbUrl}?_limit=${limit}`);

            if(!response.ok) throw new Error('Server error');

            const result = await response.json();
            dispatch(setTodo(result));
            return result;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
// удаление
export const deleteTodo = createAsyncThunk(
    // for edit use in App dispatch(deleteTodo(id))
    'todos/deleteTodo',
    async (id, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(`${dbUrl}/${id}`, {
                method: 'DELETE',
            });

            if(!response.ok) throw new Error(`Can't delete todo. Server error`);

            dispatch(removeTodo(id));

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
// изменение статуса
export const toggleStatus = createAsyncThunk(
    // for edit use in App dispatch(toggleStatus(id))
    'todos/toggleStatus',
    async (id, {rejectWithValue, dispatch, getState}) => {
        const todo = getState().todos.entities[id];

        try {
            const response = await fetch(`${dbUrl}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    completed: !todo.completed,
                })
            });

            if(!response.ok) throw new Error(`Can't toggle status. Server error`);

            const result = await response.json();
            dispatch(updateTodo({id: result.id, changes: { completed: result.completed }}));

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
// редактирование
export const editTodo = createAsyncThunk(
    // for edit use in App dispatch(editTodo({ id, text }))
    'todos/editTodo',
    async ({id, text}, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(`${dbUrl}/${id}`, {
                method: 'PATH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    title: text,
                })
            });

            if(!response.ok) throw new Error(`Can't edit todo. Server error`);

            const result = await response.json();
            dispatch(updateTodo({id: result.id, changes: { title: result.title }}));

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
// добавление
export const addNewTodo = createAsyncThunk(
    // for add use in App dispatch(addTodo('text'))
    'todos/addNewTodo',
    async (text, {rejectWithValue, dispatch}) => {
        try {
            const todo = {
                // id: keyGen(), // use keyGen for generate id
                // id: Date.now().toString(), // use date for generate id
                title: text,
                completed: false,
                userId: 1
            }

            const response = await fetch(dbUrl, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(todo)
            });

            if(!response.ok) throw new Error(`Can't add todo. Server error`);

            const result = await response.json();
            dispatch(addTodo({id: result.id, title: result.title, completed: result.completed, userId: result.userId }));

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
// формирование ошибки
const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
};

// ******************************************
// создаем slice
const todoSlice = createSlice({
    name: 'todos',
    initialState: todosAdapter.getInitialState({
        status: initStatus,
        error: initError
    }),
    reducers: {
        setTodo: todosAdapter.setAll,
        // use: dispatch(setTodo)
        addTodo: todosAdapter.addOne,
        // use: dispatch(addTodo({ id: id, ... all added fields: 'values' }))
        removeTodo: todosAdapter.removeOne,
        // use: dispatch(removeTodo(id))
        updateTodo: todosAdapter.updateOne,
         // use: dispatch(editTodo({ id: id, changes: { updated field: 'new value' } }))
    },
    extraReducers: {
        [ fetchTodos.pending ]: state => {
            state.status = 'loading';
            state.error = null;
        },
        [ fetchTodos.fulfilled ]: state => {
            state.status = 'success';
            state.error = null;
        },
        [ fetchTodos.rejected ]: setError,
        [ deleteTodo.rejected ]: setError,
        [ toggleStatus.rejected ]: setError,
        [ editTodo.rejected ]: setError,
        [ addNewTodo.rejected ]: setError,
    }
})

export const { setTodo, addTodo, removeTodo, editTitle, toggleComplete, updateTodo } = todoSlice.actions;

export const {
    selectIds: selectTodosIds,
    selectEntities: selectTodosEntities,
    selectAll: selectAllTodos,
    selectTotal: selectTotalTodos,
} = todosAdapter.getSelectors((state) => state.todos);

export const selectStatus = state => state.todos.status;
export const selectError = state => state.todos.error;

export default todoSlice.reducer;