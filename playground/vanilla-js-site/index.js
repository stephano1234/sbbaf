// State of the app
const todos = [
  { description: "Walk the dog", done: false },
  { description: "Water the plants", done: false },
  { description: "Sand the chairs", done: false },
];

// HTML static element references
const addTodoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo-btn");
const todosList = document.getElementById("todos-list");

// Initial dynamic rendering
for (const todo of todos) {
  todosList.append(renderTodoInReadMode(todo));
}

addTodoInput.addEventListener("input", () => {
  addTodoButton.disabled = !checkTodoValidity(addTodoInput.value);
});

addTodoInput.addEventListener("keydown", ({ key }) => {
  if (key === "Enter" && checkTodoValidity(addTodoInput.value)) {
    addTodo(addTodoInput.value);
  }
});

// Dynamic rendering functions
addTodoButton.addEventListener("click", () => {
  addTodo(addTodoInput.value);
});

function renderTodoInReadMode(todo) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = todo.description;
  if (todo.done) {
    span.classList.add("done");
  } else {
    span.addEventListener("click", () => {
      const idx = todos.indexOf(todo);

      todosList.replaceChild(
        renderTodoInEditMode(todo),
        todosList.childNodes[idx],
      );
    });
  }
  li.append(span);

  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.textContent = todo.done ? "Remove" : "Done";
  button.addEventListener("click", () => {
    const idx = todos.indexOf(todo);
    if (todo.done) {
      removeTodo(idx);
    } else {
      todo.done = true;
      todosList.replaceChild(
        renderTodoInReadMode(todo),
        todosList.childNodes[idx],
      );
    }
  });
  li.append(button);

  return li;
}

function renderTodoInEditMode(todo) {
  const li = document.createElement("li");

  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.description;
  input.addEventListener("keydown", ({ key }) => {
    if (key === "Enter" && checkTodoValidity(input.value)) {
      const idx = todos.indexOf(todo);
      updateTodo(idx, input.value);
    }
  });
  li.append(input);

  const saveBtn = document.createElement("button");
  saveBtn.setAttribute("type", "button");
  saveBtn.textContent = "Save";
  saveBtn.disabled = true;
  saveBtn.addEventListener("click", () => {
    const idx = todos.indexOf(todo);
    updateTodo(idx, input.value);
  });
  li.append(saveBtn);

  input.addEventListener("input", () => {
    const newDescription = input.value;
    saveBtn.disabled =
      !checkTodoValidity(newDescription) || newDescription === todo.description;
  });

  const cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("type", "button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => {
    const idx = todos.indexOf(todo);
    todosList.replaceChild(
      renderTodoInReadMode(todo),
      todosList.childNodes[idx],
    );
  });
  li.append(cancelBtn);

  return li;
}

// Action Functions
function addTodo(todoText) {
  const description = todoText.trim();
  if (checkOpenTodoUniqueness(description)) {
    const todo = { description, done: false };
    todos.push(todo);
    const todoEl = renderTodoInReadMode(todo);
    todosList.append(todoEl);

    addTodoInput.value = "";
    addTodoButton.disabled = true;
  } else {
    showNotUniqueTodoMessage(description);
  }
}

function removeTodo(index) {
  todos.splice(index, 1);
  todosList.childNodes[index].remove();
}

function updateTodo(index, todoText) {
  const description = todoText.trim();
  if (checkOpenTodoUniqueness(description)) {
    const todo = { description, done: false };
    todos[index] = todo;
    const todoEl = renderTodoInReadMode(todo);
    todosList.replaceChild(todoEl, todosList.childNodes[index]);
  } else {
    showNotUniqueTodoMessage(description);
  }
}

// Helper Functions
function checkTodoValidity(description) {
  return description.length >= 3;
}

function checkOpenTodoUniqueness(description) {
  return (
    todos.findIndex(
      (todo) =>
        !todo.done &&
        todo.description.toLowerCase() === description.toLowerCase(),
    ) === -1
  );
}

function showNotUniqueTodoMessage(description) {
  alert(`The TODO "${description}" is already in the list.`);
}
