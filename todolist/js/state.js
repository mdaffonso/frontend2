export let state = JSON.parse(localStorage.getItem("todo")) || []
export let prevState = []
export let lastDeleted = {}

export const addToState = (object) => {
  prevState = [
    ...state
  ]

  state = [
    ...state,
    object
  ]

  return state
}

export const removeFromState = (id) => {
  prevState = [...state]
  state = state.filter(item => item.id !== id)
  const deleted = prevState.find(v => v.id === id)
  if (deleted) {
    lastDeleted = {...deleted}
  }

  return state
}

export const modifyState = (object) => {
  prevState = [...state]
  state = [ 
    ...state.filter(item => item.id !== object.id), 
    object 
  ]
  return state
}

export const restoreDeleted = () => {
  prevState = [...state]
  state = [
    ...state,
    lastDeleted
  ]
  lastDeleted = {}
  return state
}

export const store = (newState) => {
  localStorage.setItem("todo", JSON.stringify(newState))
}