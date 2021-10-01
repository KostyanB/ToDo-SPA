
export const getTodo = () => JSON.parse(localStorage.getItem('todoList'));
export const setTodo = data => localStorage.setItem('todoList', JSON.stringify(data));
export const clearTodo = () => localStorage.removeItem('todoList');