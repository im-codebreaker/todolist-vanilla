const todo = document.getElementById('app'); // ma div
const todoTitle = document.createElement('h1'); // titre todolist
const todoList = document.createElement('ul'); // la liste 

const todoItemList = ["faire les courses", "faire le ménage", "apprendre le js", "apprendre à utilise git","passer gold sur lol"]; // liste des taches à faire


todo.append(todoTitle); // j'attache mon h1 à ma div
todo.append(todoList);  // j'attache mon ul à ma div

todoTitle.innerText = "TODO LIST"; // Mon h1
todoItemList.map( element => {
    const item = document.createElement('li');
    const myButton = document.createElement('button');
const itemContent = document.createElement('p');
    todoList.append(item) // j'attache mon li à mon ul
    item.append(itemContent, myButton)
    itemContent.innerText = element.charAt(0).toUpperCase() + element.slice(1); // 1er lettre de la liste en majuscule
    myButton.innerText = 'Delete'; // mon bouton pour supprimer les tàches

    myButton.addEventListener('click', function(){ // fonction pour supprimer le bouton
        item.remove()
        })
})

