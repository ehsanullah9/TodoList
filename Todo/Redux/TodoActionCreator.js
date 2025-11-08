import { ADD_TODO, DO_TODO, REMOVE_TODO } from "./TodoActionTypes.js";

const AddTodoActionCreator = (title) => {
  return {
    type: ADD_TODO,
    title,
  };
};

const DoTodoActionCreator = (id)=>{
    return{
        type:DO_TODO,
        id
    }
}


const RemoveTodoActionCreator = (id) => {
  return {
    type: REMOVE_TODO,
    id,
  };
}; 

export{RemoveTodoActionCreator , DoTodoActionCreator , AddTodoActionCreator}