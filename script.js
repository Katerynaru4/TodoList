class TodoList {
  constructor() { 
    this.todos = JSON.parse(sessionStorage.getItem("todos")) || [];
    this.listElement = document.querySelector("#list");
    this.inputElement.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        this.addTodo();
      }
    });
    this.renderTodoList();
  }

  addTodo() {
    const todoText = this.inputElement.value;
    if (todoText.trim() === "") {
      return;
    }
    const todo = { text: todoText, completed: false };
    this.todos.push(todo);
    this.inputElement.value = "";
    this.renderTodoList();
  }

  toggleCompleted(index) {
    const todo = this.todos[index];
    todo.completed = !todo.completed;
    this.renderTodoList();
  }

  deleteTodo(index) {
    this.todos.splice(index, 1);
    this.renderTodoList();
  }

  renderTodoList() {
    sessionStorage.setItem("todos", JSON.stringify(this.todos));
    this.listElement.innerHTML = "";
    for (let i = 0; i < this.todos.length; i++) {
      const todo = this.todos[i];
      const todoItemElement = document.createElement("li");
      const checkboxElement = document.createElement("input");
      checkboxElement.type = "checkbox";
      checkboxElement.checked = todo.completed;
      checkboxElement.addEventListener("click", () => {
        this.toggleCompleted(i);
      });
      const spanElement = document.createElement("span");
      spanElement.textContent = todo.text;
      const deleteButtonElement = document.createElement("button");
      deleteButtonElement.textContent = "Delete";
      deleteButtonElement.addEventListener("click", () => {
        this.deleteTodo(i);
      });
      todoItemElement.appendChild(checkboxElement);
      todoItemElement.appendChild(spanElement);
      todoItemElement.appendChild(deleteButtonElement);
      this.listElement.appendChild(todoItemElement);
    }
  }
}

const todoList = new TodoList();

const themeButton = document.querySelector(".theme-toggle");

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const currentTheme = document.body.classList.contains("dark")
    ? "dark"
    : "light";
  localStorage.setItem("theme", currentTheme);
});
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.body.classList.add(savedTheme);
}
