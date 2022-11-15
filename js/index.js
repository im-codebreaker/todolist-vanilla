

const todo = document.getElementById('app'); // ma div
// VARIABLES LISTE
const todoTitle = document.createElement('h1'); // titre todolist
const todoList = document.createElement('ul'); // la liste 
const todoItemList = []; // liste des taches à faire
// VARIABLE FORMULAIRE
const myForm = document.createElement('form');
const myTask = document.createElement('label');
const inputTask = document.createElement('input');
const validButton = document.createElement('button');

todo.append(todoTitle); // j'attache mon h1 à ma div
todo.append(myForm); // j'attache mon formulaire à ma div
todo.append(todoList);  // j'attache mon ul à ma div

todoTitle.innerText = "TO DO LIST"; // Mon h1

myForm.append(myTask); // j'attache mon label à mon formulaire
myForm.append(inputTask); // j'attache mon input à mon formulaire
myForm.append(validButton); // bouton pour valider le formulaire
myTask.innerText = 'Que dois-je faire?';
validButton.innerText = 'Envoyer ma tâches';

myForm.addEventListener('submit', function(e){ // fonction du formulaire pour ajouter une tâche
    e.preventDefault();
    const item = document.createElement('li');
    const myButton = document.createElement('button');
    const itemContent = document.createElement('p');
        todoList.append(item) // j'attache mon li à mon ul
        item.append(itemContent, myButton) // j'attache mon p et mon button delete à mon li
        todoItemList.push(inputTask.value); // je pousse les valeurs entrée dans l'input dans mon tableau todoItemList
        itemContent.innerText = inputTask.value.charAt(0).toUpperCase() + inputTask.value.slice(1); // 1er lettre de la liste en majuscule
        inputTask.value = ""; // supprimer le champ après envoie du texte
         myButton.innerText = 'Supprimer'; // mon bouton pour supprimer les tàches
        myButton.addEventListener('click', function(){ // fonction pour supprimer le bouton
        item.remove()
        })
})
    /*todoItemList.map( element => {
        const item = document.createElement('li');
        const myButton = document.createElement('button');
    const itemContent = document.createElement('p');
        todoList.append(item) // j'attache mon li à mon ul
        item.append(itemContent, myButton)
        console.log(element)
    
        itemContent.innerText = element.charAt(0).toUpperCase() + element.slice(1); // 1er lettre de la liste en majuscule
        myButton.innerText = 'Delete'; // mon bouton pour supprimer les tàches
        
        myButton.addEventListener('click', function(){ // fonction pour supprimer le bouton
            item.remove()
            })
    })*/
    




