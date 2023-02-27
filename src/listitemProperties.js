// Function that sets the due date of an item.
const setDueDate = ({ id }) => {
  return {
    test: (dueDate) => (eval(id).dueDate = dueDate),
  };
};

// Function that sets the due time of an item.
const setDueTime = ({ id }) => {
  return {
    test: (dueTime) => (eval(id).dueTime = dueTime),
  };
};

// Function that change the completion status of an item.
const changeStatus = ({ name }) => {
  return {
    statusChange: () =>
      eval(name).status == false
        ? (eval(name).status = true)
        : (eval(name).status = false),
  };
};

// Function that estimates the time of completion depending on the due date, time and the starting date, time
const getETC = ({ name }) => {
  return {
    time: () => {
      const differenceInMilSec =
        new Date(`${eval(name).dueDate} ${eval(name).dueTime}`).getTime() -
        new Date(
          `${eval(name).startingDate} ${eval(name).startingTime}`
        ).getTime();

      const differenceInMinutes = Math.round(differenceInMilSec / 60000);

      const differenceInHours = Math.floor(differenceInMilSec / (1000 * 3600));

      const differenceInDays = Math.floor(
        differenceInMilSec / (1000 * 3600 * 24)
      );

      return `${differenceInDays} Day ${differenceInHours} Hours ${differenceInMinutes} Minutes`;
    },
  };
};

// Function that add or remove tags form items tags list
const addOrRemoveTag = ({ name }) => {
  return {
    addTag: (tag) => {
      eval(name).tags.push(tag.toLowerCase());
    },
    removeTag: (tag) => {
      eval(name).tags = eval(name).tags.filter(
        (item) => item !== tag.toLowerCase()
      );
    },
  };
};

// Function that adds the item to the homepage.
const addToHome = ({ name }) => {
  return {
    addToHome: () =>
      eval(name).homeItem == false
        ? eval(name).homeItem == true
        : eval(name).homeItem == false,
  };
};

// Function that add or remove a subitem to a list item.
const addSubItem = ({ name }) => {
  return {
    addSubItem: (itemType, itemContent) =>
      eval(name).subItems.push({
        type: itemType,
        content: itemContent,
        itemID: `#${itemType}-${eval(name).subItems.length}${itemContent[0]}`,
      }),
    removeSubItem: (ID) => {
      eval(name).subItems = eval(name).subItems.filter(
        (subItem) => subItem.itemID !== ID
      );
    },
  };
};

// Function that add the item to a group or remove it from a group.
const addOrRemoveGroup = ({ name }) => {
  return {
    addTag: (group) => {
      eval(name).groups.push(group.toLowerCase());
    },
    removeTag: (group) => {
      eval(name).groups = eval(name).groups.filter(
        (item) => item !== group.toLowerCase()
      );
    },
  };
};

// Function that starts and stops the stopwatch timer of an item.
const stopWatch = ({name}) => {
  return {
    startStopWatch: () => {
      const stopWatchSeconds = setInterval(() => {
        eval(name).stopWatchTime++
      }, 1000);
      
      eval(name).stopWatch = stopWatchSeconds;
    },
    stopStopWatch: () => {
      clearInterval(eval(name).stopWatch)
    }
  }
}

// Function that starts and pause the pomodoro timer and responsible for all its functionality.
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
