<!-- <p align="center">
  <img width="100" src="https://i.imgur.com/Yn70tqI.png">
  <h1 align="center">ReacType </h1>
</p> -->

# ReacType

<!-- <p align="center">
  <img width="1000" src="https://i.imgur.com/enAcYvB.png">
</p> -->

<div align="left">

[![StarShield][stars]][stars-url]
[![ContributorShield][contributors]][contributors-url]
[![ForksShield][forks]][forks-url]
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Version: 14.0.0](https://img.shields.io/badge/version-14.0.0-orange)

</div>
<!-- <p align="center">
  <img width="1000" src="https://i.imgur.com/FPizsat.png">
</p> -->

<p align="center">
  <img width="1000" src="https://i.imgur.com/FIX8skV.png">
</p>

<p align="center">
  <img width="1000" src="./resources/ReadMe.gif">
</p>

**ReacType** is a rapid prototyping tool built on Electron that allows users _visualize_ their application architecture dynamically, employing a _drag-and-drop canvas display_ and an interactive, _real-time component code preview_ that can be exported as a **React** app for developers employing React component architecture alongside the comprehensive type-checking of **TypeScript**. In other words, **you can draw prototypes and export React / TypeScript code!**

Visit [reactype.io](https://reactype.dev) to learn more about the product.

Follow [@ReacType](https://twitter.com/reactype) on Twitter for important announcements.

### Documentation

If you want to read about using ReacType, the [User Manual](https://reactype-1.herokuapp.com/#/tutorial) is free and available online now.

### Installing

- **MacOS**
  Download the latest [release](https://github.com/open-source-labs/ReacType/releases) <br>
  After opening the dmg and dragging ReacType into your Applications folder, ctrl+click the icon and select 'Open' from the context menu to run the app. This extra step is necessary since we don't have an Apple developer license yet.
  If you are given a warning that Apple could not scan the app. Please follow these [steps](https://support.apple.com/en-ca/HT202491)

- **Windows**
  Download the latest [release](https://github.com/open-source-labs/ReacType/releases)

## Changes with version 15.0.0

- **Consolidated State Management**: Reactype was using mutliple methods of State Management. We consolidated this all to the modern version of Redux Toolkit to enhance the developer experience and make it easier to debug.
- **Major Dependency Updates**: No more workarounds required to get new developers up and running in the project. A simple npm install works as intended.
- **Websockets**: Users can now join rooms to collaborate on a project together in real time!
- **Fully Deployed Web Application**: To utilize these new features we have hosted the full application via AWS so users can easily use Reactype without a download.
- **And more:** See [change log](https://github.com/open-source-labs/ReacType/blob/master/CHANGE_LOG.md) for more details on what was changed from the previous versions as well as plans for upcoming features!

## File Structure courtesy of Reactype version 14.0.0

Here is the main file structure:

<p align="center">
  <img width="1000" src="https://i.imgur.com/RdK8QzW.jpg">
</p>
Please refer to the link: https://excalidraw.com/#json=JKwzVD5qx6lsfiHW1_pQ9,XJ6uDoehVu-1bsx0SMlC6w for more details.

## Run ReacType using CLI

- **Fork** and **Clone** Repository.
- Open project directory
- Install dependencies.

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

- Note that a .env with DEV_PORT, and a NODE_ENV flag (=production or development) are needed.
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

Here is the up to date [list](https://github.com/open-source-labs/ReacType/blob/master/contributors.md) of all co-developers of this product.
Please visit our [contribution documentation](https://github.com/open-source-labs/ReacType/blob/master/contribution_documentation.md) for more information on how you can contribute to ReacType!

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/team-reactype/ReacType/blob/development/LICENSE.md) file for details.

[stars]: https://img.shields.io/github/stars/open-source-labs/ReacType
[stars-url]: https://github.com/open-source-labs/ReacType/stargazers
[forks]: https://img.shields.io/github/forks/open-source-labs/ReacType
[forks-url]: https://github.com/open-source-labs/ReacType/network/members
[contributors]: https://img.shields.io/github/contributors/open-source-labs/ReacType
[contributors-url]: https://github.com/open-source-labs/ReacType/graphs/contributors
