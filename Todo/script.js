import * as Redux from "../node_modules/redux/dist/redux.browser.mjs";
import { ADD_TODO, REMOVE_TODO, DO_TODO } from "./Redux/TodoActionTypes.js";
import {
  AddTodoActionCreator,
  DoTodoActionCreator,
  RemoveTodoActionCreator,
} from "./Redux/TodoActionCreator.js";

const AddBtn = document.getElementById("AddTodoBtn");
const TodoInput = document.getElementById("TodoInput");
const taskContainer = document.getElementById("TodosContainer");

const TodoReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO: {
      return [
        ...state,
        { id: Date.now(), title: action.title, iscompeleted: false },
      ];
    }
    case DO_TODO: {
      let newState = [...state];
      newState.forEach((dotodo) => {
        if (dotodo.id == action.id) {
          dotodo.iscompeleted = !dotodo.iscompeleted;
        }
      });
      return newState
    }
    case REMOVE_TODO: {
      let newState = [...state];
      newState = newState.filter((todo)=>{
       return todo.id!=action.id
      })
      return newState;
    }
    default: {
      return state;
    }
  }
};

//todo Eventlistner function
const TodoCreatorEventFunc = () => {
  if (TodoInput.value != "") {
    let TaskInput = TodoInput.value;
    store.dispatch(AddTodoActionCreator(TaskInput));
    TodoInput.value = "";
    window.TodoInput.focus();
  }
};

// the store created
const store = Redux.createStore(TodoReducer);

//addTOdo eventListner dispatch the todo
AddBtn.addEventListener("click", () => {
  TodoCreatorEventFunc();
});

window.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    TodoCreatorEventFunc();
  }
});

//dotodo handler
const dotodoHandler = (id) => {
  store.dispatch(DoTodoActionCreator(id));
};

//remove todo handler 
const removetodo =(id)=>{
  store.dispatch(RemoveTodoActionCreator(id))
}

//li element creator
const liElementGenerator = (title, id, iscompeleted) => {
  return `
    <li onclick="dotodoHandler(${id})" class="border-b  transition-colors duration-300 border-gray-300 rounded-2xl mt-1 px-4 ${
    iscompeleted
      ? "bg-green-300 hover:bg-green-300"
      : " hover:bg-green-300"
  }  py-2 "><div class="flex justify-between items-center">
      <p>${title}</p>
        <span onclick="removetodo(${id})">
        <i  class="fa-solid fa-trash hover:text-red-500"></i>
        </span>
    </div>
    </li>
  `;
};
const RenderUI = () => {
  let todos = store.getState();
  taskContainer.innerHTML = "";
  todos.map((todo) =>
    taskContainer.insertAdjacentHTML(
      "beforeend",
      liElementGenerator(todo.title, todo.id, todo.iscompeleted)
    )
  );
};
store.subscribe(RenderUI);

window.dotodoHandler = dotodoHandler;
window.removetodo = removetodo;
