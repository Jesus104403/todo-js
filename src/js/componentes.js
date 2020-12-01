import {Todo} from '../classes';
import { todoList}  from '../index';

//Referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodohtml = ( todo ) => {


    const htmlTodo = `<li class="${ (todo.completed) ?'completed' : '' }" data-id="${ todo.id }">
    <div class="view">
        <input class="toggle" type="checkbox" ${ (todo.completed) ?'checked' : '' } >
        <label>${ todo.task }</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
   </li> `;

   const div =document.createElement('div');
   div.innerHTML = htmlTodo;
             
   divTodoList.append( div.firstElementChild );

   return div.firstElementChild;


} 

    //Eventos
 txtInput.addEventListener('keyup', ( event ) => {  

   if(event.keyCode === 13 && txtInput.value.length > 0 ) {

    console.log(txtInput.value);
    const nuevoTodo = new Todo(txtInput.value);
    todoList.nuevoTodo(nuevoTodo);

    crearTodohtml( nuevoTodo);
    txtInput.value = '';

   }


 });

divTodoList.addEventListener('click', ( event ) =>{ 

    const nameElement = event.target.localName; // input, label, button
    const todoElement = event.target.parentElement.parentElement;
    const todoId      = todoElement.getAttribute('data-id');
    
   if( nameElement.includes('input') ){ // click en el cheack
    todoList.marcarCompletado( todoId);
    todoElement.classList.toggle('completed');


   } else if( nameElement.includes('button') ) { // hay que borrar el todo

    todoList.eliminarTodo( todoId );
    divTodoList.removeChild( todoElement );

   }

   console.log(todoList);

});


btnBorrar.addEventListener('click', () => {

    todoList.eliminaCompletados();

    for( let i = divTodoList.children.length-1; i >= 0; i--) {

        const element = divTodoList.children[i];

        if( element.classList.contains('completed') ){
            divTodoList.removeChild(element);
        }


    }



});

ulFiltros.addEventListener('click',(event)=> {


    const filtro = event.target.text;
    if(!filtro ){return;}

    anchorFiltros.forEach(elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for( const element of divTodoList.children ){

        element.classList.remove('hidden');
        const completado = element.classList.contains('completed');

        switch( filtro) {

            case'Pendientes':
                if(completado) {
                    element.classList.add('hidden');
                }
            break;   

            case'Completados':
                if(!completado) {
                    element.classList.add('hidden');
                }
            break;    

                 


        }

    }



})