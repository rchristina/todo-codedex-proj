const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const completedCounter = document.getElementById("completed-counter");
const incompletedCounter = document.getElementById("incompleted-counter");

function updateCounters() {
  const completedTasks = document.querySelectorAll(".completed").length;
  const incompletedTasks =
    document.querySelectorAll("li:not(.completed)").length;

  completedCounter.textContent = completedTasks;
  incompletedCounter.textContent = incompletedTasks;
}

function addTask() {
  const task = inputBox.value.trim();

  //displayed when trying to add blank task
  if (!task) {
    alert("Please write down a task");
    return;
  }

  //item that contains html elements along with task
  const li = document.createElement("li");

  li.innerHTML = `
    <label>
        <input type="checkbox">
        <span>${task}</span>
    </label>
    <span class="edit-btn">Edit</span>
    <span class="delete-btn">Delete</span>
    `;

  listContainer.appendChild(li);
  inputBox.value = ""; //deletes previously typed in task

  const checkbox = li.querySelector("input");
  const editBtn = li.querySelector(".edit-btn");
  const taskSpan = li.querySelector("span");
  const deleteBtn = li.querySelector(".delete-btn");

  //function to run when checkbox clicked
  checkbox.addEventListener("click", function () {
    li.classList.toggle("completed", checkbox.checked);
    updateCounters();
  });

  //function to run when edit clicked
  editBtn.addEventListener("click", function () {
    const update = prompt("Edit task: ", taskSpan.textContent);
    if (update !== null) {
      taskSpan.textContent = update;
      li.classList.remove("completed");
      checkbox.checked = false;
      updateCounters();
    }
  });

  deleteBtn.addEventListener("click", function(){
    if(confirm("Are you sure you want to delete this task?")){
        li.remove();
        updateCounters();
    }
  })

  updateCounters();
}
