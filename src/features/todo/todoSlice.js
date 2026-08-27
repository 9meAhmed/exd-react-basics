import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todoList: [],
    completedCount: 0,
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload);    
        },
        updateStatus: (state, action) => {
            const { index, completed } = action.payload;
            if (index >= 0 && index < state.todoList.length) {
                state.todoList[index].completed = completed;
            }
        },
        clearCompleted: (state) => {
            if(state.todoList.some(todo => todo.completed)) {
                state.todoList = state.todoList.filter(todo => !todo.completed);
            }
        }
    },
    selectors: {
        selectCompletedCount: (sliceState) => sliceState.todoList.filter(todo => todo.completed).length,
        selectTotalCount: (sliceState) => sliceState.todoList.length,
    }
});

export const { selectCompletedCount, selectTotalCount } = todoSlice.selectors;
export const { addTodo, updateStatus, clearCompleted } = todoSlice.actions;
export default todoSlice.reducer;