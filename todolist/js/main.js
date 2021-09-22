import { createUID, createMinDateString } from "./utils.js"
import { _ } from "./viewUtils.js"
import { execute } from "./controller.js"

const createTask = (description, date) => {
  const baseId = createUID(50)

  const newTask = {
    id: baseId,
    dueDate: date,
    done: false,
    description
  }

  execute("create", newTask)
}

_("form").addEventListener("submit", (event) => {
  event.preventDefault()
  const description = _("#create").value
  const dueDate = _("#due-date").value || ""
  createTask(description, dueDate)
})

window.addEventListener("load", () => {
  execute("init")
})

_("#due-date").setAttribute("min", createMinDateString())