// your code g
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const clearButton = document.getElementById("clear-completed");

let tasks = load();

function load() {
  try {
    return JSON.parse(
      localStorage.getItem("tasks")
    ) || [];
  } catch (error) {
    return [];
  }
}

function save() {
  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}

function render() {
  list.replaceChildren();

  tasks.forEach(task => {
    const li = document.createElement("li");

    if (task.done) {
      li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      save();
      render();
    });

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";

    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      save();
      render();
    });

    li.append(checkbox, span, deleteButton);
    list.appendChild(li);
  });

  const remaining = tasks.filter(
    task => !task.done
  ).length;

  counter.textContent =
    `${remaining} tasks remaining`;
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") return;

  tasks.push({
    id: Date.now(),
    text: text,
    done: false
  });

  input.value = "";

  save();
  render();
});

clearButton.addEventListener("click", () => {
  tasks = tasks.filter(task => !task.done);
  save();
  render();
});

render();
oes here
