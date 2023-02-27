const main = () => {
  document.body.innerHTML = `
    <header>
        <h1>Waraqah wa Qalam</h1>
    </header>
    <nav>
        <div id="projectDelete"></div>
        <ul class="default-groups">
        <li class="nav-item nav-selected">Home</li>
        <li class="nav-item">Today</li>
        <li class="nav-item">Tomorrow</li>
        </ul>
        <h1 id="project-h1">Projects</h1>
        <ul class="costume-projects">
        <form action="#" id="newProject">
            <input type="text" name="addProject" id="newProject-name" placeholder="ex.School" maxlength="22" autocomplete="off">
            <button type="button" id="add-newProject">ADD</button>
        </form>
        </ul>
    </nav>
    <main>
        <div id="add-task"></div>
        <ul class="task-list">

        </ul>
  </main>
    `;
};


main();







