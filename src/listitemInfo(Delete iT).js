// This is an information holder object that holds all of the information related to a list item

const listItemInformation = (name) => {
  const date = new Date();
  let description = "";
  const startingDate = date.toDateString();
  let dueDate = "";
  const startingTime = date.toLocaleTimeString();
  let dueTime = "";
  let status = false;
  let ETC = "";
  let tags = [];
  let groups = [];
  let homeItem = false;
  let subItems = [];
  let stopWatchTime = 0; // In seconds
  let pomodoroCount = 0;
  let pomodoroLimit = 25;
  let pomoBreakLimit = 5;
  let pomodoroTime = 0;
  let pomoBreakTime = 0;

  return {
    name,
    description,
    startingDate,
    startingTime,
    dueDate,
    dueTime,
    status,
    ETC,
    tags,
    homeItem,
    subItems,
    pomodoroCount,
    stopWatchTime,
    groups,
    pomodoroLimit,
    pomoBreakLimit,
    pomodoroTime,
    pomoBreakTime,
  };
};

const pomodoroTimer = ({ name }) => {
  return {
    startPomodoro: () => {
      const pomodoroTimer = setInterval(() => {
        eval(name).pomodoroTime++

        if (eval(name).pomodoroTime == eval(name).pomodoroLimit * 60) {
          clearInterval(pomodoroTimer);
          eval(name).pomodoroTime = 0;
          eval(name).pomodoroCount++;

          const breakTime = setInterval(() => {
            eval(name).pomoBreakTime++;
          }, 1000);

          const pomoReset = setTimeout(() => {
            clearInterval(breakTime);
            eval(name).pomoBreakTime = 0;
            eval(name).startPomodoro();
          }, eval(name).pomoBreakLimit * 60000);
          eval(name).pomoReset = pomoReset;
        }
      }, 1000)
      eval(name).pomodoroTimer = pomodoroTimer;
    },
    stopPomodoro: () => {
      clearInterval(eval(name).pomodoroTimer);
      clearTimeout(eval(name).pomoReset);
    },
  };
};

const itemMaker = (name) => {
  const item = listItemInformation(name);

  return {
    ...item,
    ...pomodoroTimer(item),
  };
};

