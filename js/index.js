

const todo = document.getElementById('app'); // ma div
const deleteButtonContainer = document.createElement('div'); // container de mon bouton supprimer toutes les tâches
let elementClicked = false; // booleen clic sur bouton

// VARIABLES LISTE
let todoItemList = []; // liste des taches à faire
const todoTitle = document.createElement('h1'); // titre todolist
const todoList = document.createElement('ul'); // la liste 
const mybuttons = [{ 'number': '1', 'name': 'Toutes' }, { 'number': '2', 'name': 'Fini' }, { 'number': '3', 'name': 'En cours' }]; // mes boutons

// VARIABLE FORMULAIRE
const myForm = document.createElement('form');
const myTask = document.createElement('label');
const inputTask = document.createElement('input');
const validButton = document.createElement('button');
const wrapperInput = document.createElement('div')
const ErrorMessage = document.createElement('span');
const regex = /[^a-z0-9çàé\s]/g // uniquement lettre et chiffres
const select = document.createElement('select')



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
ErrorMessage.innerText = 'Erreur de saisie'
deleteAllTodo.innerText = "Supprimer toutes mes tâches"
myForm.append(myTask); // j'attache mon label à mon formulaire
myForm.append(wrapperInput); // j'attache ma div à mon formulaire
myForm.append(wrapperButton);// container boutons
wrapperInput.append(inputTask); // j'attache mon input à mon formulaire
wrapperInput.append(ErrorMessage); // j'attache mon p à ma div 
deleteButtonContainer.append(deleteAllTodo)



document.addEventListener("DOMContentLoaded", save);
myForm.addEventListener('submit', createTodo)
allButtonsForm(mybuttons)
deleteAllTodo.addEventListener('click', deleteAllTask) // Evenement supprimer toutes mes taches
select.addEventListener('click', filtre) // Filtrer mes taches


// BOUTONS FORMULAIRE
function allButtonsForm(arr) {
    const finishButton = document.createElement('button');

    validButton.innerHTML = "Ajouter";


    arr.forEach(selectItem => { // creation des options de select
        const listBouton = document.createElement('option');
        listBouton.innerText = selectItem.name;
        select.append(listBouton)
    })
    wrapperButton.append(validButton, select);
    const allTask = select[0]; // toutes
    const finish = select[1]; // fini
    const inProgress = select[2]; // en cours

    allTask.value = 'all' //select toutes
    finish.value = 'completed'; // select fini
    inProgress.value = 'uncompleted'; // select en cours

    finishButton.addEventListener('click', function () {


        finishButton.style.color = 'red'
    })
}



//AJOUTER UN LI 
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
        doButton.addEventListener('click', doMyTask) // valider la tache
        myButton.addEventListener('click', deleteTask) // evenement bouton supprimer

    });
}

// POUSSER LA VALEUR DANS MON LI AU SUBMIT DU FORM
function createTodo(e) {
    e.preventDefault();
    const todoValue = inputTask.value.charAt(0).toUpperCase() + inputTask.value.slice(1);
    todoItemList.unshift(todoValue)
    localStorage.setItem('task', todoItemList)
    inputTask.value = ""; // effacer le champ après envoi
    todoList.innerHTML = ''; // effacer la liste apres validation (éviter la répétition)
    addTodo(todoItemList)
    //errorTxt()
}

// SAUVEGARDE DES TACHES 
function save() {

    let todos = []

    if (localStorage.getItem("task") != null) { // Si ma clé n'est pas vide


        todos = localStorage.getItem('task').split(',')

        todoItemList = [...todoItemList, ...todos]  //Si mon local n'est pas vide, je dois concaténer !!

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
}

// SUPPRIMER TOUTES MES TÄCHES

function deleteAllTask() {
    localStorage.clear('task');
    location.reload();

}

// SUPPRIMER UNE TACHE AU CLIC
function deleteTask(e) {
    const cible = e.target.parentNode.innerText;
    const index = todoItemList.indexOf(cible)

    todoItemList.length > 1 ? todoItemList.splice(index, 1) : todoItemList.splice(-1); // condition pour supprimer le dernier element du tableau
    e.target.parentNode.remove();

    todoItemList.length === 0 ? localStorage.clear() : localStorage.setItem('task', todoItemList) // sauvegarde du localStorage apres modification

}


// BOUTON TACHE EFFECTUE

function doMyTask(e) { // ajouter ou enlever une class au clic
    let myTarget = e.target.parentNode
    myTarget.classList.toggle('completed')
}



// FILTRER MES TACHES
function filtre(e) { // 
    const target = todoList.childNodes
    target.forEach(element => {
        switch (e.target.value) {
            case 'all':
                element.style.display = "flex";
                break;
            case 'completed':
                if (element.classList.contains('completed')) {
                    element.style.display = "flex";
                } else {
                    element.style.display = "none";
                }
                break;
            case 'uncompleted':
                if (!element.classList.contains('completed')) {
                    element.style.display = "flex";
                } else {
                    element.style.display = "none";
                }
                break;

        }
    })
}

/*function errorTxt(e){
    if( !inputTask.value.replace(/\s+/, '').length ) {
        alert (ErrorMessage)
        ErrorMessage.style.opacity = 1;
        return false;
    
    }
    return true;
}*/