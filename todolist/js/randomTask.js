export const getRandomTask = async () => {
  try {
    const randomTaskFetch = await fetch("https://www.boredapi.com/api/activity")
    const randomTaskJson = await randomTaskFetch.json()
    const randomTask = randomTaskJson.activity
  
    return randomTask
  } catch {
    throw new Error("Couldn't suggest a task... :(")
  }
}