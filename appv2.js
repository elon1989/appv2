/* Select the form from the DOM */
const taskform = document.querySelector('.task-form');
const input = document.querySelector('.input');
const taskList = document.querySelector('.task-list');
const error = document.querySelector('.error');
const clearBtn = document.querySelector('.btn-reset');

/* Add an event listners on the selected elements */


/* Deleting all code inside the UL */
clearBtn.addEventListener('click', function(){
    taskList.innerHTML = '';
    localStorage.clear();
})

/* press the add item give */
taskform.addEventListener('submit', function(event){
    /* Remove the normal behaviour */
    event.preventDefault();
    /* check if the input value is nothing */
    if(input.value == ''){
        error.style.display = 'flex';
        setTimeout(function(){
            error.style.display = 'none';
        }, 2000)
    } else {
        /*-------------- LOCAL STORAGES ---------------*/
        /* Empty array */
        let todos; 

        if(localStorage.getItem('todos')){
            todos = JSON.parse(localStorage.getItem('todos'))
        } else {
            todos = [];
        }

        /* Add task in the todos array */
        todos.push(input.value);
        /* save the data in local storage */
        localStorage.setItem('todos', JSON.stringify(todos))

        /*------------ End of LOCAL STORAGE ------------*/


        htmlCode = `
        <li class="task-item">
            <p class="item-text">${input.value}</p>
            <span class="icons">
                <i class="far fa-check-circle"></i>
                <i class="far fa-edit"></i>
                <i class="far fa-times-circle"></i>
            </span>
        </li>`
        
        
        taskList.innerHTML += htmlCode;
        /* empty the htmlcode */
        htmlCode = '';
        /* emppty the value you write */
        input.value = '';
    }
})



/* Add all event listners to the small butons inside the LI */
taskList.addEventListener('click', function(event){
    /* Target with event */
    /* Target the completed btn */
    if(event.target.classList.contains('fa-check-circle')){
        event.target.parentElement.previousElementSibling.classList.toggle('done')
    }
    /* target the edit btn */
    if(event.target.classList.contains('fa-edit')){
        const text = event.target.parentElement.previousElementSibling.textContent;
        input.value = text;
        taskList.removeChild(event.target.parentElement.parentElement);
    }
    /* Target the remove btn */
    if(event.target.classList.contains('fa-times-circle')){
        taskList.removeChild(event.target.parentElement.parentElement);
    }
})

document.addEventListener('DOMContentLoaded', function(){
     /*-------------- LOCAL STORAGES ---------------*/
        /* Empty array */
        let todos; 

        if(localStorage.getItem('todos')){
            todos = JSON.parse(localStorage.getItem('todos'))
        } else {
            todos = [];
        }

        /* save the data in local storage */
        localStorage.setItem('todos', JSON.stringify(todos))

        let htmlCode = '';
        taskList.innerHTML = '';

        for(let i=0; i < todos.length; i++){
            htmlCode = htmlCode + `
            <li class="task-item">
                <p class="item-text">${todos[i]}</p>
                <span class="icons">
                    <i class="far fa-check-circle"></i>
                    <i class="far fa-edit"></i>
                    <i class="far fa-times-circle"></i>
                </span>
            </li>`
        }

        taskList.innerHTML = htmlCode;
        /*------------ End of LOCAL STORAGE ------------*/
})
