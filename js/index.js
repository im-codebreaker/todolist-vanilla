

const todo = document.getElementById('app'); // ma div
const deleteButtonContainer = document.createElement('div'); // container de mon bouton supprimer toutes les tâches
let elementClicked = false; // booleen clic sur bouton

// VARIABLES LISTE
let todoItemList = []; // liste des taches à faire
const todoTitle = document.createElement('h1'); // titre todolist
const todoList = document.createElement('ul'); // la liste 
const mybuttons = [{'number':'1','name': 'Toutes'},{'number':'2','name': 'Fini'}]; // mes boutons

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
const deleteAllTodo = validButton.cloneNode(true);

// CLASS
wrapperInput.classList.add('input_error');
wrapperButton.classList.add('flex-buttons');
deleteButtonContainer.classList.add('flex-container');



todo.append(todoTitle, myForm, todoList, deleteButtonContainer); // j'attache mon h1 à ma div, mon form, mon ul et mon bouton delete
todoTitle.innerText = "TO DO LIST"; // Mon h1
myTask.textContent = 'Que dois-je faire?';
inputTask.placeholder = 'Acheter du chocolat';
deleteAllTodo.innerText = "Supprimer toutes mes tâches"
myForm.append(myTask); // j'attache mon label à mon formulaire
myForm.append(wrapperInput); // j'attache ma div à mon formulaire
myForm.append(wrapperButton);// container boutons
wrapperInput.append(inputTask); // j'attache mon input à mon formulaire
wrapperInput.append(ErrorMessage); // j'attache mon p à ma div 
deleteButtonContainer.append(deleteAllTodo)




myForm.addEventListener('submit', createTodo)
allButtonsForm(mybuttons)


save()
deleteAllTodo.addEventListener('click', deleteAllTask) // Evenement supprimer toutes mes taches



// BOUTONS FORMULAIRE
function allButtonsForm(){
    const finishButton = document.createElement('button');
    const allTask = finishButton.cloneNode(true)
    const notFinish = finishButton.cloneNode(true)
    validButton.innerHTML = "Ajouter";

    allTask.innerHTML = 'Toutes';
    allTask.type = 'button';
    allTask.value = 'all';
    notFinish.innerHTML = 'En cours';
    notFinish.type = 'button';
    notFinish.value = 'not-completed';
    finishButton.innerHTML = "Fini";
    finishButton.type = 'button'; // annulé le submit du bouton
    finishButton.value = 'completed';
    wrapperButton.append(validButton, allTask, notFinish, finishButton); // bouton pour valider le formulaire
    

    finishButton.addEventListener('click', function(){
       
    
        finishButton.style.color = 'red'
    })
}



//AJOUTER UN LI DYNAMIQUEMENT
function addTodo(arr) {

    arr.forEach(element => {
        const item = document.createElement('li');
        const itemText = document.createElement('p')
        const myButton = document.createElement('button')
        const doButton = myButton.cloneNode(true);
        //item.classList.add('opacity')
        doButton.classList.add('dobutton')
        todoList.append(item);
        item.append(itemText, doButton, myButton);
        itemText.innerText = element;
        doButton.innerHTML = '<i class="fas fa-check"></i>';
        myButton.innerHTML = '<i class="fas fa-trash"></i>';
        doButton.addEventListener('click', doMyTask)
        myButton.addEventListener('click', deleteTask) // evenement bouton supprimer

    });
}

// POUSSER LA VALEUR DANS MON LI AU SUBMIT DU FORM
function createTodo(e) {
    e.preventDefault();
    const todoValue = inputTask.value.charAt(0).toUpperCase() + inputTask.value.slice(1);
    todoItemList.unshift(todoValue)
    inputTask.value = ""; // effacer le champ après envoi
    todoList.innerHTML = ''; // effacer la liste apres validation (éviter la répétition)
    addTodo(todoItemList)
    localStorage.setItem('task', todoItemList)

}

// SAUVEGARDE DES TACHES 
function save() {
    let todos;
    if (localStorage.getItem("task") === null){
        todos = [];
        localStorage.removeItem('task')
    } 

     todos = localStorage.getItem('task').split(',')

    todoItemList = [...todoItemList,...todos]  //Si mon local n'est pas vide, je dois concaténer !!

    todos.forEach(myTodo => {
        const item = document.createElement('li');
        const itemText = document.createElement('p')
        const myButton = document.createElement('button')
        const doButton = myButton.cloneNode(true);
        //item.classList.add('opacity')
        doButton.classList.add('dobutton')
        todoList.append(item);
        item.append(itemText, doButton, myButton);
        itemText.innerText = myTodo;
        doButton.innerHTML = '<i class="fas fa-check"></i>';
        myButton.innerHTML = '<i class="fas fa-trash"></i>'
        myButton.addEventListener('click', deleteTask)
        doButton.addEventListener('click', doMyTask)
    })


}

// SUPPRIMER TOUTES MES TÄCHES

function deleteAllTask(){
    localStorage.clear('task');
    location.reload();
  
}

// SUPPRIMER UNE TACHE AU CLIC
function deleteTask(e){
    const cible = e.target.parentNode.innerText;
    const index = todoItemList.indexOf(cible)
    
    todoItemList.length > 1 ? todoItemList.splice(index,1) : todoItemList.splice(-1); // condition pour supprimer le dernier element du tableau
    e.target.parentNode.remove(); 
    localStorage.setItem('task', todoItemList) // sauvegarde du localStorage apres modification
}


// BOUTON TACHE EFFECTUE

function doMyTask(e){
    let myTarget = e.target.parentNode

    if(Boolean(elementClicked) == false){
        elementClicked = true;
        myTarget.style.opacity = .5;
    }else if(Boolean(elementClicked) == true){
        elementClicked = false;
        myTarget.style.opacity = 1;
    }
    console.log(elementClicked)
   //filtre(todoItemList)

    
}


function filtre(e) {
    
}

// APPARITION/DISPARITION DU BOUTON SUPPRIMER TOUTES LES TACHES

/*function vanishButton(button){
    
    if(todoItemList.length == 0){
        button.style.display = "none";
    }
        button.style.display = "block";
}*/