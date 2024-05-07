const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

const getTodos = () => {
  fetch(apiUrl + '?_limit=10')
    .then((res) => res.json())
    .then((json) => {
      json.forEach((todo) => addTodoToDOM(todo));
    });
};

const addTodoToDOM = (todo) => {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(todo.title));
  div.setAttribute('data-id', todo.id);
  div.classList.add('todo');

  if (todo.completed) {
    div.classList.add('done');
  }

  document.getElementById('todo-list').appendChild(div);
};

const createTodos = (e) => {
  e.preventDefault();

  const newTodo = {
    title: e.target.firstElementChild.value,
    completed: false,
  };

  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((json) => addTodoToDOM(json));
};

const toggleTodosCompleted = (e) => {
  if (e.target.classList.contains('todo')) {
    e.target.classList.toggle('done');
  }

  updateTodos(e.target.dataset.id, e.target.classList.contains('done'));
};

const updateTodos = (id, completed) => {
  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id,
      completed,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  });
};

const deleteTodo = (e) => {
  if (e.target.classList.contains('todo')) {
    const id = e.target.dataset.id;

    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        e.target.remove();
      });
  }
};

const init = () => {
  document.querySelector('#todo-form').addEventListener('submit', createTodos);
  document
    .getElementById('todo-list')
    .addEventListener('click', toggleTodosCompleted);
  document.getElementById('todo-list').addEventListener('dblclick', deleteTodo);

  document.addEventListener('DOMContentLoaded', getTodos);
};

init();
