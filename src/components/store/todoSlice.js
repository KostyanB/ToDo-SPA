import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import env from '../../env.json';
import { keyGen } from '../functions/keyGen';

const { initTodos, initStatus, initError } = env.todosInitialState;
const { dbUrl } = env.backend;

const todosAdapter = createEntityAdapter();

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (_, rejectWithValue) => {
        try {
            const response = await fetch(`${dbUrl}?_limit=20`);
            if(!response.ok) throw new Error('Server error');
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteTodo = createAsyncThunk(
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

export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus',
    async (id, {rejectWithValue, dispatch, getState}) => {
        const todo = getState().todos.entities[id];
        try {
            const response = await fetch(`${dbUrl}/${id}`, {
                method: 'PATH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    completed: !todo.completed,
                })
            });
            if(!response.ok) throw new Error(`Can't toggle status. Server error`);
            const result = await response.json();
            // dispatch(toggleComplete(id));
            // dispatch(toggleComplete({id: result.id, changes: { completed: result.completed }}));
            dispatch(updateTodo({id: result.id, changes: { completed: result.completed }}));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
// for edit use dispatch(editTodo({ id, text }))
export const editTodo = createAsyncThunk(
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
            // dispatch(toggleComplete(id));
            // dispatch(editTitle({id: result.id, changes: { title: result.title }}));
            dispatch(updateTodo({id: result.id, changes: { title: result.title }}));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// for add use dispatch(addTodo(text))
export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async (text, {rejectWithValue, dispatch}) => {
        try {
            const todo = {
                // id: keyGen(), // use if server not generated id
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
            // dispatch(toggleComplete(id));
            // dispatch(editTitle({id: result.id, changes: { title: result.title }}));
            dispatch(addTodo({id: result.id, title: result.title, completed: result.completed, userId: result.userId }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
};

const todoSlice = createSlice({
    name: 'todos',
    initialState: todosAdapter.getInitialState({
        status: initStatus, error: initError
    }),

    reducers: {
        // use: dispatch(addTodo({ id: id, ... all added fields: 'values' }))
        addTodo: todosAdapter.addOne,

        // addTodo: (state, action) => {
        //     todosAdapter.addOne(state, {
        //         id: keyGen(),
        //         title: action.payload,
        //         completed: false
        //     });
        // },
        removeTodo: todosAdapter.removeOne,
        // use: dispatch(removeTodo(id))
        // removeTodo: (state, action) => {
        //     state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        // },
        updateTodo: todosAdapter.updateOne,
         // use: dispatch(editTodo({ id: id, changes: { updated field: 'new value' } }))
        editTitle: todosAdapter.updateOne,
        // use: dispatch(editTodo({ id: id, changes: { title: 'new text' } }))
        // toggleComplete: (state, action) => {
        //     todosAdapter.updateOne(state, { id: action.payload, changes: { completed: !state.entities[action.payload].completed }});
        // }
        toggleComplete: todosAdapter.updateOne,
        // use dispatch(toggleComplete(id))
    },
    extraReducers: {
        [ fetchTodos.pending ]: state => {
            state.status = 'loading';
            state.error = null;
        },
        [ fetchTodos.fulfilled ]: (state, action) => {
            state.status = 'success';
            state.error = null;
            todosAdapter.setAll(state, action.payload);
        },
        [ fetchTodos.rejected ]: setError,
        [ deleteTodo.rejected ]: setError,
        [ toggleStatus.rejected ]: setError,
    }
})

export const { addTodo, removeTodo, editTitle, toggleComplete, updateTodo } = todoSlice.actions;

export const {
    selectIds: selectTodosIds,
    selectEntities: selectTodosEntities,
    selectAll: selectAllTodos,
    selectTotal: selectTotalTodos,
} = todosAdapter.getSelectors((state) => state.todos);

export const selectStatus = state => state.todos.status;
export const selectError = state => state.todos.error;

export default todoSlice.reducer;