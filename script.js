let tasks = [
  {
    id: 1,
    title: "Kontrollera inventarielistan för IT-utrustning",
    done: false,
    priority: "medium",
  },
  {
    id: 2,
    title: "Uppdatera veckans supportstatistik",
    done: false,
    priority: "low",
  },
  {
    id: 3,
    title: "Granska nya användarkonton före aktivering",
    done: false,
    priority: "high",
  },
  {
    id: 4,
    title: "Kontrollera att mötesrummens skärmar fungerar",
    done: true,
    priority: "medium",
  },
  {
    id: 5,
    title: "Sammanställa felrapporter från helpdesk",
    done: false,
    priority: "high",
  },
  {
    id: 6,
    title: "Arkivera avslutade serviceärenden",
    done: true,
    priority: "low",
  },
  {
    id: 7,
    title: "Verifiera backup-loggen från natten",
    done: false,
    priority: "high",
  },
  {
    id: 8,
    title: "Uppdatera kontaktlistan för externa leverantörer",
    done: false,
    priority: "low",
  },
  {
    id: 9,
    title: "Kontrollera licenser som går ut denna månad",
    done: false,
    priority: "high",
  },
  {
    id: 10,
    title: "Förbereda sammanfattning till veckomötet",
    done: false,
    priority: "medium",
  },
];

let savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
  tasks = JSON.parse(savedTasks);
}

function getTasksByPriority(priority) {
  return tasks.filter((task) => task.priority === priority); // behövs egentligen inte men ville ha return också...
}

let highTasks = getTasksByPriority("high");
let mediumTasks = getTasksByPriority("medium");
let lowTasks = getTasksByPriority("low");

function render() {
  document.getElementById("total").textContent = tasks.length;

  let doneTasks = tasks.filter((task) => task.done).length;
  document.getElementById("done").textContent = doneTasks;

  let output = "";

  tasks.forEach((task) => {
    output += `
      <div class="task">
        <p>${task.title}</p>
        <p>${task.done ? "Klar" : "Inte klar"}</p>
        <p>Prioritet: ${task.priority}</p>

        <button onclick="${
          task.done ? `incompleteTask(${task.id})` : `completeTask(${task.id})`
        }">
          ${task.done ? "Markera inte klar" : "Markera klar"}
        </button>

        <button onclick="deleteTask(${task.id})">
          Ta bort
        </button>
      </div>
    `;
  });

  document.getElementById("tasks").innerHTML = output;
}

function completeTask(id) {
  let task = tasks.find((task) => task.id === id);

  task.done = true;

  localStorage.setItem("tasks", JSON.stringify(tasks));

  render();
}

function incompleteTask(id) {
  let task = tasks.find((task) => task.id === id);

  task.done = false;

  localStorage.setItem("tasks", JSON.stringify(tasks));

  render();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  render();
}

function searchTask() {
  let id = Number(document.getElementById("search").value);
  let task = tasks.find((task) => task.id === id);

  if (task) {
    document.getElementById("searchResult").textContent = task.title;
  } else {
    document.getElementById("searchResult").textContent = "Ingen task hittades";
  }
}

render();
