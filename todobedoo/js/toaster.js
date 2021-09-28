import { _, _ap, _create } from "./viewUtils.js"
import { createUID } from "./utils.js"

class Toaster {
  constructor() {
    this.time = 5000
    this.id = `toaster-${createUID(5)}`
    const toaster = _create({
      tag: "div",
      id: this.id,
      classList: [ "toaster" ],
      attributes: [
        { key: "data-open", value: "false" },
        { key: "data-transition", value: "false" }
      ]
    })
    _ap(_("body"), toaster)
    this.el = _(`#${this.id}`)
    this.timeout = null
  }

  debouncedTimeout(callback) {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      callback()
    }, this.time)
  }

  show(message) {
    this.el.setAttribute("data-open", "true")
    this.el.innerHTML = message
    this.debouncedTimeout(() => this.remove())
  }

  remove() {
    this.el.setAttribute("data-open", "false")
    this.el.setAttribute("data-transition", "true")
    this.debouncedTimeout(() => {
      this.el.setAttribute("data-transition", "false")
      this.el.innerHTML = ""
    })
  }
}

export default new Toaster()