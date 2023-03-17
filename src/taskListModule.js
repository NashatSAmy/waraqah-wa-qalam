const newTaskInfo = {
  newTaskName: "",
  newTaskDescription: "",
  newTaskStartingDate: "",
  newTaskDueDate: "",
  newTaskETC: "",
  newTaskGroup: "",
  newTaskPriority: "",
  newTaskHomeItem: false,
  newTaskSubItems: [],
  greenLight: false,

  getName() {
    const nameFiled = document.getElementsByClassName("newTask-name");
    const name = nameFiled[0].value;
    this.newTaskName = name;
  },
  getDescription() {
    const descriptionFiled = document.getElementsByClassName(
      "newTask-description"
    );
    const description = descriptionFiled[0].value;
    this.newTaskDescription = description;
  },
  getStartingDate() {
    const startingDateTimeFiled = document.getElementsByClassName(
      "newTask-startingDateTime"
    );
    const startingDateTime = startingDateTimeFiled[0].innerText;
    this.newTaskStartingDate = startingDateTime;
  },
  getDueDate() {
    const dueDateFiled = document.getElementsByClassName("newTask-dueDate");
    const dueDate = dueDateFiled[0].value;
    this.newTaskDueDate = `Due: ${dueDate.split("T")[0]}`;
  },
  getETC() {
    const etcFiled = document.getElementById("newTask-etcContainer");
    let etc = etcFiled.innerText;
    etc = etc.match(/\d+/g);
    etc = (+etc[0] * 24) + +etc[1] + (+etc[2] / 60)
    this.newTaskETC = `ETC: ${Math.round(etc)} Hours`;
  },
  getGroup() {
    const groupsFiled = document.getElementsByClassName("newTask-group");
    const group = groupsFiled[0].value;
    this.newTaskGroup = group;
  },
  isHomeItem() {
    const homeFiled = document.getElementsByName("newTask-addToHome");
    const home = homeFiled[0].checked;
    this.newTaskHomeItem = home;
  },
  getSubItems() {
    const notesList = document.querySelectorAll(
      '[data-elementtype="newTask-note"]'
    );
    const subTasksList = document.querySelectorAll(
      '[data-elementtype="newTask-task"]'
    );
    notesList.forEach((note) =>
      this.newTaskSubItems.push({ type: "note", value: note.innerText })
    );
    subTasksList.forEach((task) =>
      this.newTaskSubItems.push({ type: "task", value: task.value })
    );
  },
  getPriority() {
    const priorityFiled = document.getElementsByClassName("newTask-priority");
    const priority = priorityFiled[0].value;
    this.newTaskPriority = priority;
  },
  getAllInfo(e) {
    if (!e.target.classList.contains("newTask-addButton")) return;
    newTaskInfo.getName();
    newTaskInfo.getPriority();
    newTaskInfo.getDescription();
    newTaskInfo.getDueDate();
    newTaskInfo.getGroup();
    newTaskInfo.getETC();
    newTaskInfo.getStartingDate();
    newTaskInfo.getSubItems();
    newTaskInfo.isHomeItem();
    if (newTaskInfo.newTaskName !== "" && newTaskInfo.newTaskDueDate !== "") {
      newTaskInfo.greenLight = true;
      e.preventDefault();
      document.body.removeChild(document.querySelector(".blackMask"));
    }
  },
};

const listItemMaker = (listItemId) => {
  let idNo = listItemId;
  let name = "";
  let description = "";
  const startingDate = "";
  let dueDate = "";
  let status = false;
  let ETC = "";
  let group = "";
  let homeItem = false;
  let subItems = [];
  let priority = "";
  let workTime = "Worked: 0 Hours";
  let stopWatchTime = 0; // In seconds
  let pomodoroCount = 0;
  let pomodoroLimit = 25;
  let pomoBreakLimit = 5;
  let pomodoroTime = 0;
  let pomoBreakTime = 0;

  return {
    idNo,
    name,
    description,
    startingDate,
    dueDate,
    status,
    ETC,
    homeItem,
    subItems,
    pomodoroCount,
    stopWatchTime,
    group,
    pomodoroLimit,
    pomoBreakLimit,
    pomodoroTime,
    pomoBreakTime,
    priority,
    workTime,
  };
};

const listItemController = {
  itemsList: [],

  makeListItem() {
    const newListItem = listItemMaker(
      `${newTaskInfo.newTaskName.slice(0, 3).toLocaleLowerCase()}${Math.floor(
        Math.random() * 1000000
      )}`
    );

    newListItem.name = newTaskInfo.newTaskName;
    newListItem.description = newTaskInfo.newTaskDescription;
    newListItem.startingDate = newTaskInfo.newTaskStartingDate;
    newListItem.dueDate = newTaskInfo.newTaskDueDate;
    newListItem.status = false;
    newListItem.ETC = newTaskInfo.newTaskETC;
    newListItem.group = newTaskInfo.newTaskGroup;
    newListItem.homeItem = newTaskInfo.newTaskHomeItem;
    newListItem.subItems = newTaskInfo.newTaskSubItems;
    newListItem.priority = newTaskInfo.newTaskPriority;

    return newListItem;
  },
  populateList() {
    listItemController.itemsList.push(listItemController.makeListItem());
  },
  populateDomList() {
    const domTasksList = document.getElementsByClassName("task-list")[0];
    listItemController.itemsList.slice(domTasksList.children.length).forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("task");
      listItem.setAttribute("data-taskId", item.idNo)
      listItem.innerHTML = `
      <span class="task-group">
        ${item.group}
      </span>
      <span class="task-name">${item.name}</span>
      <input type="checkbox" name="task-completion-status" id="task-completion-status" />
      <span class="task-brief">${item.description}</span>
      <div class="task-toolBox">
        <div class="stopWatch-button"></div>
        <div class="pomo-button"></div>
      </div>
      <span class="task-dueDate">${item.dueDate}</span>
      <span class="task-time">${item.workTime}</span>
      <span class="task-ect">${item.ETC}</span>
      `;
      domTasksList.appendChild(listItem);
    });
  },
  updateListItem() {},
  removeItem(e) {
    
  },
};

window.addEventListener("click", newTaskInfo.getAllInfo);
window.addEventListener("click", (e) => {
  if (!e.target.classList.contains("newTask-addButton")) return;
  else if (newTaskInfo.greenLight == true) {
    listItemController.populateList();
    listItemController.populateDomList();
    newTaskInfo.greenLight = false;
  }
});
