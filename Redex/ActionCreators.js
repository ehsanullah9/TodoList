import { addTodoAction,removeTodoAction,doTodoAction } from "./ActionTypes"

const addTodoActionCreator = (title)=>{return {type:addTodoAction , title}}
const doTodoActionCreator = (id)=>{return{type:doTodoAction,id}}
const removeTodoActionCreator =(id)=>{return{type:removeTodoAction,id}}

export{removeTodoActionCreator,doTodoActionCreator,addTodoActionCreator}