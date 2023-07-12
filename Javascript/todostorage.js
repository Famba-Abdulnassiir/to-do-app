let addBtn = document.querySelector('.todo-btn');
let todoInput = document.querySelector('.todo-input');
let todoList = document.querySelector('#todoList');

//On page load retrieve tasks on the page
window.addEventListener('load', function () {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
        storedTodos.forEach(function (todoItem) {
            addTodoToList(todoItem);
        });
    }
});


function addTodo() {
    const todoItem = todoInput.value.trim();
    if (todoItem !== '') {
        addTodoToList(todoItem);

        // Save tasks to storage
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        storedTodos.push(todoItem);
        localStorage.setItem('todos', JSON.stringify(storedTodos));

        todoInput.value = '';
    }
}

function addTodoToList(todoItem) {
    const toDo = document.createElement('li');
    toDo.innerText = todoItem;
    todoList.appendChild(toDo);

    // Create a delete button for each task
    const deleteBtn = document.createElement('i');
    deleteBtn.classList.add("fa-trash");
    deleteBtn.classList.add("fa-solid");
    deleteBtn.addEventListener('click', function () {

        // Remove the task from the task list
        todoList.removeChild(toDo);

        // Update the tasks in storage
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        const updatedTodos = storedTodos.filter(function (toDo) {
            return toDo !== todoItem;
        });
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    });
    toDo.appendChild(deleteBtn);

}
