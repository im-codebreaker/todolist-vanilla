

const todo = document.getElementById('app'); // ma div

// VARIABLES LISTE
const todoTitle = document.createElement('h1'); // titre todolist
const todoList = document.createElement('ul'); // la liste 
const todoItemList = []; // liste des taches à faire
const mybuttons = ['Toutes', 'Fini', 'En cours']; // mes boutons

// VARIABLE FORMULAIRE
const myForm = document.createElement('form');
const myTask = document.createElement('label');
const inputTask = document.createElement('input');
const validButton = document.createElement('button');
const wrapperInput = document.createElement('div')
const ErrorMessage = document.createElement('span');
const regex = /[^a-z0-9çàé\s]/g // uniquement lettre et chiffres

// VARIABLE CLONE
const wrapperButton = wrapperInput.cloneNode(true);


// CLASS
wrapperInput.classList.add('input_error')
wrapperButton.classList.add('flex-buttons')


todo.append(todoTitle); // j'attache mon h1 à ma div
todo.append(myForm); // j'attache mon formulaire à ma div
todo.append(todoList);  // j'attache mon ul à ma div

todoTitle.innerText = "TO DO LIST"; // Mon h1

myForm.append(myTask); // j'attache mon label à mon formulaire
myForm.append(wrapperInput); // j'attache ma div à mon formulaire
myForm.append(wrapperButton);
wrapperInput.append(inputTask); // j'attache mon input à mon formulaire
wrapperInput.append(ErrorMessage); // j'attache mon p à ma div 
wrapperButton.append(validButton); // bouton pour valider le formulaire
mybuttons.map(element => {
    const cloneLabel = myTask.cloneNode(true);
    const cloneButton = validButton.cloneNode(true);
    wrapperButton.append(cloneLabel);
    cloneLabel.append(cloneButton);
    cloneButton.innerText = element
})
myTask.innerText = 'Que dois-je faire?';
ErrorMessage.innerHTML = "Erreur de saisie";
validButton.innerText = 'Ajouter';

function save(){
    if(localStorage.getItem("task") == null){
        localStorage.setItem("task", '[]')
    }

    localStorage.getItem("task") 
    todoItemList.push(inputTask.value)

    localStorage.setItem("task", todoItemList )
}

/*function view(){
    if(localStorage.getItem("task") !== null){
        todoItemList = localStorage.getItem("task")
    }
}*/

myForm.addEventListener('submit', function(e){ // fonction du formulaire pour ajouter une tâche
    e.preventDefault();
    const item = document.createElement('li');
    const myButton = document.createElement('button');
    const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.value = 1;
        checkbox.name = "do";   
    checkbox.classList.add('position'); // déplacer le bouton
    const itemContent = document.createElement('p');
  
    

        if(inputTask.value === "" || regex.test(inputTask.value)){ // message d'erreur si le champ écrit n'est pas approprié
            inputTask.value ="";
            /*setTimeout(function(){
                location.reload();
             }, 1000);*/
            return ErrorMessage.classList.add('visible');
            
        
        }
        ErrorMessage.classList.remove('visible');
    
        todoList.append(item) // j'attache mon li à mon ul
        item.append(itemContent, checkbox, myButton) // j'attache mon p et mon button delete à mon li
        todoItemList.unshift(inputTask.value); // je pousse les valeurs entrée dans l'input dans mon tableau todoItemList
        itemContent.innerText = inputTask.value.charAt(0).toUpperCase() + inputTask.value.slice(1); // 1er lettre de la liste en majuscule
        inputTask.value = ""; // supprimer le champ après envoie du texte
        console.log(checkbox.checked)
       
         myButton.innerText = 'Supprimer'; // mon bouton pour supprimer les tàches
        myButton.addEventListener('click', function(){ // fonction pour supprimer le bouton
        item.remove()
        })
        checkbox.addEventListener('click', function(){
            if(checkbox.checked == true){
                item.style.opacity = .5;
            } else if(checkbox.checked === false){
                item.style.opacity = 1;
            }
            
        })
})
      
    




