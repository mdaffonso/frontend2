import { execute } from "./controller.js"
import { _, _ap, _create } from "./viewUtils.js"
import { makeLocalDateString } from "./utils.js"


const removeTaskView = (id) => {
  console.log(id)
  _(`#task-${id}`).setAttribute("data-transition", "true")
  setTimeout(() => _(`#task-${id}`).remove(), 200)
}

const modifyTaskView = (task) => {
  const parent = _(`#task-${task.id}`)
  parent.innerHTML = ""
  renderTask(task, parent)
}

const deleteTask = (id) => {
  execute("delete", id)
}

export const renderTaskShell = (task) => {
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
    ]
  })

  _ap(_("main"), newTask)
}

const renderTask = (task, parent) => {
  const deleteButton = _create({
    tag: "button",
    textContent: "×",
    events: [
      {
        type: "click",
        callback: () => {
          deleteTask(task.id)
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

  const taskDate = _create({
    tag: "p",
    textContent: makeLocalDateString(task.dueDate),
    classList: ["due-date"]
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
          execute("modify", { ...task, done: !task.done})
        }
      }
    ]
  })

  _ap(parent, taskCheckbox, taskText, deleteButton, taskDate)
}

export const render = (state, items) => {
  for (let item of items) {
    const existingItem = state.find(v => v.id === item.id)
    const actionMatrix = [
      { 
        name: "create",
        action: () => {
          renderTaskShell(item),
          renderTask(item, _(`#task-${item.id}`))
        }
      },
      {
        name: "modify",
        action: () => {
          modifyTaskView(item)
        }
      },
      {
        name: "delete",
        action: () => {
          console.log("delete")
          removeTaskView(item.id)
        }
      }
    ]


    let action
    if (existingItem) {
      Object.keys(item).forEach(k => {
        if (k[1] !== item[k[0]]) action = "modify"
      })

      if (!actionMatrix[1].state) action = "create"
    } else action = "delete"

    const actionObject = actionMatrix.find(v => v.name === "action") || actionMatrix[0]
    actionObject.action()
  }
}