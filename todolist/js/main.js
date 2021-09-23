import * as Actions from "./constants.js"
import { createMinDateString } from "./utils.js"
import { _, _create } from "./viewUtils.js"
import { execute } from "./controller.js"
import { state } from "./state.js"
import { checkEmpty, createTaskView, toggleSettings, formSubmitHandler, toggleTheme } from "./view.js"

const init = (state) => {
  for (let task of state) {
    createTaskView(task)
  }
  checkEmpty()
}

_("form").addEventListener("submit", formSubmitHandler)

window.addEventListener("load", () => { init(state) })

_(".btn-restore").addEventListener("click", () => { execute(Actions.RECOVER_TASK) })
_("#settings-button").addEventListener("click", toggleSettings)
_("#theme-button").addEventListener("click", toggleTheme)

_("#due-date").setAttribute("min", createMinDateString())