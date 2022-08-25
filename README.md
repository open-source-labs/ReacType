<!-- <p align="center">
  <img width="100" src="https://i.imgur.com/Yn70tqI.png">
  <h1 align="center">ReacType </h1>
</p> -->
# ReacType

<!-- <p align="center">
  <img width="1000" src="https://i.imgur.com/enAcYvB.png">
</p>
 -->
<div align="left">
  
[![StarShield][stars]][stars-url]
[![ContributorShield][contributors]][contributors-url]
[![ForksShield][forks]][forks-url]
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Version: 13.0.0](https://img.shields.io/badge/version-13.0.0-orange)
  
</div>
<!-- <p align="center">
  <img width="1000" src="https://i.imgur.com/FPizsat.png">
</p> -->


<p align="center">
  <img width="1000" src="https://i.imgur.com/FIX8skV.png">
</p>


<p align="center">
  <img width="1000" src="https://i.imgur.com/Tuyjd4e.png">
</p>



**ReacType** is a rapid prototyping tool built on Electron that allows users _visualize_ their application architecture dynamically, employing a _drag-and-drop canvas display_ and an interactive, _real-time component code preview_ that can be exported as a **React** app for developers employing React component architecture alongside the comprehensive type-checking of **TypeScript**. In other words, **you can draw prototypes and export React / TypeScript code!**

Visit [reactype.io](https://reactype.io/) to learn more about the product.

Follow [@ReacType](https://twitter.com/reactype) on Twitter for important announcements.

### Documentation

If you want to read about using ReacType, the [User Manual](https://reactype-1.herokuapp.com/#/tutorial) is free and available online now. 

### Installing

- **MacOS**
Download the latest [release](https://github.com/open-source-labs/ReacType/releases) <br>
After opening the dmg and dragging ReacType into your Applications folder, ctrl+click the icon and select 'Open' from the context menu to run the app. This extra step is necessary since we don't have an Apple developer license yet.

- **Windows**
Download the latest [release](https://github.com/open-source-labs/ReacType/releases)


## New with version 13.0.0

- **Manage state locally**: Users can now manage state dynamically within nested components using React Hooks within the state manager tab.
- **Add/delete props**: For a selected component, users can see a list of available props from the parent, add props, and delete props in case they are not required later on.
- **State/props flow**: If state or props are deleted upstream, it will automatically update the state for its children components.
- **Visualize state/props flow**: Within the display sub-tab of the state manager tab, users can visualize an interactive tree diagram depicting the state initialized in the current component and passed down props from the parent component.
- **And more:** See [CHANGE_LOG.md](https://github.com/oslabs-beta/ReacType/blob/dev/CHANGE_LOG.md) for more details on what was changed from the previous version as well as plans for upcoming features!


## Run ReacType using CLI

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

- To run tests

```bash
npm run test
```

- To run the development build

```bash
npm run dev
```

- Please note that the development build is not connected to the production server. `npm run dev` should spin up the development server from the server folder of this repo. For additional information, the readme is [here](https://github.com/open-source-labs/ReacType/blob/master/server/README.md). Alternatively, you can select "Continue as guest" on the login page of the app, which will not use any features that rely on the server (authentication and saving project data.)

- To run the development build of electron app

 ```bash
npm run dev
npm run electron-dev
```

## Run Exported App

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

## Stack

Typescript, React.js, Redux, Javascript, D3.js, Node.js (Express), HTML, CSS/SASS, GraphQL, Next.js, Gatsby.js, Electron, SQL, NoSQL, Webpack, TDD (Jest, Enzyme and React Testing Library), OAuth 2.0, Travis CI

## Contributions

Here is the up to date [list](https://github.com/oslabs-beta/ReacType/blob/dev/contributors.md) of all co-developers of this product.
Please visit our [contribution documentation](https://github.com/oslabs-beta/ReacType/blob/dev/contribution_documentation.md) for more information on how you can contribute to ReacType!


## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/team-reactype/ReacType/blob/development/LICENSE.md) file for details.

[stars]: https://img.shields.io/github/stars/open-source-labs/ReacType
[stars-url]: https://github.com/open-source-labs/ReacType/stargazers
[forks]: https://img.shields.io/github/forks/open-source-labs/ReacType
[forks-url]: https://github.com/open-source-labs/ReacType/network/members
[contributors]: https://img.shields.io/github/contributors/open-source-labs/ReacType
[contributors-url]: https://github.com/open-source-labs/ReacType/graphs/contributors
