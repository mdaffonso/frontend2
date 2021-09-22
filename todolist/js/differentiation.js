export const triggerMutation = (newState, prevState) => {
  const diff = []
  for (let item of newState) {
    let changed = false
    const existsInPrevState = prevState.find(value => item.id === value.id)
    if (!existsInPrevState) diff.push(item)
    else {
      Object.entries(existsInPrevState).forEach(k => {
        if(k[1] !== item[k[0]]) {
          changed = true
        }
      })

      if (changed) diff.push(item)
    }
  }

  return diff
}

export const triggerDeletion = (newState, prevState) => {
  const diff = []
  for (let item of prevState) {
    const notDeleted = newState.find(value => item.id === value.id)
    if (!notDeleted) diff.push(item)
  }

  return diff
}