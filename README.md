
<p align="center">
  <img width="50" src="https://github.com/team-reactype/ReacType/blob/master/src/public/icons/png/256x256.png?raw=true">
  <h1 align="center">ReacType </h1>
</p>

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/team-reactype/ReacType/pulls)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

**ReacType** is a visual prototyping tool for developers employing **React** component architecture alongside the comprehensive type checking of **TypeScript**. 
In other words, **you can draw prototypes and export React / Typescript code!**

**ReacType** allows the user to _visualize_ their application architecture dynamically, employing a _canvas display_, an _application tree_, and a _real-time component code preview_. The user can create components and load _instances_ of these components, as well as nested HTML elements, onto the canvas. This architecture can then be _exported_ as TypeScript application files to be used as a starter template for any repository.

**New with version 2.0:** 
- React Native mode for iOS/Andoird app design
- Hooks integration with functional components
- History navigation
- Tutorial mode
- New keyboard shortcuts
- Editable code preview
- Prop value designation for component children

Download for [MacOS](https://github.com/team-reactype/ReacType/releases), [Windows](https://github.com/team-reactype/ReacType/releases/), [Linux](https://github.com/team-reactype/ReacType/releases/).

* **Mac users**: for now you might need to go to your security settings to allow the app run on your system as we do not have an Apple license yet.

* **Linux users**: run the application as a super user in order to read and write files.

![Image of ReacType Application](https://i.imgur.com/OgcP9II.png)

### How to use

- Open the application to start a new project. It will open in the root App component, with its name listed in the left panel and the component represented by the white box on the canvas.
- Switch to React Native mode to change the interface to a mobile app development environment
- To add a new component, type its name in the upper left panel, in the field '**Add class component**', and press enter.
- To render a component **_instance_** to the screen, first select the component, or _parent_, that the instance will be rendered within. This selected component will be represented in a new canvas view, with its own white box. Then press the plus button next to the component name. An instance, or _child_, representation will appear on the canvas.
- To add draggable **HTML elements**, select the image icons on the lower left panel.

![Gif of adding](https://i.imgur.com/hdVTFcP.gif)

- The bottom panel allows the user to toggle between 4 different views: a **tree diagram of the application**, a **real-time preview of the exportable code**, a form to enter component props, and a form to add HTML attributes.

- **_Props_** can be added to each component within its tab on bottom panel. Enter in a _key-value pair_, select its data _type_ and press the bottom 'ADD PROP'.
- **_HTML Element Attributes_** of class name and ID can be added to each HTML element after an HTML element has been rendered to the canvas.

![Gif of attr & props](https://i.imgur.com/cmgOLLN.gif)

- To **_delete_** a _child_ or instance from the canvas, select the desired instance and either press the _delete_ key.
- To **_delete_** a _component_, click the 'DELETE' button of the desired component in the left panel.
- To _start over_, select the blue 'CLEAR WORKSPACE' button in the left panel. This will **clear the entire application**.

### To Export Files

- Once finished setting up the application template, press the green 'EXPORT PROJECT' button at the bottom of the left panel and choose between two options to export your files:
  1. Export the component files into a components folder. This option will allow a developer to add these files to an existing project.
  1. Export a new project with TypeScript config files and the component files. This option will allow a developer to immediately begin a new project.

#### Contributors

[Adam Singer](https://linkedin.com/in/adsing) [@spincycle01](https://github.com/spincycle01)

[Charles Finocchiaro](https://www.linkedin.com/in/charles-finocchiaro-62440040/) [@null267](https://github.com/null267)

[Chelsey Fewer](https://www.linkedin.com/in/chelsey-fewer/) [@chelseyeslehc](https://github.com/chelseyeslehc)

[Christian Padilla](https://linkedin.com/in/ChristianEdwardPadilla) [@ChristianEdwardPadilla](https://github.com/ChristianEdwardPadilla)

[Eliot Nguyen](https://linkedin.com/in/ibeeliot) [@ibeeliot](https://github.com/ibeeliot)

[Jesse Zuniga](https://linkedin.com/in/jesse-zuniga) [@jzuniga206](https://github.com/jzuniga206)

[Mitchel Severe](https://www.linkedin.com/in/misevere/) [@mitchelsevere](https://github.com/mitchelsevere)

[Natalie Vick](https://www.linkedin.com/in/vicknatalie/) [@natattackvick](https://github.com/natattackvick)

[Nel Malikova](https://www.linkedin.com/in/gmalikova/) [@gmal1](https://github.com/gmal1)

[Sean Sadykoff](https://www.linkedin.com/in/sean-sadykoff/) [@sean1292](https://github.com/sean1292)

[Shlomo Porges](https://linkedin.com/shlomoporges) [@shlomoporges](https://github.com/ShlomoPorges)

[Sophia Huttner](https://www.linkedin.com/in/sophia-huttner-68315975/) [@sophjean](https://github.com/sophjean)

[Tolga Mizrakci](https://linkedin.com/in/tolga-mizrakci) [@tolgamizrakci](https://github.com/tolgamizrakci)

[Tony Ito-Cole](https://linkedin.com/in/tony-ito-cole) [@tonyito](https://github.com/tonyito)

## To Run Your Own Version

- **Fork** and **Clone** Repository.
- Open project directory
- Install dependencies

- npm works in place of yarn as well.

```bash
yarn install
```

- Run application

```bash
yarn start
```

- For development experience, in one terminal...

```bash
yarn run dev
```

- and on another terminal

```bash
yarn run electron
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/team-reactype/ReacType/blob/development/LICENSE.md) file for details.
