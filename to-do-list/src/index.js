const addForm = document.querySelector(".add-form");
const addInput = document.querySelector(".add-inputbox");
const LS_PENDING = "PENDING";
const LS_FINISHED = "FINISHED";

function getLSItem(key) {
  const value = localStorage.getItem(key);
  if (value === null) {
    return [];
  } else {
    return JSON.parse(value);
  }
}

function setLSItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function addTaskHandler(event) {
  event.preventDefault();
  const task = {
    id: String(Date.now()),
    text: addInput.value,
  };
  printTask(LS_PENDING, [task]);
  const pending = getLSItem(LS_PENDING); // array
  pending.push(task);
  setLSItem(LS_PENDING, pending);
  addInput.value = "";
}

function deleteTaskHandler(event) {
  const li = event.target.parentNode;
  const id = li.id;
  const key = li.parentNode.className;
  if (key.toUpperCase() === LS_PENDING) {
    let pending = getLSItem(LS_PENDING);
    pending = pending.filter((task) => task.id !== id);
    setLSItem(LS_PENDING, pending);
  } else {
    let finished = getLSItem(LS_FINISHED);
    finished = finished.filter((task) => task.id !== id);
    setLSItem(LS_FINISHED, finished);
  }
  li.parentNode.removeChild(li);
}

function finishTaskHandler(event) {
  const li = event.target.parentNode;
  const id = li.id;
  const text = li.querySelector("span").textContent;
  const task = {
    id,
    text,
  };
  // delete task to pending
  let pending = getLSItem(LS_PENDING);
  pending = pending.filter((task) => task.id !== id);
  setLSItem(LS_PENDING, pending);
  li.parentNode.removeChild(li);
  // add task to finished
  printTask(LS_FINISHED, [task]);
  const finished = getLSItem(LS_FINISHED);
  finished.push(task);
  setLSItem(LS_FINISHED, finished);
}

function restoreTaskHandler(event) {
  const li = event.target.parentNode;
  const id = li.id;
  const text = li.querySelector("span").textContent;
  const task = {
    id,
    text,
  };
  // delete task to finished
  let finished = getLSItem(LS_FINISHED);
  finished = finished.filter((task) => task.id !== id);
  setLSItem(LS_FINISHED, finished);
  li.parentNode.removeChild(li);
  // add task to pending
  printTask(LS_PENDING, [task]);
  const pending = getLSItem(LS_PENDING);
  pending.push(task);
  setLSItem(LS_PENDING, pending);
}

function printTask(key, value) {
  value.forEach((task) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const btnDelete = document.createElement("button");
    li.id = task.id;
    span.innerText = task.text;
    btnDelete.innerText = "❌";
    li.appendChild(span);
    li.appendChild(btnDelete);
    btnDelete.addEventListener("click", deleteTaskHandler);
    if (key === LS_PENDING) {
      const btnfinish = document.createElement("button");
      btnfinish.innerText = "✅";
      li.appendChild(btnfinish);
      btnfinish.addEventListener("click", finishTaskHandler);
    } else {
      const btnRestore = document.createElement("button");
      btnRestore.innerText = "⏪";
      li.appendChild(btnRestore);
      btnRestore.addEventListener("click", restoreTaskHandler);
    }
    document.querySelector(`.${key.toLowerCase()}`).appendChild(li);
  });
}

function init() {
  const pending = getLSItem(LS_PENDING);
  const finished = getLSItem(LS_FINISHED);
  printTask(LS_PENDING, pending);
  printTask(LS_FINISHED, finished);
  addForm.addEventListener("submit", addTaskHandler);
}
init();
