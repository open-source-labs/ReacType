<p align="center">
  <img width="50" src=https://i.imgur.com/Z2aKWji.png?1>
  <h1 align="center">ReacType </h1>
</p>
 -->
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/team-reactype/ReacType/pulls)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Release: 4.0](https://img.shields.io/badge/Release-4.0-orange)

**ReacType** is a visual prototyping tool for developers employing **React** component architecture alongside the comprehensive type checking of **TypeScript**.
In other words, **you can draw prototypes and export React / Typescript code!**

**ReacType** allows the user to _visualize_ their application architecture dynamically, employing a _drag-and-drop canvas display_ and a _real-time component code preview_. The user can create components and drag _instances_ of these components, as well as HTML elements, onto the canvas. This architecture can then be _exported_ as TypeScript application files to be used as a starter template for any repository.

**New with version 4.0:**

- View dynamically created components/HTML elements in the component tree
- View Typescript syntax for React
- Code preview is fully editable (make changes before exporting project)
- Create custom HTML elements
- Improved UI experience
- Implemented a comprehensive tutorial page with images

Download for [MacOS](https://github.com/team-reactype/ReacType/releases), [Windows](https://github.com/team-reactype/ReacType/releases/), [Linux](https://github.com/team-reactype/ReacType/releases/).

- **Mac users**: After opening the dmg and dragging ReacType into your Applications folder, ctrl+click the icon and select 'Open' from the context menu to run the app. This extra step is necessary since we don't have an Apple developer license yet.

- **Windows users**: Install the application by running ReacType Setup 4.0.0.exe.

- **Linux users**: Run the application as a super user in order to read and write files.

![Gif of adding](https://i.imgur.com/Ioqkr00.gif)

### How to use

- **Sign-in page**: Sign up for an account, authenticate via Github/Facebook, or just continue as a guest.
- **Tutorial**: Click ‘Tutorial’ from the help tab’s drop-down menu of the help tab at the top left of the application to view a tutorial page.
- **Start a project (only after authenticating)**: After you authenticate via Github/Facebook, create a new project, and select whether you want your project to be a Next.js or a classic React project. Also, save your project so that you can return to it at a later time.
- **Add Components**: Create components on the left panel. Components can be associated with a route, or they can be used within other components.
- **Delete Components**: Delete components after focusing on them from the right panel. Be careful when deleting components because all instances of the component will be deleted within the application/project.
- **Add Custom Elements**: Create custom elements or add HTML elements that you are more familiar with into the application. Once the project is exported, the HTML tags generated in the code preview will function the way the label is supposed to work. You can create functionality for custom elements in a new file. The tutorial on HTML Elements explains more on how to do this.
- **Delete Elements**: Delete elements by clicking on the ‘X’ button next to the element. Be careful when deleting elements because all element elements will be deleted within the application/project.
- **Create instances on the canvas**: Each component has its canvas. Create an example of an element or HTML element by dragging it onto the canvas. Div components are arbitrarily nestable and useful for complex layouts. Next.js projects have Link components to enable client-side navigation to other routes.
- **Component Tree**: Click on the component tree tab next to the code preview tab to view the component tree hierarchy.
- **Update styling**: Click on an element on the canvas to update basic styling using the right functions. As you create new instances and add styling, watch as your code dynamically generates in the bottom panel.
- **User preference features**: Select a theme for the code preview to your liking and change the application’s lighting.
- **Export project**: Click the “Export Project’ button to export the project’s application files into a Typescript file. The exported project is fully functional with Webpack, Express server, routing, etc., and will match what’s mocked on the canvas.

#### Contributors

[Aaron Bumanglag](https://www.linkedin.com/in/akbuma) [@akbuma](https://github.com/akbuma)

[Adam Singer](https://linkedin.com/in/adsing) [@spincycle01](https://github.com/spincycle01)

[Andrew Cho](https://www.linkedin.com/in/andrewjcho84/) [@andrewjcho84](https://github.com/andrewjcho84)

[Brian Han](https://www.linkedin.com/in/brianjisoohan/) [@brianjshan](https://github.com/brianjshan)

[Charles Finocchiaro](https://www.linkedin.com/in/charles-finocchiaro-62440040/) [@null267](https://github.com/null267)

[Chelsey Fewer](https://www.linkedin.com/in/chelsey-fewer/) [@chelseyeslehc](https://github.com/chelseyeslehc)

[Christian Padilla](https://linkedin.com/in/ChristianEdwardPadilla) [@ChristianEdwardPadilla](https://github.com/ChristianEdwardPadilla)

[Diego Vazquez](https://www.linkedin.com/in/diegovazquezny/) [@diegovazquezny](https://github.com/diegovazquezny)

[Eliot Nguyen](https://linkedin.com/in/ibeeliot) [@ibeeliot](https://github.com/ibeeliot)

[Fredo Chen](https://www.linkedin.com/in/fredochen/) [@fredosauce](https://github.com/fredosauce)

[Jesse Zuniga](https://linkedin.com/in/jesse-zuniga) [@jzuniga206](https://github.com/jzuniga206)

[Jin Soo Lim](https://www.linkedin.com/in/jin-soo-lim-3a567b1b3/) [@jinsoolim](https://github.com/jinsoolim)

[Mitchel Severe](https://www.linkedin.com/in/misevere/) [@mitchelsevere](https://github.com/mitchelsevere)

[Natalie Vick](https://www.linkedin.com/in/vicknatalie/) [@natattackvick](https://github.com/natattackvick)

[Nel Malikova](https://www.linkedin.com/in/gmalikova/) [@gmal1](https://github.com/gmal1)

[Sean Sadykoff](https://www.linkedin.com/in/sean-sadykoff/) [@sean1292](https://github.com/sean1292)

[Shlomo Porges](https://linkedin.com/shlomoporges) [@shlomoporges](https://github.com/ShlomoPorges)

[Sophia Huttner](https://www.linkedin.com/in/sophia-huttner-68315975/) [@sophjean](https://github.com/sophjean)

[Stormi Hashimoto](https://www.linkedin.com/in/stormikph/) [@stormikph](https://github.com/stormikph)

[Tolga Mizrakci](https://linkedin.com/in/tolga-mizrakci) [@tolgamizrakci](https://github.com/tolgamizrakci)

[Tony Ito-Cole](https://linkedin.com/in/tony-ito-cole) [@tonyito](https://github.com/tonyito)

[Tyler Sullberg](https://www.linkedin.com/in/tyler-sullberg) [@tsully](https://github.com/tsully)

## To Run Your Own Version

- **Fork** and **Clone** Repository.
- Open project directory
- Install dependencies

```bash
npm install
```

- To run the production build

```bash
npm run prod
```

- To run the development build

```bash
npm run dev
```

- Please note that the development build is not connected to the production server. `npm run dev` should spin up the development server from the server folder of this repo. For additional information, the readme is [here](https://github.com/open-source-labs/ReacType/blob/master/server/README.md). Alternatively, you can also select "Continue as guest" on the log-in page of the app to not use any features that rely on the server (authentication and saving project data.)

## To Run Your Exported Next.js Project

- Open exported project directory
- Install dependencies

```bash
npm install
```

- Build the app

```bash
npm run build
```

- Start an instance

```bash
npm run start
```

- Open browser and navigate to localhost at specified port

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/team-reactype/ReacType/blob/development/LICENSE.md) file for details.
