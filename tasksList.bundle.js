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

// Event handler 
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
    this.newTaskETC = etc;
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
      this.newTaskSubItems.push({ type: "task", value: task.innerText.trim(), checked: task.parentNode.getElementsByTagName("input")[0].checked})
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
  let workTime = 0; // In seconds
  let stopWatchTime = 0; // In seconds
  let pomodoroCount = 0;
  let pomodoroLimit = 25; // In minutes
  let pomoBreakLimit = 5; // In minutes
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
  itemMethods: {
    startStopWatch () {
      this.stopWatchTime = 0;
      let s = 0;
      let m = 0;
      let h = 0;
      const stopWatchSeconds = setInterval(() => {
        this.stopWatchTime++
        this.workTime++
        s++
        if (s == 60) {
          m++;
          s=0;
        }else if (m == 60) {
          h++;
          m = 0;
        }
        timerS.innerText = `${h.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:${m.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:${s.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`
      }, 1000);
      
      taskFunctions.isItOn = true
      this.stopWatch = stopWatchSeconds;
    },
    continueStopWatch () {
      taskFunctions.isItPaused = false;
      let s = ((this.stopWatchTime / 60) % 1) * 60;
      let m = ((this.stopWatchTime / 3600).toFixed(2) % 1) * 60;
      let h = Math.floor(this.stopWatchTime / 3600);
      const stopWatchSeconds = setInterval(() => {
        this.stopWatchTime++
        this.workTime++
        s++
        if (s == 60) {
          m++;
          s=0;
        }else if (m == 60) {
          h++;
          m = 0;
        } 
        timerS.innerText = `${h.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:${m.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:${s.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`
      }, 1000);

      this.stopWatch = stopWatchSeconds;
    },
    stopStopWatch () {
      taskFunctions.isItOn = false;
      taskFunctions.isItPaused = false;
      clearInterval(this.stopWatch)
    },
    pauseStopWatch () {
      taskFunctions.isItPaused = true;
      clearInterval(this.stopWatch)
    },
    startPomodoro () {
      taskFunctions.isItOn = true
      let m = 0;
      let s = 0;
      const pomodoroTimer = setInterval(() => {
        this.workTime++
        this.pomodoroTime++
        s = this.pomodoroTime >= 60 ? 0 : this.pomodoroTime;
        m = Math.floor(this.pomodoroTime / 60);
        timerP.innerText = `${m.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:${s.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`
        
        if (this.pomodoroCount == 4) {
          this.pomodoroCount = 0;
          this.pomodoroTime = 0;
          this.breakTimePomodoro()
        }
        else if (this.pomodoroTime == this.pomodoroLimit * 60) {
          this.pomodoroCount++;
          this.pomodoroTime = 0;
        }
      }, 1000)
      this.pomodoroTimer = pomodoroTimer;
    },
    breakTimePomodoro () {
      clearInterval(this.pomodoroTimer);
      timerP.classList.add("timerPB");
      const pomodoroTimer = setInterval(() => {
        this.pomodoroTime++
        s = this.pomodoroTime >= 60 ? 0 : this.pomodoroTime;
        m = Math.floor(this.pomodoroTime / 60);
        timerP.innerText = `${m.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:${s.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`
        if (this.pomodoroTime == this.pomoBreakLimit * 60) {
          this.pomodoroTime = 0;
          clearInterval(this.pomodoroTimer);
          timerP.classList.remove("timerPB");
          this.startPomodoro();
        }
      }, 1000)
      this.pomodoroTimer = pomodoroTimer;
    },
    stopPomodoro () {
      taskFunctions.isItOn = false
      this.pomodoroCount = 0;
      this.pomodoroTime = 0;
      clearInterval(this.pomodoroTimer)
    },
  },
  itemsList: [{
    idNo: "wel738273",
    name: "Welcome to Waraqah wa Qalam",
    description: "Waraqah wa Qalam is a website made to help you organize your days by taking notes making tasks and to do lists with the ability to track how much time you have put working on specific task and compare to the estimated time of completion we set based on your due date and start date.",
    startingDate: "Sat Jul 01 2023 08:22 AM",
    dueDate: "2023-07-01T10:24",
    status: false,
    ETC: "ETC: Hours 2",
    homeItem: true,
    subItems: [
        {
            "type": "task",
            "value": "Hey delete me by pressing on the eraser mark on the left.",
            "checked": false
        },
        {
            "type": "task",
            "value": "Hey mark me as completed by pressing on me.",
            "checked": false
        },
        {
            "type": "task",
            "value": "Edit this task by pressing on the icon next the group indicator.",
            "checked": false
        },
        {
            "type": "note",
            "value": "You can add more notes or tasks by pressing the the icons on the upper left of the notes section."
        },
        {
            "type": "note",
            "value": "StopWtach:\n- Click it once to start it.\n- Click it again to pause it.\n- Double click it to end it."
        },
        {
            "type": "note",
            "value": "Pomodoro Timer:\n- Click it to start it.\n- Double click it to end it.\n- Breaks starts automatically.\n- Break and work phases are recognized by different colors."
        },
        {
            "type": "note",
            "value": "Features:\n- Stopwatch to track your time working.\n- Pomodoro timer with 25mins worktime and 5mins break.\n- Custom groups.\n- Your data is saved locally."
        },
    ],
    pomodoroCount: 0,
    stopWatchTime: 0,
    group: "My Projects",
    pomodoroLimit: 25,
    pomoBreakLimit: 5,
    pomodoroTime: 0,
    pomoBreakTime: 0,
    priority: "Urgent",
    workTime: 0,
    startStopWatch() {
      this.stopWatchTime = 0;
      let s = 0;
      let m = 0;
      let h = 0;
      const stopWatchSeconds = setInterval(() => {
        this.stopWatchTime++
        this.workTime++
        s++
        if (s == 60) {
          m++;
          s=0;
        }else if (m == 60) {
          h++;
          m = 0;
        }
        timerS.innerText = `${h.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:${m.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:${s.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`
      }, 1000);
      
      taskFunctions.isItOn = true
      this.stopWatch = stopWatchSeconds;
    },
    continueStopWatch() {
      taskFunctions.isItPaused = false;
      let s = ((this.stopWatchTime / 60) % 1) * 60;
      let m = ((this.stopWatchTime / 3600).toFixed(2) % 1) * 60;
      let h = Math.floor(this.stopWatchTime / 3600);
      const stopWatchSeconds = setInterval(() => {
        this.stopWatchTime++
        this.workTime++
        s++
        if (s == 60) {
          m++;
          s=0;
        }else if (m == 60) {
          h++;
          m = 0;
        } 
        timerS.innerText = `${h.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:${m.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:${s.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`
      }, 1000);

      this.stopWatch = stopWatchSeconds;
    },
    stopStopWatch() {
      taskFunctions.isItOn = false;
      taskFunctions.isItPaused = false;
      clearInterval(this.stopWatch)
    },
    pauseStopWatch() {
      taskFunctions.isItPaused = true;
      clearInterval(this.stopWatch)
    },
    startPomodoro() {
      taskFunctions.isItOn = true
      let m = 0;
      let s = 0;
      const pomodoroTimer = setInterval(() => {
        this.workTime++
        this.pomodoroTime++
        s = this.pomodoroTime >= 60 ? 0 : this.pomodoroTime;
        m = Math.floor(this.pomodoroTime / 60);
        timerP.innerText = `${m.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:${s.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`
        
        if (this.pomodoroCount == 4) {
          this.pomodoroCount = 0;
          this.pomodoroTime = 0;
          this.breakTimePomodoro()
        }
        else if (this.pomodoroTime == this.pomodoroLimit * 60) {
          this.pomodoroCount++;
          this.pomodoroTime = 0;
        }
      }, 1000)
      this.pomodoroTimer = pomodoroTimer;
    },
    breakTimePomodoro() {
      clearInterval(this.pomodoroTimer);
      timerP.classList.add("timerPB");
      const pomodoroTimer = setInterval(() => {
        this.pomodoroTime++
        s = this.pomodoroTime >= 60 ? 0 : this.pomodoroTime;
        m = Math.floor(this.pomodoroTime / 60);
        timerP.innerText = `${m.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:${s.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`
        if (this.pomodoroTime == this.pomoBreakLimit * 60) {
          this.pomodoroTime = 0;
          clearInterval(this.pomodoroTimer);
          timerP.classList.remove("timerPB");
          this.startPomodoro();
        }
      }, 1000)
      this.pomodoroTimer = pomodoroTimer;
    },
    stopPomodoro() {
      taskFunctions.isItOn = false
      this.pomodoroCount = 0;
      this.pomodoroTime = 0;
      clearInterval(this.pomodoroTimer)
    },
}],
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
    return {...newListItem, ...listItemController.itemMethods};
  },
  populateList() {
    // Function that adds new tasks to the list of tasks
    listItemController.itemsList.push(listItemController.makeListItem());
    localStorage.setItem("itemsList", JSON.stringify(listItemController.itemsList))
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
        <span class="task-name ${item.status == true ? "done" : ""}">${item.name}</span>
        <input type="checkbox" name="task-completion-status" id="task-completion-status" ${item.status == true ? "checked" : ""} />
        <span class="task-brief">${item.description}</span>
        <div class="task-toolBox">
          <div class="stopWatch-button"></div>
          <div class="pomo-button"></div>
        </div>
        <span class="task-dueDate">Due: ${item.dueDate.split("T")[0]}</span>
        <span class="task-time">Worked: ${Math.floor(item.workTime / 3600)} Hours</span>
        <span class="task-ect">${item.ETC}</span>
        `;
      domTasksList.appendChild(listItem);
    });
  },
  updateListItem(id, updateX) {
    // This function allow the updating of the task in the task list.
    const itemPosition = listItemController.itemsList.findIndex(item => item.idNo == id);
    if (updateX == 0) {
      // Getting the new values for the task fields.
      const newGroup = document.getElementsByClassName("taskView-group")[0].innerText;
      const newName = document.getElementsByClassName("taskView-name")[0].innerText;
      const newDescription = document.getElementById("desText").innerText;
      const newPriority = document.getElementsByClassName("taskView-priority")[0].innerText;
      const newDueDate = document.getElementsByClassName("taskView-dueDate")[0].innerText;
      // Updating task info.
      listItemController.itemsList[itemPosition].group = newGroup;
      listItemController.itemsList[itemPosition].name = newName;
      listItemController.itemsList[itemPosition].description = newDescription;
      listItemController.itemsList[itemPosition].priority = newPriority;
      listItemController.itemsList[itemPosition].dueDate = newDueDate == "Due: Invalid Date Invalid Date" ? listItemController.itemsList[itemPosition].dueDate : `${new Date(newDueDate).toISOString().split("T")[0]}T${new Date(newDueDate).toLocaleTimeString([], {hour12:false, hour: "2-digit", minute: "2-digit"})}`;
      listItemController.itemsList[itemPosition].ETC = `ETC: Hours ${Math.round((new Date(listItemController.itemsList[itemPosition].dueDate).getTime() - new Date(listItemController.itemsList[itemPosition].startingDate).getTime()) / 3.6e+6)}`
      listItemController.shiftDomList()
      localStorage.setItem("itemsList", JSON.stringify(listItemController.itemsList))
    } 
  },
  removeItem(e) {
    // Function that allows user to remove tasks
    if (!e.target.classList.contains("taskRemovalContainer")) return;
    const taskId = e.target.parentNode.dataset.taskid;
    const removedDomItem = e.target.parentNode;
    removedDomItem.remove();
    listItemController.itemsList = listItemController.itemsList.filter(
      (item) => item.idNo != taskId
    );
    localStorage.setItem("itemsList", JSON.stringify(listItemController.itemsList))
  },
  shiftDomList() {
    // Function that change the task list.
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
  updateItemsListFromLS() {
    if (!localStorage.getItem("itemsList")) return;
    let withMethods = [];
    JSON.parse(localStorage.getItem("itemsList")).forEach(item => withMethods.push({...item, ...listItemController.itemMethods}))
    listItemController.itemsList = withMethods;
  }
};

////////////////////////////////////////
//////////Tasks View Objects///////////
//////////////////////////////////////

// Controller that is responsible for taskView functionality.
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
       <div class="taskView-totalTime">Worked: ${Math.floor(item.workTime / 3600)} Hours</div>
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
        taskNode.innerHTML = `<div class="removeTVSubItem"></div><span class=${subItem.checked ? "done" : ""} data-editable="editSubItem">${subItem.value}</span> <input type="checkbox" name="" id="subTask-completion-status" ${subItem.checked ? "checked" : ""} >`;
        taskList.appendChild(taskNode);
      } else if (
        subItem.type == "note" &&
        validationTest.test(subItem.value) == true
      ) {
        const noteNode = document.createElement("pre");
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
        taskNode.innerHTML = `<div class="removeTVSubItem"></div><span data-editable="editSubItem">${subItemInput.value}</span> <input type="checkbox" name="" id="subTask-completion-status">`;
        taskList.appendChild(taskNode);
      } else if (e.target.id == "subNoteAddButtonTV" && subItemInput.value.trim() !== "") {
        const noteNode = document.createElement("pre");
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

// Controller that is responsible for allowing users to edit their tasks.
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
    listItemController.updateListItem(taskEditing.editableTaskIdNo, 0)
  }
}

////////////////////////////////////////
////////Tasks Functions Objects////////
//////////////////////////////////////

// Controller that is responsible for task functionality.
const taskFunctions = {
  taskInWorkID: "",
  isItOn: false,
  isItPaused: false,
  currentInterval: "",
  stopWatch(e) {
    if (e.target.classList.contains("stopWatch-button") || e.target.id == "timerS") {
      taskFunctions.taskInWorkID = e.target.parentNode.parentNode.dataset.taskid;
      const itemPosition = listItemController.itemsList.findIndex(item => item.idNo == taskFunctions.taskInWorkID);
      if (taskFunctions.isItOn == false) {
        listItemController.itemsList[itemPosition].startStopWatch()
        const timerContainer = e.target;
        const timer = document.createElement("div");
        timer.setAttribute("id", "timerS")
        timer.innerText = `00:00:00`;
        timerContainer.replaceWith(timer)
      } else if (e.detail == 2 && e.target.id == "timerS") {
        listItemController.itemsList[itemPosition].stopStopWatch();
        const buttonContainer = e.target;
        const button = document.createElement("div");
        button.classList.add("stopWatch-button");
        buttonContainer.replaceWith(button);
        listItemController.shiftDomList()
      } else if (e.detail == 1 && e.target.id == "timerS" && taskFunctions.isItPaused == false) {
        listItemController.itemsList[itemPosition].pauseStopWatch()
      } else if (e.detail == 1 && e.target.id == "timerS" && taskFunctions.isItPaused == true) {
        listItemController.itemsList[itemPosition].continueStopWatch()
      }
    }
  },
  pomodoroTimer(e) {
    if (e.target.classList.contains("pomo-button") || e.target.id == "timerP") {
      taskFunctions.taskInWorkID = e.target.parentNode.parentNode.dataset.taskid;
      const itemPosition = listItemController.itemsList.findIndex(item => item.idNo == taskFunctions.taskInWorkID);
      if (taskFunctions.isItOn == false) {
        const timerContainer = e.target;
        const timer = document.createElement("div");
        timer.setAttribute("id", "timerP")
        timer.innerText = `00:00`;
        timerContainer.replaceWith(timer)
        listItemController.itemsList[itemPosition].startPomodoro()
      } else if (taskFunctions.isItOn == true && e.detail == 2) {
        listItemController.itemsList[itemPosition].stopPomodoro()
        const buttonContainer = e.target;
        const button = document.createElement("div");
        button.classList.add("pomo-button");
        buttonContainer.replaceWith(button);
        listItemController.shiftDomList()
      }
    }
  }, 
  taskCompleted (e) {
    if (e.target.id == "task-completion-status") {
      taskFunctions.taskInWorkID = e.target.parentNode.dataset.taskid;
      const itemPosition = listItemController.itemsList.findIndex(item => item.idNo == taskFunctions.taskInWorkID);  
      listItemController.itemsList[itemPosition].status = e.target.checked;
      e.target.checked ? e.target.parentNode.getElementsByClassName("task-name")[0].classList.add("done") : e.target.parentNode.getElementsByClassName("task-name")[0].classList.remove("done")
    } else if (e.target.id == "subTask-completion-status") {
      taskFunctions.taskInWorkID = e.target.parentNode.parentNode.parentNode.parentNode.dataset.taskid;
      const itemPosition = listItemController.itemsList.findIndex(item => item.idNo == taskFunctions.taskInWorkID);
      listItemController.itemsList[itemPosition].subItems[listItemController.itemsList[itemPosition].subItems.findIndex(x => x.value == e.target.parentNode.getElementsByTagName("span")[0].innerText)].checked = e.target.checked
      e.target.checked ? e.target.parentNode.getElementsByTagName("span")[0].classList.add("done") : e.target.parentNode.getElementsByTagName("span")[0].classList.remove("done");
    } else if (e.target.dataset.elementtype == "newTask-taskStatus") {
      taskFunctions.taskInWorkID = e.target.parentNode.parentNode.dataset.taskid;
      const itemPosition = listItemController.itemsList.findIndex(item => item.idNo == taskFunctions.taskInWorkID);
      e.target.checked ? e.target.parentNode.getElementsByTagName("label")[0].classList.add("done") : e.target.parentNode.getElementsByTagName("label")[0].classList.remove("done")
    }
  }
}

listItemController.updateItemsListFromLS()
listItemController.shiftDomList()

window.addEventListener("beforeunload", ()=> localStorage.setItem("itemsList", JSON.stringify(listItemController.itemsList)))

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
window.addEventListener("click", (e) => {if (e.target.classList[0] != "nav-item") return;listItemController.shiftDomList()});

/////////Tasks View Eventlisteners
window.addEventListener("click", taskView.expand);
window.addEventListener("click", taskView.showNoteInput);
window.addEventListener("click", taskView.deleteSubItem);

/////////Tasks Editing Eventlisteners
window.addEventListener("click", taskEditing.enableEditing);
window.addEventListener("click", taskEditing.disableEditing)

/////////Tasks Functions Eventlisteners
window.addEventListener("click", taskFunctions.stopWatch)
window.addEventListener("dblclick", taskFunctions.stopWatch)
window.addEventListener("click", taskFunctions.pomodoroTimer)
window.addEventListener("dblclick", taskFunctions.pomodoroTimer)
window.addEventListener("click", taskFunctions.taskCompleted)

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/taskListModule.js"));
/******/ }
]);
//# sourceMappingURL=tasksList.bundle.js.map