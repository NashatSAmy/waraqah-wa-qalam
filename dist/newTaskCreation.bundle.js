(self["webpackChunkwaraqah_wa_qalam"] = self["webpackChunkwaraqah_wa_qalam"] || []).push([["newTaskCreation"],{

/***/ "./src/newTaskFormModule.js":
/*!**********************************!*\
  !*** ./src/newTaskFormModule.js ***!
  \**********************************/
/***/ (() => {

// Controller object that controls how the form works.
const formController = {
  todaysDate: `${new Date().toDateString()} ${new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`,
  subTasks: [],
  notes: [],
  removableSubItem: "",
  removableSubItemTest: false,

  currentProjects() {
    // Function that grabs all of the projects in the custom project list inside the navbar
    const projectsList = document.querySelectorAll(".project");
    const projectNames = [];
    projectsList.forEach((project) => projectNames.push(project.innerText));
    return projectNames.map((name) => `<option>${name}</option>`);
  },
  showNoteInput(e) {
    // Function that allow the user to input new sub-item task or note
    const notesAdder = document.getElementById("subItemsAdder");
    const notes = document.getElementById("newTask-subItems");
    if (e.target.id == "addSubTasks") {
      const taskInput = document.createElement("label");
      taskInput.classList.add("subTaskInputContainer");
      taskInput.innerHTML = `<input type="text" id="subTaskInput" maxlength="80"><button type="button" id="subTaskAddButton">Add Task</button>`;
      taskInput.addEventListener("focusout", () => setTimeout(() => {
        document.getElementById("subTaskInput").value = "";
        taskInput.remove()
      }, 150))
      notesAdder.appendChild(taskInput);
      document.getElementById("subTaskInput").focus();
      document.getElementById("subTaskAddButton").addEventListener("click", (e) => e.preventDefault())
      formController.postNote("subTaskInput");
    } else if (e.target.id == "addSubNotes") {
      const noteInput = document.createElement("label");
      noteInput.classList.add("subNoteInputContainer");
      noteInput.innerHTML = `<textarea id="subNoteInput" rows="4"></textarea> <button type="button" id="subNoteAddButton">Add Note</button>`;
      noteInput.addEventListener("focusout", () => setTimeout(() => {
        document.getElementById("subNoteInput").value = ""
        noteInput.remove()
      }, 150));
      notes.appendChild(noteInput);
      document.getElementById("subNoteInput").focus()
      formController.postNote("subNoteInput");
    }
    return;
  },
  postNote(id){
    // Function that post a note or a task to the DOM.
    const notes = document.getElementById("newTask-subItems");
    const subItemInput = document.getElementById(id);
    window.addEventListener("click", (e) => {
      if (e.target.id == "subTaskAddButton" && subItemInput.value.trim() !== "") {
        const newTask = document.createElement("div");
        newTask.classList.add("newTask-checkItem");
        newTask.setAttribute("data-elementType", "newTask-subItem");
        newTask.innerHTML = `<div class="removeSubItem" data-elementType="newTask-removeSubItem"></div>
          <label class="newTask-checkItemLabel" data-elementType="newTask-task">${subItemInput.value.trim()}</label>
          <input type="checkbox" data-elementType="newTask-taskStatus">`;
        notes.appendChild(newTask);
      } else if (e.target.id == "subNoteAddButton" && subItemInput.value.trim() !== "") {
        const newNote = document.createElement("div");
        newNote.classList.add("newTask-noteContainer");
        newNote.setAttribute("data-elementType", "newTask-subItem")
        newNote.innerHTML = `<div class="removeSubItem" data-elementType="newTask-removeSubItem"></div>
        <pre class="newTask-note" data-elementType="newTask-note">${subItemInput.value.trim()}</pre> `
        notes.appendChild(newNote);
      }
    })
  },
  removeSubItem(e) {
    // Function that allow users to delete sub-items with double click measures to prevent deleting by mistake
    if (e.target.dataset.elementtype == "newTask-removeSubItem" && this.removableSubItemTest == true && this.removableSubItem == e.target.parentNode) {
      this.removableSubItem.remove();
      this.removableSubItemTest = false;
    } else if (
      e.target.parentNode.dataset.elementtype == "newTask-subItem"
    ) {
      this.removableSubItem = e.target.parentNode;
      this.removableSubItemTest = true;
    } else {
      this.removableSubItemTest = false;
    }
  },
  calculateETC() {
    const dueDate = new Date(document.getElementsByName("newTask-dueDate")[0].value).getTime()
    const startingDate = new Date().getTime();
    const hours = (dueDate - startingDate) / 3.6e+6;
    const etc = `ETC: Hours ${Math.round(hours)}`;
    const etcContainer = document.getElementById("newTask-etcContainer");
    etcContainer.innerText = etc;
  }
};

function addNewTaskFormAppear(e) {
  // Function that add the new task form to the DOM
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
        <div id="subItemsAdder">
          <div title="Add Sub Task" id="addSubTasks"></div>
          <div title="Add Sub Note" id="addSubNotes"></div>
        </div>
        </div>
        <div class="newTask-infoBox2">
          <span id="newTask-etcContainer" class="newTask-etc">
            ETC: Hours 0
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
window.addEventListener("click", formController.showNoteInput);
window.addEventListener("click", formController.removeSubItem);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/newTaskFormModule.js"));
/******/ }
]);
//# sourceMappingURL=newTaskCreation.bundle.js.map