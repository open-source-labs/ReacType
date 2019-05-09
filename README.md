# ReacType ![ReacType Logo](https://github.com/team-reactype/ReacType/blob/master/src/public/icons/png/64x64.png?raw=true)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/team-reactype/ReacType/pulls)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

**ReacType** is a visual prototyping tool for developers employing **React** component architecture alongside the comprehensive type checking of **TypeScript**.

**ReacType** allows the user to _visualize_ their application architecture dynamically, employing a _canvas display_, an _application tree_, and a _component code preview_. The user can create components and load _instances_ of these components, as well as nested HTML elements, onto the canvas. This architecture can then be _exported_ as TypeScript application files to be used as a starter template for any repository.

Download for [MacOS](), [Windows](), [Linux]().

![Image of ReacType Application](https://i.imgur.com/2sefnAk.jpg)

### How to use

- Open the application to start a new project. It will open in the root App component, with its name listed in the left panel and the component represented by the white box on the canvas.
- To add a new component, type its name in the upper left panel, in the field '**Add class component**', and press enter.
- To render a component **_instance_** to the screen, first select the component, or _parent_, that the instance will be rendered within. This selected component will be represented in a new canvas view, with its own white box. Then press the plus button next to the component name. An instance, or _child_, representation will appear on the canvas.
- To add draggable HTML elements, select the image icons on the lower left panel.
- The bottom panel allows the user to toggle between 4 different views: a tree diagram of the application, a preview of the exportable code, a form to enter component props, and a form to add HTML attributes.
- **_Props_** can be added to each component within its tab on bottom panel. Enter in a _key-value pair_, select its data _type_ and press the bottom 'ADD PROP'.
- **_HTML Element Attributes_** of class name and ID can be added to each HTML element after an HTML element has been rendered to the canvas.
- To **_delete_** a _child_ or instance from the canvas, select the desired instance and either press the _delete_ key.
- To **_delete_** a _component_, click the 'DELETE' button of the desired component in the left panel.
- To _start over_, select the blue 'CLEAR WORKSPACE' button in the left panel. This will **clear the entire application**.

![Image of ReacType Application 2](https://i.imgur.com/OCJ8nnw.png)

### To Export Files

- Once finished setting up the application template, press the green 'EXPORT PROJECT' button at the bottom of the left panel and choose between two options to export your files:
  1. Export the component files into a components folder. This option will allow a developer to add these files to an existing project.
  1. Export a new project with TypeScript config files and the component files. This option will allow a developer to immediately begin a new project.

#### Authors

[Christian Padilla](linkedin.com/in/ChristianEdwardPadilla) [@ChristianEdwardPadilla](https://github.com/ChristianEdwardPadilla)

[Tolga Mizrakci](linkedin.com/in/tolga-mizrakci) [@tolgamizrakci](https://github.com/tolgamizrakci)

[Shlomo Porges](linkedin.com/shlomoporges) [@shlomoporges](https://github.com/ShlomoPorges)

[Adam Singer](linkedin.com/in/adsing) [@spincycle01](https://github.com/spincycle01)

## To Run Your Own Version

- **Fork** and **Clone** Repository.
- Open project directory
- Install dependencies

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

### Logo Design

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/team-reactype/ReacType/blob/development/LICENSE.md) file for details.
