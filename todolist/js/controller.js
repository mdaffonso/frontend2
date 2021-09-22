import { render } from "./view.js"
import { addToState, removeFromState, modifyState, initializeState, state, prevState } from "./state.js"
import { triggerDeletion, triggerMutation } from "./differentiation.js"
import { store } from "./utils.js"

const middleware = (callback, payload) => {
  callback(payload)
  store(state)
}

const dispatch = (operation, payload) => {
  switch (operation) {
    case "create":
      return middleware(addToState, payload)

    case "modify":
      return middleware(modifyState, payload)

    case "delete":
      return middleware(removeFromState, payload)

    default:
      initializeState()
      return
  }
}

export const execute = (operation, payload) => {
  const diff = {
    "delete": () => triggerDeletion(state, prevState),
    "create": () => triggerMutation(state, prevState),
    "modify": () => triggerMutation(state, prevState),
    "init": () => triggerMutation(state, prevState)
  }
  dispatch(operation, payload)
  render(state, diff[operation]())
}