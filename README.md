<p align="center">
  <img width="50" src="https://github.com/team-reactype/ReacType/blob/master/app/src/public/icons/png/256x256.png?raw=true">
  <h1 align="center">ReacType </h1>
</p>

**ReacType Server** is the backend complement to the visual React prototyping tool **ReacType**. It is built in **Node.js** with the **Express** framework linked to **MongoDB** to handle user authentication (personal accounts on our own database as well as through Github Oauth), sessions, and user project management. The server itself is officially deployed through Heroku, but you can host your own local environment to communicate with the database with this repo.

**For future development teams**: If you wish to update the server and re-deploy through heroku, you will need to get the credentials from one of the last team members:

- [Tyler Sullberg](https://www.linkedin.com/in/tyler-sullberg) [@tsully](https://github.com/tsully)
- [Andrew Cho](https://www.linkedin.com/in/andrewjcho84/) [@andrewjcho84](https://github.com/andrewjcho84)
- [Aaron Bumanglag](https://www.linkedin.com/in/akbuma) [@akbuma](https://github.com/akbuma)
- [Fredo Chen](https://www.linkedin.com/in/fredochen/) [@fredosauce](https://github.com/fredosauce)

Redeployment should also be done with only the server subtree and not the entire repo. See this <a href="https://medium.com/@shalandy/deploy-git-subdirectory-to-heroku-ea05e95fce1f">article</a> about deploying just a subdirectory.

If `npm` is your package manager, you just need to run the script `npm run dev` and it will start the server on `http://localhost:5000` for your development environment.

Download for [MacOS](https://github.com/team-reactype/ReacType/releases), [Windows](https://github.com/team-reactype/ReacType/releases/), [Linux](https://github.com/team-reactype/ReacType/releases/).

- **Mac users**: After opening the dmg and dragging ReacType into your Applications folder, ctrl+click the icon and select 'Open' from the context menu to run the app. This extra step is necessary since we don't have an Apple developer license yet.

- **Linux users**: Run the application as a super user in order to read and write files.

![Gif of adding](https://i.imgur.com/nOeuuU6.gif)

### How to use

- **Log in:** Sign up through email/Github if you would like to save your projects to the cloud. Otherwise, select _Continue as Guest_
- **Select project type:** By default, new projects will be Next.js projects, but you can toggle your project to be a normal React application by selecting "Classic React" in the bottom-right corner.
  - **Next.js** projects allow you to easily create routing between pages within ReacType and render content with static rendering.
  - **Classic React** projects are vanilla React. You can create multiple "root" components, but routing between these root components is enabled by default.
- **Add components:** Add a new component in the left panel. If the _Page_ checkbox is selected, the component will become a page that can be routed to. For example, a page component named 'Home', the component's corresponding route will be '/Home'. [Learn more about Next.js routing](https://nextjs.org/docs/routing/introduction).
- **Create instances of components/HTML elements:** Each component has its own canvas where you can see how any instances of nested components or HTML elements will render in production. To create an instance of a component or traditional HTML element in the canvas, simply drag it onto the canvas. The following elements have special properties when they're dragged onto the canvas:
  - **Page/root components:** Page/root components cannot be dragged into other components.
  - **Divs:** Divs are arbitrarily nestable.
  - **Navigation components:** Next.js projects have "Navigation components" which allow you to create links between your page components.
- **Update CSS and delete instances:** Click on the component canvas or an instance to view/edit CSS attributes in the right panel. Updates made to the CSS will render in the canvas on _Save_.
- **Save your project:** Select _Save Project_ to save a new project to the cloud. Once you've created a new project in the cloud, it will be autoamtically saved on each change. You can open any of your other saved projects by selecting _Open Project_.
- **Export your project:** Select _Export Project_ to save your project locally. You will have the option of exporting either a fully functional application or only exporting the component files.

#### Contributors

[Aaron Bumanglag](https://www.linkedin.com/in/akbuma) [@akbuma](https://github.com/akbuma)

[Adam Singer](https://linkedin.com/in/adsing) [@spincycle01](https://github.com/spincycle01)

[Andrew Cho](https://www.linkedin.com/in/andrewjcho84/) [@andrewjcho84](https://github.com/andrewjcho84)

[Charles Finocchiaro](https://www.linkedin.com/in/charles-finocchiaro-62440040/) [@null267](https://github.com/null267)

[Chelsey Fewer](https://www.linkedin.com/in/chelsey-fewer/) [@chelseyeslehc](https://github.com/chelseyeslehc)

[Christian Padilla](https://linkedin.com/in/ChristianEdwardPadilla) [@ChristianEdwardPadilla](https://github.com/ChristianEdwardPadilla)

[Eliot Nguyen](https://linkedin.com/in/ibeeliot) [@ibeeliot](https://github.com/ibeeliot)

[Fredo Chen](https://www.linkedin.com/in/fredochen/) [@fredosauce](https://github.com/fredosauce)

[Jesse Zuniga](https://linkedin.com/in/jesse-zuniga) [@jzuniga206](https://github.com/jzuniga206)

[Mitchel Severe](https://www.linkedin.com/in/misevere/) [@mitchelsevere](https://github.com/mitchelsevere)

[Natalie Vick](https://www.linkedin.com/in/vicknatalie/) [@natattackvick](https://github.com/natattackvick)

[Nel Malikova](https://www.linkedin.com/in/gmalikova/) [@gmal1](https://github.com/gmal1)

[Sean Sadykoff](https://www.linkedin.com/in/sean-sadykoff/) [@sean1292](https://github.com/sean1292)

[Shlomo Porges](https://linkedin.com/shlomoporges) [@shlomoporges](https://github.com/ShlomoPorges)

[Sophia Huttner](https://www.linkedin.com/in/sophia-huttner-68315975/) [@sophjean](https://github.com/sophjean)

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
