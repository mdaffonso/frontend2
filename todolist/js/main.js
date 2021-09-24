import * as Actions from "./constants.js"
import { createMinDateString } from "./utils.js"
import { _, _create } from "./viewUtils.js"
import { execute } from "./controller.js"
import { state } from "./state.js"
import { checkEmpty, createTaskView, toggleSettings, formSubmitHandler, toggleTheme, suggestTask } from "./view.js"

const init = (state) => {
  for (let task of state) {
    createTaskView(task)
  }
  checkEmpty()
}

_("form").addEventListener("submit", formSubmitHandler)

window.addEventListener("load", () => { init(state) })
window.addEventListener("click", () => { toggleSettings(false) })

_(".btn-restore").addEventListener("click", () => { execute(Actions.RECOVER_TASK) })
_("#settings-button").addEventListener("click", (event) => {
  event.stopPropagation()
  toggleSettings()
})
_("#settings-blurb").addEventListener("click", (event) => event.stopPropagation())
_("#theme-button").addEventListener("click", toggleTheme)
_("#suggest-button").addEventListener("click", suggestTask)

_("#due-date").setAttribute("min", createMinDateString())