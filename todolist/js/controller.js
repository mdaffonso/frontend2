import { createTaskView, deleteTaskView, modifyTaskView, recoverTaskView, checkEmpty } from "./view.js"
import { state, addToState, modifyState, removeFromState, restoreDeleted, store } from "./state.js"
import { createUID, createMinDateString } from "./utils.js"
import * as Actions from "./constants.js"

export const createTask = (description, date) => {
  const baseId = createUID(50)
  const creationDate = createMinDateString()

  const newTask = {
    id: baseId,
    dueDate: date,
    creationDate,
    done: false,
    description
  }

  execute(Actions.CREATE_TASK, newTask)
}

export const execute = (action, payload) => {
  let newState
  switch (action) {
    case Actions.CREATE_TASK:
      createTaskView(payload)
      newState = addToState(payload)
      return store(newState)
      
    case Actions.MODIFY_TASK:
      modifyTaskView(payload)
      newState = modifyState(payload)
      return store(newState)

    case Actions.DELETE_TASK:
      deleteTaskView(payload)
      newState = removeFromState(payload)
      return store(newState)

    case Actions.RECOVER_TASK:
      recoverTaskView()
      newState = restoreDeleted()
      return store(newState)

    default:
      checkEmpty()
      return state
  }
}