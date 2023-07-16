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
        addTodoToList({ text: todoItem, completed: false });

        

        // Save tasks to storage
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        storedTodos.unshift({ text: todoItem, completed: false });
        localStorage.setItem('todos', JSON.stringify(storedTodos));

        todoInput.value = '';
    }
}

function addTodoToList(todoItem) {
    //Declare the design items we are going to use in our design 
    const toDo = document.createElement('li');
    const todoText = document.createElement('span');
    todoText.classList.add('text-span');
    const btnSpan = document.createElement('span');
    btnSpan.classList.add('btn-span');
    
    if(todoItem.completed){
        todoText.style.textDecoration='line-through'
    }

    //Lets create out checkbox for boolean completed task
    todoText.innerText = todoItem.text;
    const todoCheckbox = document.createElement('input');
    todoCheckbox.type = 'checkbox';
    todoCheckbox.checked = todoItem.completed;

    //Update status when checkbox is clicked
    todoCheckbox.addEventListener('change', function () {
        todoItem.completed = todoCheckbox.checked;

        if(todoItem.completed){
            todoText.style.textDecoration='line-through'
        }else {
            todoText.style.textDecoration='none'
        }


        //Note here we use map() and ternary operator to check if the todo text is same as todo item if not we retrieve a new array todo if they are the same we leave the array the way it is, it means no change.
        const storedTodos = JSON.parse(localStorage.getItem('todos'))
        const completedTodos = storedTodos.map(function (todo) {
            return todo.text === todoItem.text ? todoItem : todo;
        });
        localStorage.setItem('todos', JSON.stringify(completedTodos))
    });
    

        // Create a delete button for each todo item
        const deleteBtn = document.createElement('i');
        deleteBtn.classList.add("fa-trash");
        deleteBtn.classList.add("fa-solid");
        deleteBtn.addEventListener('click', function () {

        //Remove a toDO from the todoList here we are removing per children of the todo
        todoList.removeChild(toDo);

        // Update on completion update the todo, 
        //Logic here is use high order function filter to check if the lists still look the same if there is any change retrieve a new array updatedTodos.
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        const updatedTodos = storedTodos.filter(function (todo) {
            return todo.text !== todoItem.text;
        });
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    });
    

    //Create an Edit Button for Each Todo
    const editBtn = document.createElement('i');
    editBtn.classList.add('fa-sharp', 'fa-regular', 'fa-pen-to-square');
    editBtn.addEventListener('click',function(){
        const userPrompt = prompt('Edit Todo', todoItem.text);

        if(userPrompt !== null && userPrompt.trim !== ''){
            todoText.innerText = userPrompt.trim();
            todoItem.text = userPrompt.trim();

            //Update the data in local Storage.
            const storedTodos =JSON.parse(localStorage.getItem('todos'));
            const editedTodo = storedTodos.map(function(todo) {
                return todo.text === todoItem.text ? todoItem : todo;
            });
            localStorage.setItem('todos',JSON.stringify(editedTodo));
        }

    });
    
    //Append all our items to match the design required make sure you order them in according because Js order matters.
    toDo.appendChild(todoCheckbox);
    toDo.appendChild(todoText);
    todoList.prepend(toDo);
    btnSpan.appendChild(editBtn);
    btnSpan.appendChild(deleteBtn);     
    toDo.appendChild(btnSpan);    
}
