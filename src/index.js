import './styles.css';
import { Todo, TodoList } from './classes';
import { crearTodohtml } from './js/componentes';

export const todoList = new TodoList();

todoList.todos.forEach(crearTodohtml);



console.log('todos', todoList.todos);



