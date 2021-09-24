export const getRandomTask = async () => {
  const randomTaskFetch = await fetch("https://www.boredapi.com/api/activity")
  const randomTaskJson = await randomTaskFetch.json()
  const randomTask = randomTaskJson.activity

  return randomTask
}