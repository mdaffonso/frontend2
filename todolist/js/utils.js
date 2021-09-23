// function:  createUID
// arguments: numberOfChars: number; the string length of the desired id
// return:    string
// use:       makes a unique HTML-valid string id compared to other objects in the STATE global
export const createUID = (numberOfChars) => {
  const validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let randomId = validChars[Math.floor(Math.random() * (validChars.length-10))]
  for (let i = 1; i < numberOfChars; i++) {
    randomId += validChars[Math.floor(Math.random() * validChars.length)]
  }

  return randomId
}

export const createMinDateString = () => {
  const today = new Date()
  const m = today.getMonth()+1
  const d = today.getDate()
  const month = `${m}`.length === 1 ? `0${m}` : m
  const day = `${d}`.length === 1 ? `0${d}` : d
  return `${today.getFullYear()}-${month}-${day}`
}

export const makeLocalDateString = (dateString) => {
  const dateParts = dateString.split("-")
  return dateString ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : null
}