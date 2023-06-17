(self["webpackChunkwaraqah_wa_qalam"] = self["webpackChunkwaraqah_wa_qalam"] || []).push([["tasksList"],{

/***/ "./src/taskListModule.js":
/*!*******************************!*\
  !*** ./src/taskListModule.js ***!
  \*******************************/
/***/ (() => {

// Function to Capitalize words.
Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

function noDefault(e) {
  e.preventDefault()
}

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
      <div class="taskView" data-taskid="${item.idNo}">
       <div class="taskView-startDate">${item.startingDate}</div>
       <div class="taskView-group" data-editable="choose">
          <div id="taskEdit" title="Edit Task"></div>
          ${item.group}
       </div>
       <div class="taskView-name" data-editable="rewrite">${item.name.capitalize()}</div>
       <div class="taskView-dueDate" data-editable="choose">
         Due: ${new Date(item.dueDate).toDateString()} ${new Date(
      item.dueDate
    ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
       </div>
       <div class="taskView-priority" data-editable="choose">Priority: ${item.priority}</div>
       <div class="taskView-etc">${item.ETC}</div>
       <div class="taskView-totalTime">${item.workTime}</div>
       <div class="taskView-description">
         <span id="desName">Description:</span><span id="desText" data-editable="rewrite">${
           item.description
         }</span>
       </div>
       <div id="taskView-notes">
         <span id="notesName">Notes: <div title="Add Sub Task" id="addSubTasksTV"></div>
         <div title="Add Sub Note" id="addSubNotesTV"></div></span> 
         </span>
         <div id="taskView-notesTS"></div>
         <div id="taskView-notesNS"></div>
       </div>
     </div>
    `;
    document.body.appendChild(mask);
    taskView.makeSubItem(item.subItems);
  },
  makeSubItem(subItemsList) {
    const taskList = document.getElementById("taskView-notesTS");
    const noteList = document.getElementById("taskView-notesNS");
    const validationTest = /\w/;
    subItemsList.forEach((subItem) => {
      if (
        subItem.type == "task" &&
        validationTest.test(subItem.value) == true
      ) {
        const taskNode = document.createElement("label");
        taskNode.innerHTML = `<div class="removeTVSubItem"></div><span data-editable="editSubItem">${subItem.value}</span> <input type="checkbox" name="" id="">`;
        taskList.appendChild(taskNode);
      } else if (
        subItem.type == "note" &&
        validationTest.test(subItem.value) == true
      ) {
        const noteNode = document.createElement("span");
        noteNode.classList.add("subNoteText");
        noteNode.setAttribute("data-editable", "editSubItem")
        noteNode.innerHTML = `<div class="removeTVSubItem"></div>${subItem.value}`;
        noteList.appendChild(noteNode);
      }
    });
  },
  showNoteInput(e) {
    // Function that allow the user to input new sub-item task or note
    const notes = document.getElementById("taskView-notes");
    if (e.target.id == "addSubTasksTV") {
      const taskInput = document.createElement("div");
      taskInput.setAttribute("id", "subTaskInputContainerTV")
      taskInput.innerHTML = `<input type="text" id="subTaskInputTV"><button type="button" id="subTaskAddButtonTV">Add Task</button>`;
      taskInput.addEventListener("focusout", () => setTimeout(() => {
        document.getElementById("subTaskInputTV").value = "";
        taskInput.remove()
      }, 150))
      notes.appendChild(taskInput);
      document.getElementById("subTaskInputTV").focus();
      document.getElementById("subTaskAddButtonTV").addEventListener("click", (e) => e.preventDefault());
      taskView.postNote("subTaskInputTV")
    } else if (e.target.id == "addSubNotesTV") {
      const noteInput = document.createElement("div");
      noteInput.setAttribute("id", "subTaskInputContainerTV")
      noteInput.innerHTML = `<textarea id="subNoteInputTV" rows="4"></textarea> <button type="button" id="subNoteAddButtonTV">Add Note</button>`;
      noteInput.addEventListener("focusout", () => setTimeout(() => {
        document.getElementById("subNoteInputTV").value = ""
        noteInput.remove()
      }, 150));
      notes.appendChild(noteInput);
      document.getElementById("subNoteInputTV").focus()
      taskView.postNote("subNoteInputTV")
    }
    return;
  },
  postNote(id){
    // Function that post a note or a task to the DOM.
    const taskList = document.getElementById("taskView-notesTS");
    const noteList = document.getElementById("taskView-notesNS");
    const subItemInput = document.getElementById(id);
    window.addEventListener("click", (e) => {
      if (e.target.id == "subTaskAddButtonTV" && subItemInput.value.trim() !== "") {
        const taskNode = document.createElement("label");
        taskNode.innerHTML = `<div class="removeTVSubItem"></div><span data-editable="editSubItem">${subItemInput.value}</span> <input type="checkbox" name="" id="">`;
        taskList.appendChild(taskNode);
      } else if (e.target.id == "subNoteAddButtonTV" && subItemInput.value.trim() !== "") {
        const noteNode = document.createElement("span");
        noteNode.classList.add("subNoteText");
        noteNode.setAttribute("data-editable", "editSubItem")
        noteNode.innerHTML = `<div class="removeTVSubItem"></div> ${subItemInput.value}`;
        noteList.appendChild(noteNode);
      }
    })
  },
  deleteSubItem(e){
    if (!e.target.classList.contains("removeTVSubItem")) return;
    const parentContainer = e.target.parentNode;
    const noteValue = {note: parentContainer.innerText, task: parentContainer.childNodes[1].innerText};
    const noteType = parentContainer.childNodes.length;
    const noteFile = {type: noteType == 4 ? "task" : "note", value: noteType == 4 ? noteValue.task : noteValue.note};
    parentContainer.remove()
  }
};

const taskEditing = {
  taskEditGreenLight: false,
  editableTaskIdNo: "",
  enableEditing(e) {
    if (e.target.id != "taskEdit") return;
    taskEditing.taskEditGreenLight = true;
    taskEditing.editableTaskIdNo = e.target.parentNode.parentNode.dataset.taskid;
    // Save button
    const saveChangesButton = document.createElement("button");
    saveChangesButton.setAttribute("type", "button");
    saveChangesButton.setAttribute("id", "saveChangesButton");
    saveChangesButton.innerText = `Save`
    document.getElementsByClassName("taskView")[0].appendChild(saveChangesButton);
    // Getting all editable fields.
    const rewritableFields = document.querySelectorAll("[data-editable='rewrite']");
    const selectiveFields = document.querySelectorAll("[data-editable='choose']");
    const subItems = document.querySelectorAll("[data-editable='editSubItem']");
    const subItemsParents = document.querySelectorAll("div#taskView-notes label");
    // Enabling editing for the selected fields.
    rewritableFields.forEach(item => item.classList.add("rewriteMe"));
    selectiveFields.forEach(item =>{
      if (item.classList[0].split("-")[1] == "group") {
        const newElement = document.createElement("select");
        newElement.setAttribute("id", "editGroup")
        const selectionList = []
        const groupList = document.querySelectorAll(".project").forEach( group => group.innerText == item.innerText ? selectionList.push(`<option selected>${group.innerText}</option>`) : selectionList.push(`<option>${group.innerText}</option>`));
        newElement.innerHTML = `${selectionList}`;
        item.replaceWith(newElement)
      }
      else if (item.classList[0].split("-")[1] == "dueDate") {
        const newElement = document.createElement("input");
        newElement.setAttribute("type", "datetime-local");
        newElement.setAttribute("id", "editDueDate")
        item.replaceWith(newElement)
      }
      else if (item.classList[0].split("-")[1] == "priority") {
        const newElement = document.createElement("select");
        newElement.setAttribute("id", "editPriority")
        const selectionList = ["urgent", "Important", "Not Important"]
        newElement.innerHTML = `${selectionList.map(priority => item.innerText.split(":")[1].trim() == priority ? `<option selected>${priority}</option>` : `<option>${priority}</option>`)}`;
        item.replaceWith(newElement)
      }
    });
    subItems.forEach(item => item.classList.add("rewriteMe"));
    subItemsParents.forEach(item => item.addEventListener("click", noDefault));
  },
  disableEditing(e) {
    if (e.target.id != "saveChangesButton") return;
    // Getting all editable fields.
    const rewritableFields = document.querySelectorAll("[data-editable='rewrite']");
    const subItems = document.querySelectorAll("[data-editable='editSubItem']");
    const subItemsParents = document.querySelectorAll("div#taskView-notes label");
    const group = document.getElementById("editGroup");
    const dueDate = document.getElementById("editDueDate");
    const priority = document.getElementById("editPriority");
    // Disabling editing for the selected fields.
    rewritableFields.forEach(item => item.classList.remove("rewriteMe"));
    subItems.forEach(item => item.classList.remove("rewriteMe"));
    subItemsParents.forEach(item => item.removeEventListener("click", noDefault));
    // New taskView-group element
    const ogElemG = document.createElement("div");
    ogElemG.classList.add("taskView-group");
    ogElemG.setAttribute("data-editable", "choose")
    ogElemG.innerHTML = `<div id="taskEdit" title="Edit Task"></div> ${group.value}`
    group.remove()
    // New taskView-dueDate element
    const ogElemDD = document.createElement("div");
    ogElemDD.classList.add("taskView-dueDate");
    ogElemDD.setAttribute("data-editable", "choose")
    ogElemDD.innerHTML = `Due: ${new Date(dueDate.value).toDateString()} ${new Date(
      dueDate.value
    ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    dueDate.remove()
    // New taskView-priority element
    const ogElemP = document.createElement("div");
    ogElemP.classList.add("taskView-priority");
    ogElemP.setAttribute("data-editable", "choose")
    ogElemP.innerHTML = `Priority: ${priority.value}`
    priority.remove()
    // Appending all of the new elements
    document.getElementsByClassName("taskView")[0].appendChild(ogElemG);
    document.getElementsByClassName("taskView")[0].appendChild(ogElemDD);
    document.getElementsByClassName("taskView")[0].appendChild(ogElemP);

    e.target.remove()
  }
}

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
window.addEventListener("click", taskView.showNoteInput);
window.addEventListener("click", taskView.deleteSubItem);

/////////Tasks Editing Eventlisteners
window.addEventListener("click", taskEditing.enableEditing);
window.addEventListener("click", taskEditing.disableEditing)


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/taskListModule.js"));
/******/ }
]);
//# sourceMappingURL=tasksList.bundle.js.map