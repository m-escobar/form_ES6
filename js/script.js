let globalNames = ['João', 'Maria', 'José', 'Ana'];
let inputName = null;
let isEditing = false;
let currentIndex = null;

window.addEventListener('load', () => {
  preventFormSubmit();
  inputName = document.querySelector('#inputName');

  activateInput();
  render();
});

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  
  let form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function updateName(newName){
    globalNames[currentIndex] = newName;
    currentIndex = null;
    clearInput;
  }
  
  function insertNewName(typedName) {
    if(isEditing) {
      updateName(typedName);
      isEditing = false;
    } else { 
        globalNames = [...globalNames, typedName];
      }
    render();
  }

  function handleTyping(event) {
    if(event.key === 'Enter') {
      if(event.target.value.trim().length === 0) {
        clearInput();
        return;
      }

      insertNewName(event.target.value);
    }
    
  }

  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames = globalNames.filter((_, idx) => idx !== index);

      render();
    }

    let button = document.createElement('button');
    button.textContent = 'x';
    button.classList.add('deleteButton');

    button.addEventListener('click', deleteName);

    return button;
  }

  function createSpan(name, index){
    function editItem() {
      isEditing = true;
      inputName.value = name;
      inputName.focus();
      currentIndex = index;
    }

    let span = document.createElement('span');
    span.textContent = name;
    span.classList.add('clickable');

    span.addEventListener('click', editItem);
    return span;
  }

  let divNames = document.querySelector('#names');
  let ul = document.createElement('ul');

  divNames.innerHTML = '';

  for(let i = 0; i < globalNames.length; i++) {
    let currentName = globalNames[i];

    let li = document.createElement('li');
    let button = createDeleteButton(i);
    let span = createSpan(currentName, i);
    
    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

const clearInput = () => {
  inputName.value = '';
  inputName.focus();
}