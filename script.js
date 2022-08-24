const input = document.getElementById('texto-tarefa');
const button = document.getElementById('criar-tarefa');
const list = document.getElementById('lista-tarefas');
const buttonClear = document.getElementById('apaga-tudo');
const buttonRemove = document.getElementById('remover-finalizados');
const buttonSave = document.getElementById('salvar-tarefas');
const buttonRemoveSelected = document.getElementById('remover-selecionado');
const buttonUp = document.getElementById('mover-cima');
const buttonLow = document.getElementById('mover-baixo');

const lis = () => document.querySelectorAll('#lista-tarefas li');

const createList = (text) => {
  const element = document.createElement('li');
  element.innerText = text;
  list.appendChild(element);
};

const addList = () => {
  const { value } = input;
  if (value) {
    createList(value);
    input.value = '';
  }
};

// const removeSelection = () => {
//   lis().forEach((value) => {
//     const li = value;
//     li.id = '';
//     li.style.backgroundColor = 'rgb(212, 202, 202)';
//   });
// };

const listSelected = ({ target }) => {
  const li = document.querySelector('.selected');
  if (li) li.classList.remove('selected');
  if (target.localName === 'li') target.classList.add('selected');
};

const listCompleted = ({ target }) => {
  if (target.localName === 'li') {
    if ([...target.classList].some((clas) => clas === 'completed')) {
      target.classList.remove('completed');
      return;
    }
    target.classList.add('completed');
  }
};

const clearList = () => {
  lis().forEach((element) => list.removeChild(element));
  if (localStorage.getItem('lists')) localStorage.removeItem('lists');
};

const removeComplet = () => {
  const completed = document.querySelectorAll('.completed');
  if (completed) {
    completed.forEach((element) => list.removeChild(element));
  }
};

const removeSelected = () => {
  const selected = document.querySelector('.selected');
  if (selected) list.removeChild(selected);
};

const selectedInfo = () => {
  const li = document.querySelector('.selected');
  const NodeList = lis();
  return {
    element: li,
    index: [...NodeList].indexOf(li, 0),
    arrayLi: NodeList,
  };
};

const moveUp = () => {
  const { element, index, arrayLi } = selectedInfo();
  if (index && element) list.insertBefore(element, arrayLi[index - 1]);
};

const moveLow = () => {
  const { element, index, arrayLi } = selectedInfo();
  if (index !== arrayLi.length - 1 && element) {
    list.insertBefore(element, arrayLi[index + 2]);
  }
};

const toSave = () => {
  const li = list.innerHTML;
  localStorage.setItem('lists', (JSON.stringify(li)));
};

const toCharge = () => { list.innerHTML = JSON.parse(localStorage.getItem('lists')); };

// events
const events = () => {
  button.addEventListener('click', addList);
  list.addEventListener('click', listSelected);
  list.addEventListener('dblclick', listCompleted);
  buttonClear.addEventListener('click', clearList);
  buttonRemove.addEventListener('click', removeComplet);
  buttonSave.addEventListener('click', toSave);
  buttonRemoveSelected.addEventListener('click', removeSelected);
  buttonUp.addEventListener('click', moveUp);
  buttonLow.addEventListener('click', moveLow);
};

// chama
events();
toCharge();
