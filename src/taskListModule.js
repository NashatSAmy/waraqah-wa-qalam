// Function to Capitalize words.
Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

////////////////////////////////////////
//////////Tasks List Objects///////////
//////////////////////////////////////

// Information holder object that collects all information needed for new task
const newTaskInfo = {
  newTaskName: "",
  newTaskDescription: "",
  newTaskStartingDate: "",
  newTaskDueDate: "",
  newTaskETC: "",
  newTaskGroup: "",
  newTaskPriority: "",
  newTaskHomeItem: true,
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
    this.newTaskDueDate = dueDate;
  },
  getETC() {
    const etcFiled = document.getElementById("newTask-etcContainer");
    let etc = etcFiled.innerText;
    etc = etc.match(/\d+/g);
    etc = +etc[0] * 24 + +etc[1] + +etc[2] / 60;
    this.newTaskETC =
      Math.round(etc) <= 0
        ? "ETC: Less Then Hour"
        : `ETC: ${Math.round(etc)} Hours`;
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
    subTasksList.forEach((task) =>
      this.newTaskSubItems.push({ type: "task", value: task.innerText.trim() })
    );
    notesList.forEach((note) =>
      this.newTaskSubItems.push({ type: "note", value: note.innerText.trim() })
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
    if (
      newTaskInfo.newTaskName !== "" &&
      newTaskInfo.newTaskDueDate !== "" &&
      newTaskInfo.newTaskDueDate !== "Due: "
    ) {
      newTaskInfo.greenLight = true;
      e.preventDefault();
      document.body.removeChild(document.querySelector(".blackMask"));
    }
  },
};

// Factory function that makes task objects
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

/* Controller object that control how the information in newTaskInfo object 
   and the factory function to make new tasks,
   also controlling the task list by adding, removing or updating tasks. */
const listItemController = {
  itemsList: [],

  makeListItem() {
    // Function that make new items using info stored in newTaskInfo object
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
    newTaskInfo.newTaskSubItems = [];
    return newListItem;
  },
  populateList() {
    // Function that adds new tasks to the list of tasks
    listItemController.itemsList.push(listItemController.makeListItem());
  },
  updateDomList(list) {
    // Function that updates the task list on the screen
    const domTasksList = document.getElementsByClassName("task-list")[0];
    list.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("task");
      listItem.setAttribute("data-taskId", item.idNo);
      listItem.innerHTML = `
        <div class="taskRemovalContainer"></div>
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
        <span class="task-dueDate">Due: ${item.dueDate.split("T")[0]}</span>
        <span class="task-time">${item.workTime}</span>
        <span class="task-ect">${item.ETC}</span>
        `;
      domTasksList.appendChild(listItem);
    });
  },
  updateListItem() {},

  removeItem(e) {
    // Function that allows user to remove tasks
    if (!e.target.classList.contains("taskRemovalContainer")) return;
    const taskId = e.target.parentNode.dataset.taskid;
    const removedDomItem = e.target.parentNode;
    removedDomItem.remove();
    listItemController.itemsList = listItemController.itemsList.filter(
      (item) => item.idNo != taskId
    );
  },
  shiftDomList(e) {
    // Function that change the task list.
    if (e.target.classList[0] != "nav-item") return;
    const group = document.getElementsByClassName("nav-selected")[0].innerText;
    const list = listItemController.itemsList.filter((item) =>
      listItemController.itemGroupsList(item).includes(group)
    );
    document.getElementsByClassName("task-list")[0].innerHTML = "";
    listItemController.updateDomList(list);
  },
  listOperator() {
    // Function that determines if the task list on the screen needs to be updated or not.
    const itemGroups = listItemController.itemGroupsList(
      listItemController.itemsList[listItemController.itemsList.length - 1]
    );
    const currentGroup =
      document.getElementsByClassName("nav-selected")[0].innerText;
    if (itemGroups.includes(currentGroup)) {
      const list = [
        listItemController.itemsList[listItemController.itemsList.length - 1],
      ];
      listItemController.updateDomList(list);
    }
  },
  itemGroupsList(item) {
    // Function that determines all the groups one task belongs to
    const staticGroup = [];
    const date = new Date();
    staticGroup.push(item.group);
    if (item.homeItem == true) {
      staticGroup.push("Home");
    }
    if (new Date(item.dueDate).toDateString() == date.toDateString()) {
      staticGroup.push("Today");
    }
    if (
      new Date(item.dueDate).toDateString() ==
      date.toDateString(date.setDate(date.getDate() + 1))
    ) {
      staticGroup.push("Tomorrow");
    }
    return staticGroup;
  },
};

////////////////////////////////////////
//////////Tasks View Objects///////////
//////////////////////////////////////

// Controller that is responsible for taskView functionality
const taskView = {
  expand(e) {
    if (e.target.classList[0] != "task-name") return;
    const taskID = e.target.parentNode.dataset.taskid;
    const item = listItemController.itemsList.filter(
      (item) => item.idNo == taskID
    )[0];
    taskView.displayExpandedItem(item);
  },
  displayExpandedItem(item) {
    const mask = document.createElement("div");
    mask.classList.add("blackMask");
    mask.innerHTML = `
      <div class="taskView">
       <div class="taskView-startDate">${item.startingDate}</div>
       <div class="taskView-group">
          <div id="taskEdit"></div>
          ${item.group}
       </div>
       <div class="taskView-name">${item.name.capitalize()}</div>
       <div class="taskView-dueDate">
         Due: ${new Date(item.dueDate).toDateString()} ${new Date(
      item.dueDate
    ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
       </div>
       <div class="taskView-priority">Priority: ${item.priority}</div>
       <div class="taskView-etc">${item.ETC}</div>
       <div class="taskView-totalTime">${item.workTime}</div>
       <div class="taskView-description">
         <span id="desName">Description:</span><span id="desText">${
           item.description
         }</span>
       </div>
       <div class="taskView-notes">
         <span id="notesName">Notes:</span> 
         </span>
       </div>
     </div>
    `;
    document.body.appendChild(mask);
    taskView.makeSubItem(item.subItems);
  },
  makeSubItem(subItemsList) {
    const listNode = document.getElementsByClassName("taskView-notes")[0];
    const validationTest = /\w/;
    subItemsList.forEach((subItem) => {
      if (
        subItem.type == "task" &&
        validationTest.test(subItem.value) == true
      ) {
        const taskNode = document.createElement("label");
        taskNode.innerHTML = `<span>${subItem.value}</span> <input type="checkbox" name="" id="">`;
        listNode.appendChild(taskNode);
      } else if (
        subItem.type == "note" &&
        validationTest.test(subItem.value) == true
      ) {
        const noteNode = document.createElement("span");
        noteNode.classList.add("subNoteText");
        noteNode.innerText = subItem.value;
        listNode.appendChild(noteNode);
      }
    });
  },
};

/////////Tasks List Eventlisteners
window.addEventListener("click", newTaskInfo.getAllInfo);
window.addEventListener("click", listItemController.removeItem);
window.addEventListener("click", (e) => {
  if (!e.target.classList.contains("newTask-addButton")) return;
  else if (newTaskInfo.greenLight == true) {
    listItemController.populateList();
    listItemController.listOperator();
    newTaskInfo.greenLight = false;
  }
});
window.addEventListener("click", listItemController.shiftDomList);

/////////Tasks View Eventlisteners
window.addEventListener("click", taskView.expand);