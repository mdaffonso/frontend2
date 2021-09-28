import { _, _ap, _create } from "./viewUtils.js"
import { makeLocalDateString } from "./utils.js"
import { execute, createTask } from "./controller.js"
import * as Actions from "./constants.js"
import toaster from "./toaster.js"
import { lastDeleted } from "./state.js"
import { getRandomTask } from "./randomTask.js"

export const checkEmpty = () => {
  const listOfTasks = document.querySelectorAll(".task")
  _("#empty-tooltip").setAttribute("data-hide", listOfTasks.length > 0 ? "true" : "false")
}

export const deleteTaskView = (id) => {
  _(`#task-${id}`).setAttribute("data-transition", "true")
  setTimeout(() => {
    _(`#task-${id}`).remove()
    checkEmpty()
  }, 200)

  _(".btn-restore").setAttribute("data-show", "true")
  _(".btn-restore").disabled = false

  toaster.show("Task removed successfully. <button id='recover'>Undo.</button>")
  _("#recover").addEventListener("click", () => {
    _("#recover").disabled = true
    execute(Actions.RECOVER_TASK)
    toaster.remove()
  })
}

export const modifyTaskView = (task) => {
  const taskToModify = _(`#task-${task.id}`)
  const listOfTasks = document.querySelectorAll(".task")
  let indexOfTask = 0
  for (let [index, task] of listOfTasks.entries()) {
    if (taskToModify === task) {
      indexOfTask = index
      break
    }
  }

  const modifiedTask = renderTask(task)
  modifiedTask.setAttribute("data-rerender", "true")
  taskToModify.remove()

  if (listOfTasks.length === 1 || indexOfTask === listOfTasks.length - 1) {
    _ap(_("main"), modifiedTask)
    return
  }
  
  listOfTasks[indexOfTask+1].before(modifiedTask)
}

export const recoverTaskView = () => {
  if (!lastDeleted.id) return
  createTaskView(lastDeleted)
  _(".btn-restore").setAttribute("data-show", "false")
  _(".btn-restore").disabled = true
}

export const createTaskView = (task) => {
  const newTask = renderTask(task)
  _ap(_("main"), newTask)
  checkEmpty()
}

const compareDates = (object) => {
  if (!object.dueDate) return "good"

  const dueDateArray = object.dueDate.split("-")
  const dueDate = new Date(dueDateArray[0], dueDateArray[1]-1, dueDateArray[2])
  dueDate.setHours(0, 0, 0, 0)
  const d = dueDate.valueOf()

  const todayDate = new Date()
  todayDate.setHours(0, 0, 0, 0)
  const t = todayDate.valueOf()

  if (d === t) return "warning"
  if (d < t) return "alert"
  return "good"
}

const renderTask = (task) => {

  const taskBg = compareDates(task)

  const newTask = _create({
    tag: "div",
    id: `task-${task.id}`,
    classList: [
      "task"
    ],
    attributes: [
      { key: "data-visible", value: "true" },
      { key: "data-transition", value: "false" },
      { key: "data-done", value: task.done },
      { key: "data-due", value: taskBg }
    ]
  })

  const deleteButton = _create({
    tag: "button",
    textContent: "×",
    attributes: [
      { key: "aria-label", value: "delete task" },
      { key: "data-tooltip", value: "delete task" }
    ],
    events: [
      {
        type: "click",
        callback: () => {
          execute(Actions.DELETE_TASK, task.id)
        }
      }
    ]
  })

  const taskText = _create({
    tag: "label",
    textContent: task.description,
    attributes: [
      {key: "for", value: `checkbox-${task.id}`}
    ]
  })

  const dates = _create({
    tag: "div",
    classList: [ "dates" ]
  })

  const taskCreationDate = _create({
    tag: "p",
    textContent: makeLocalDateString(task.creationDate),
    classList: ["date", "creation"]
  })

  const taskDueDate = _create({
    tag: "p",
    textContent: makeLocalDateString(task.dueDate),
    classList: ["date", "due"]
  })

  const taskCheckbox = _create({
    tag: "input",
    type: "checkbox",
    name: `checkbox-${task.id}`,
    id: `checkbox-${task.id}`,
    checked: task.done,
    events: [
      {
        type: "change",
        callback: () => {
          execute(Actions.MODIFY_TASK, { ...task, done: !task.done})
        }
      }
    ]
  })

  _ap(dates, taskCreationDate, taskDueDate)
  _ap(newTask, taskCheckbox, taskText, deleteButton, dates)
  return newTask
}

export const toggleSettings = (force) => {
  const matrix = {
    "true": "false",
    "false": "true"
  }

  const current = typeof force === "boolean" ? `${!force}` : _("#settings-blurb").getAttribute("data-show")

  _("#settings-blurb").setAttribute("data-show", matrix[current])
  setTimeout(() => {
    _("#settings-blurb").setAttribute("data-transition", matrix[current])
  }, 200)
}

export const formSubmitHandler = (event) => {
  if(_("#error")) {
    _("#error").remove()
  }

  event.preventDefault()
  const description = _("#create").value.trim()
  const dueDate = _("#due-date").value || ""

  if (!description || description.length < 10) {
    _("#suggest-button").after(_create({
      tag: "p",
      textContent: "The description must have at least 10 characters...",
      classList: ["error"],
      id: "error"
    }))
    return
  }

  createTask(description, dueDate)
  _("#create").value = ""
  _("#due-date").value = ""
}

export const toggleTheme = () => {
  const matrix = {
    "light": "dark",
    "dark": "light",
  }

  const curr = _("body").getAttribute("data-theme")

  _("body").setAttribute("data-theme", matrix[curr] || "light")

  localStorage.setItem("theme", matrix[curr] || "light")
}

export const suggestTask = () => {
  setLoading(_("#suggest-button"), true)
  getRandomTask()
    .then(res => {
      _(`#create`).value = res
    })
    .catch(error => {
      toaster.show(error)
    })
    .finally(() => setLoading(_("#suggest-button"), false))
}

const setLoading = (element, bool) => {
  _("#suggest-button").disabled = bool
  element.setAttribute("data-loading", `${bool}`)
}