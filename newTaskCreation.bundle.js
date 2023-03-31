(self["webpackChunkwaraqah_wa_qalam"] = self["webpackChunkwaraqah_wa_qalam"] || []).push([["newTaskCreation"],{

/***/ "./src/newTaskFormModule.js":
/*!**********************************!*\
  !*** ./src/newTaskFormModule.js ***!
  \**********************************/
/***/ (() => {

const formController = {
  todaysDate: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
  subTasks: [],
  notes: [],
  removableSubItem: "",
  removableSubItemTest: false,

  currentProjects() {
    const projectsList = document.querySelectorAll(".project");
    const projectNames = [];
    projectsList.forEach((project) => projectNames.push(project.innerText));
    return projectNames.map((name) => `<option>${name}</option>`);
  },
  addNewSubItem(e) {
    const notes = document.getElementById("newTask-subItems");
    if (e.target.id == "addSubTasks") {
      const newTask = document.createElement("div");
      newTask.classList.add("newTask-checkItem");
      newTask.setAttribute("data-elementType", "newTask-subItem")
      newTask.innerHTML = `<div class="removeSubItem" data-elementType="newTask-removeSubItem"></div>
      <input type="text" class="newTask-checkItemLabel" placeholder="Enter your item..." data-elementType="newTask-task">
      <input type="checkbox" data-elementType="newTask-taskStatus">`;
      notes.appendChild(newTask);
    } else if (e.target.id == "addSubNotes") {
      const newNote = document.createElement("div");
      newNote.classList.add("newTask-noteContainer");
      newNote.setAttribute("data-elementType", "newTask-subItem")
      newNote.innerHTML = `<div class="removeSubItem" data-elementType="newTask-removeSubItem"></div>
      <p class="newTask-note" data-elementType="newTask-note"></p> `
      notes.appendChild(newNote);
    }
    return;
  },
  removeSubItem(e) {
    if (e.target.dataset.elementtype == "newTask-removeSubItem" && this.removableSubItemTest == true) {
      this.removableSubItem.remove();
      this.removableSubItemTest = false;
    } else if (
      document.activeElement.parentNode.dataset.elementtype == "newTask-subItem"
    ) {
      this.removableSubItem = document.activeElement.parentNode;
      this.removableSubItemTest = true;
    } else {
      this.removableSubItemTest = false;
    }
  },
  calculateETC() {
    const dueDate = new Date(document.getElementsByName("newTask-dueDate")[0].value).getTime()
    const startingDate = new Date().getTime();
    const days = (dueDate - startingDate) / 8.64e+7;
    const hours = (days - Math.floor(days)) * 24;
    const minuets = (hours - Math.floor(hours)) * 60;
    const etc = `ETC: Days ${Math.floor(days)} Hours ${Math.floor(hours)} Minutes ${Math.floor(minuets)}`;
    const etcContainer = document.getElementById("newTask-etcContainer");
    etcContainer.innerText = etc;
  }
};

function addNewTaskFormAppear(e) {
  if (e.target.id == "add-task") {
    let mask = document.createElement("div");
    mask.classList.add("blackMask");
    mask.innerHTML = `
          <form action="#" class="newTask">
        <span class="newTask-startingDateTime">${
          formController.todaysDate
        }</span>
        <label for="newTask-name" class="newTask-nameLabel">Task Name</label>
        <input type="text" name="newTask-name" class="newTask-name" autocomplete="off" required>
        <div class="newTask-infoBox1">
          <label for="newTask-dueDate" class="newTask-dueDateLabel"> Due Date: <input type="datetime-local"
              name="newTask-dueDate" class="newTask-dueDate" required></label>
          <label for="newTask-priority" class="newTask-priorityLabel">Priority: <select name="newTask-priority"
              class="newTask-priority">
              <option value="Urgent">Urgent</option>
              <option value="Important">Important</option>
              <option value="Not Important">Not Important</option>
            </select></label>
            <label for="newTask-group" class="newTask-groupLabel">
              Group: <select class="newTask-group">
               ${formController.currentProjects()}
              </select>
            </label>
        </div>
        <label for="newTask-description" class="newTask-descriptionLabel">Task description</label>
        <textarea name="newTask-description" class="newTask-description"></textarea>
        <label for="newTask-notes" class="newTask-notesLabel">Notes</label>
        <div class="newTask-notes" id="newTask-subItems">
        <div class="subItemsAdder">
          <div id="addSubTasks"></div>
          <div id="addSubNotes"></div>
        </div>
          <div class="newTask-noteContainer" data-elementType="newTask-subItem">
            <div class="removeSubItem" data-elementType="newTask-removeSubItem"></div>
            <p class="newTask-note" data-elementType="newTask-note"></p> 
          </div>
          <div class="newTask-checkItem" data-elementType="newTask-subItem">
            <div class="removeSubItem" data-elementType="newTask-removeSubItem"></div>
            <input type="text" class="newTask-checkItemLabel" placeholder="Enter your item..." data-elementType="newTask-task">
            <input type="checkbox" data-elementType="newTask-taskStatus">
          </div>
        </div>
        <div class="newTask-infoBox2">
          <span id="newTask-etcContainer" class="newTask-etc">
            ETC: Days 0 Hours 0 Minuets 0
          </span>
          <label class="newTask-addToHome">Add to HomePage<input type="checkbox" name="newTask-addToHome" checked></label>
        </div>
        <button class="newTask-addButton">Add Task</button>
      </form>
          `;

    document.body.appendChild(mask);
    document.getElementsByName("newTask-dueDate")[0].addEventListener("change", formController.calculateETC)
  }
}

function resetMain(e) {
  if (e.target.classList.contains("blackMask")) {
    document.body.removeChild(document.querySelector(".blackMask"));
  }
}

// Animation event listeners
window.addEventListener("click", addNewTaskFormAppear);
window.addEventListener("click", resetMain);
window.addEventListener("submit", resetMain);

// Functions event listeners
window.addEventListener("click", formController.addNewSubItem);
window.addEventListener("click", formController.removeSubItem);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/newTaskFormModule.js"));
/******/ }
]);
//# sourceMappingURL=newTaskCreation.bundle.js.map