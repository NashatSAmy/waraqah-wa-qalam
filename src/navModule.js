// Information Holder object
const navInfo = {
  projectsNames: ["My Projects"],
};

// Service Provider object.
const navDomManipulation = {
  // This method update the custom projects section on the user screen using data from an array.
  updateCustomProjects(projectsNames) {
    const projectsList = document.querySelector(".costume-projects");
    projectsNames.slice(projectsNames.length - 1).forEach((projectName) => {
      let listItem = document.createElement("li");
      listItem.classList.add("nav-item", "project");
      listItem.innerText = projectName;
      projectsList.appendChild(listItem);
    });
  },
  // This method removes a selected project name from the users screen.
  removeProject(removedProject) {
    removedProject.parentNode.removeChild(removedProject);
  },
  navNewItemError(newProjectName) {
    newProjectName.value = "INVALID ENTRY...";
    document.getElementById("newProject").classList.add("errorAlert");
    setTimeout(() => {
      newProjectName.value = "";
      document.getElementById("newProject").classList.remove("errorAlert");
    }, 1200);
  },
};

// Service Provider object.
const navInfoEditing = {
  // This method adds new project name entered by the user to the projectsNames array.
  addNewProjectName(projectsNames, newProjectName) {
    projectsNames.push(newProjectName.value.trim());
  },

  // This method removes a project name selected by the user from the projectsNames array.
  removeProjectName(deletedProjectName, projectsNames) {
    projectsNames = projectsNames.filter(
      (projectName) => projectName !== deletedProjectName
    );
    return projectsNames;
  },
};

// Coordinator object.
const navCoordinator = {
  navUpdate() {
    navDomManipulation.updateCustomProjects(navInfo.projectsNames);
  },
};

// Controller object.
const navController = {
  navRemoveItem(e) {
    if (!e.target.classList.contains("removeProject")) return;
    const project = e.target;
    const deletedProjectName = project.innerText;
    navDomManipulation.removeProject(project);
    navInfo.projectsNames = navInfoEditing.removeProjectName(
      deletedProjectName,
      navInfo.projectsNames
    );
    localStorage.setItem("projectsNames", JSON.stringify(navInfo.projectsNames))
  },

  navNewItem(e) {
    e.preventDefault();
    const newProjectName = document.getElementById("newProject-name");
    const validationTest = /\w/;
    if (validationTest.test(newProjectName.value) == true) {
      navInfoEditing.addNewProjectName(navInfo.projectsNames, newProjectName);
      newProjectName.value = "";
      navCoordinator.navUpdate();
      localStorage.setItem("projectsNames", JSON.stringify(navInfo.projectsNames))
      resetAllNav();
    } else {
      navDomManipulation.navNewItemError(newProjectName);
    }
  },

  updateNavProjectsNamesListFromLS() {
    if (!localStorage.getItem("projectsNames")) {
      localStorage.setItem("projectsNames", JSON.stringify(navInfo.projectsNames))
    };
    const projectsList = document.querySelector(".costume-projects");
    navInfo.projectsNames = JSON.parse(localStorage.getItem("projectsNames"));
    navInfo.projectsNames.forEach((projectName) => {
      let listItem = document.createElement("li");
      listItem.classList.add("nav-item", "project");
      listItem.innerText = projectName;
      projectsList.appendChild(listItem);
    });
  }
};

// Animations!!!!!!!!!!!!!!!!!!!

// This function is responsible for the selection animation of the nav-bar items.
function selectNavTabAnimation(e) {
  if (!e.target.classList.contains("nav-item")) {
    return;
  }
  if (e.target.classList.contains("nav-selected")) {
    return;
  } else {
    let navItems = document.querySelectorAll(".nav-selected");
    navItems.forEach((item) => item.classList.remove("nav-selected"));
    e.target.classList.add("nav-selected");
  }
}

// This function make the add new project form appear.
function addNewProjectAnimation(e) {
  if (e.target.id != "project-h1") {
    return;
  } else {
    document.getElementById("newProject").classList.add("appear");
    document.getElementById("newProject-name").focus();
  }
}

// This function is responsible for the deleting animation of the custom project section.
function deleteProjectAnimation(e) {
  if (e.target.id == "projectDelete") {
    document
      .querySelectorAll(".project")
      .forEach((project) => project.classList.add("removeProject"));
  }
}

// This function is responsible for resting the nav-bar to its original state.
function resetAllNav() {
  document
    .querySelectorAll(".project")
    .forEach((project) => project.classList.remove("removeProject"));
  document.getElementById("newProject").classList.remove("appear");
}

//Functions eventlistener
window.addEventListener("click", navController.navRemoveItem);
document
  .getElementById("newProject")
  .addEventListener("submit", navController.navNewItem);
document
  .getElementById("add-newProject")
  .addEventListener("click", navController.navNewItem);

//Animations eventlistener
document.querySelector("MAIN").addEventListener("click", resetAllNav);
window.addEventListener("click", selectNavTabAnimation);
window.addEventListener("click", addNewProjectAnimation);
window.addEventListener("click", deleteProjectAnimation);

navController.updateNavProjectsNamesListFromLS()