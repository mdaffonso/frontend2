export let state = []
export let prevState = []

export const addToState = (object) => {
  prevState = [
    ...state
  ]

  state = [
    ...state,
    object
  ]
}

export const removeFromState = (id) => {
  const substrId = id.substring(5)
  prevState = [...state]
  state = state.filter(item => item.id !== substrId)
}

export const modifyState = (object) => {
  prevState = [...state]
  state = [ 
    ...state.filter(item => item.id !== object.id), 
    object 
  ]
}

export const initializeState = () => {
  state = JSON.parse(localStorage.getItem("todo")) || []
  prevState = []
}