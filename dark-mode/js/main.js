const button = document.querySelector(".dark-mode-toggle button")
const buttonIcon = document.querySelector(".dark-mode-toggle button div")
const root = document.querySelector(":root")
let theme = "main"

const themes = [
  {
    name: "main",
    pallette: [
      {
        key: "--main",
        value: "rgb(219, 219, 219)"
      },
      {
        key: "--secondary",
        value: "rgb(1, 100, 146)"
      },
      {
        key: "--accent",
        value: "rgb(241, 241, 241)"
      },
      {
        key: "--body",
        value: "rgb(71, 71, 71)"
      },
      {
        key: "--sky",
        value: "rgb(107, 166, 255)"
      },
      {
        key: "--icon",
        value: "rgb(251, 255, 0)"
      }
    ]
  },

  {
    name: "alternate",
    pallette: [
      {
        key: "--main",
        value: "rgb(32, 30, 30)"
      },
      {
        key: "--secondary",
        value: "rgb(243, 188, 32)"
      },
      {
        key: "--accent",
        value: "rgb(52, 49, 49)"
      },
      {
        key: "--body",
        value: "rgb(220, 220, 220)"
      },
      {
        key: "--sky",
        value: "rgb(18, 11, 35)"
      },
      {
        key: "--icon",
        value: "rgb(254, 255, 196)"
      }
    ]
  }
]

const isDarkModeEnabled = () => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

const changeRootProperty = (prop, value) => {
  root.style.setProperty(prop, value)
}

const setTheme = () => {
  switch(theme) {
    case "alternate":
      return "main"
    case "main":
      return "alternate"
  }
}

const cycleProps = (theme) => {
  const newThemeProps = themes.find(t => t.name === theme).pallette
  for (let prop of newThemeProps) {
    changeRootProperty(prop.key, prop.value)
  }
}

const toggleTheme = () => {
  theme = setTheme()
  cycleProps(theme)

  buttonIcon.classList.toggle("dm")
}

button.addEventListener("click", toggleTheme)
window.onload = () => {
  setTimeout(() => {
    if(isDarkModeEnabled())
      toggleTheme()
  }, 250)
}