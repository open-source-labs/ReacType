
<!-- <p align="center">
  <img width="100" src="https://i.imgur.com/Yn70tqI.png">

  <h1 align="center">ReacType </h1>
</p> -->

# ReacType

<!-- PAST LOGOS -->
<!-- <p align="center">
  <img width="1000" src="https://i.imgur.com/enAcYvB.png">
</p> -->
<!-- <p align="center">
  <img width="1000" src="https://i.imgur.com/FPizsat.png">
</p> -->
<!-- <p align="center">
  <img width="1000" src="https://i.imgur.com/FIX8skV.png">
</p> -->

<div align="left">

[![StarShield][stars]][stars-url]
[![ContributorShield][contributors]][contributors-url]
[![ForksShield][forks]][forks-url]
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Version: 18.0.0](https://img.shields.io/badge/version-18.0.0-orange)

</div>

 <p align="center">
  <img width="1000" src="https://i.imgur.com/6alI8ub.png">
</p> 


![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Electron.js](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

<p align="center">
  <img width="1000" src="./resources/reactype17.png">
</p>

**ReacType** is a rapid prototyping tool that allows users _visualize_ their application architecture dynamically, employing a _drag-and-drop canvas display_ and an interactive, _real-time component code preview_ that can be exported as a **React** app for developers employing React component architecture alongside the comprehensive type-checking of **TypeScript**. In other words, **you can draw prototypes and export React / TypeScript code!**

Visit [reactype.dev](https://reactype.dev) to learn more about the product.

Follow [@ReacType](https://twitter.com/reactype) on Twitter for important announcements.

### Documentation


<!-- NEED TO REPLACE THE TUTORIAL LINK -->

## Changes with Version 18.0.0

- **Collaboration Rooms**: Implemented rooms that allow developers to collaborate together on a project.
  Note: The collaboration room is a beta version and still needs to be improved for larger scaling.
- **User List**: Designed and built a user list that updates in real-time as clients join and exit.
- **Typescript Conversion**: Typescript coverage is now increased to ~90%.
- **Cleanup**: Removed unused code, fixed bugs, and refactored existing code to improve performance, 
- **And more:** See the [change log](https://github.com/open-source-labs/ReacType/blob/master/CHANGE_LOG.md) for more details on what was changed from the previous versions, as well as plans for upcoming features!

## File Structure of ReacType Version 18.0.0

Here is the main file structure:

<p align="center">
  <img width="1000" src="https://i.imgur.com/uUzyHwW.png">
</p>
Given to us courtesy of our friends over at React Relay  

Please refer to the Excalidraw provided by ReacType Version 14.0 for more details: https://excalidraw.com/#json=JKwzVD5qx6lsfiHW1_pQ9,XJ6uDoehVu-1bsx0SMlC6w 

## Run ReacType using CLI

- **Fork** and **Clone** Repository.
- Open the project directory.
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

Typescript, React.js, Redux Toolkit, Javascript, ESM, Node.js (Express), HTML, CSS, MUI, GraphQL, Next.js, Gatsby.js, Electron, NoSQL, Webpack, TDD (Jest, React Testing Library, Playwright), OAuth 2.0, Websocket, SocketIO, Continuous Integration (Github Actions), Docker, AWS (ECR, Elastic Beanstalk), Ace Editor, Google Charts, React DnD

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
